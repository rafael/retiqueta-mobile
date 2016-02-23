import { Rules as FromRules, baseErrorsObject } from './product_form_fields'
import { extractErrorByField, validationFactory } from '../../../libs/merge_validations'

export default function ProductCreateFactory (ngComponent) {
  ngComponent.controller('productCreateCtrl', productCreateCtrl)

  function productCreateCtrl ($q,
                              $state,
                              $scope,
                              FormForConfiguration,
                              Product,
                              PictureStore,
                              ProductStore,
                              Utils,
                              $translate) {
    FormForConfiguration.enableAutoLabels()
    var _ = this
    _.pictureStore = PictureStore
    _.product = ProductStore.get()
    _.sendingInfo = false
    _.errors = baseErrorsObject
    _.formController = {}
    _.pictureErrors = { message: '' }
    _.validationRules = FromRules
    _.validationRules.category.custom = validationFactory('category', $q).bind(_)
    _.validationRules.title.custom = validationFactory('title', $q).bind(_)
    _.validationRules.description.custom = validationFactory('description', $q).bind(_)
    _.validationRules.original_price.custom = validationFactory('original_price', $q).bind(_)
    _.validationRules.price.custom = validationFactory('price', $q).bind(_)

    _.goBack = () => {
      console.log("GoingBack")
      $state.go('users.dashboard', {}, { location: 'replace', reload: true })
    }

    _.submit = (product) => {
      _.sendingInfo = true
      product.pictures = _.pictureStore.ids()
      Product.create(product)
      .then(result => {
        _.removeDraft()
        Utils.swalSuccess($translate.instant('PRODUCT_SAVE_MESSAGE'))
        $state.go('users.productDetails', { productID: result.id })
      })
      .catch(error => {
        console.warn(error)
        // _.pictureErrors.message = ErrorIfFor('Picture', error.data)
        _.errors = extractErrorByField(error.data, product, Object.keys(_.errors))
        _.formController.validateForm()
        Utils.swalError(ErrorIfFor('Picture', error.data))
      })
      .finally(() => {
        _.sendingInfo = false
      })
    }

    _.draft = (product) => {
      ProductStore.set(product)
    }

    _.removeDraft = () => {
      ProductStore.clear()
      PictureStore.clear()
      _.product = {}
      _.formController.validateForm()
    }

    _.pictureHasErrors = () => {
      return _.pictureErrors.message !== ''
    }

    Object.observe(_.product, function(changes) {
      changes.forEach((change) => {
        _.draft(_.product)
      })
    })

    // ProductStore.on('change', () => {
    //  _.product = ProductStore.get()
    // })
  }
}

function ErrorIfFor(why, errors) {
  let errorTypeRegex = new RegExp(why, 'i')
  var message = ''
  if (errors.detail.search(errorTypeRegex) >= 0) {
    message = errors.detail.split(',').filter(errorMessage => {
      return errorMessage.search(errorTypeRegex) >= 0
    }).join(', ')
  }
  return message
}
