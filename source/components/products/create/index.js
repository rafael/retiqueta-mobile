import { Rules as FormRules, baseErrorsObject } from './product_form_fields'
import { extractErrorByField, validationFactory } from '../../../libs/merge_validations'

const comitionRate = 0.2

export default function ProductCreateFactory (ngComponent) {
  ngComponent.controller('productCreateCtrl', productCreateCtrl)

  function productCreateCtrl ($ionicHistory, $ionicPlatform, $q, $state, $scope, FormForConfiguration, Product, PictureStore, ProductStore, Utils, $translate, currentUser) {
    FormForConfiguration.enableAutoLabels()
    var _ = this
    let picturesIds = PictureStore.ids()
    _.currentUser = currentUser
    _.pictureStore = PictureStore
    _.product = ProductStore.get()
    _.sendingInfo = false
    _.errors = baseErrorsObject
    _.formController = {}
    _.pictureErrors = { message: '' }
    _.validationRules = FormRules
    _.validationRules.category.custom = validationFactory('category', $q).bind(_)
    _.validationRules.title.custom = validationFactory('title', $q).bind(_)
    _.validationRules.description.custom = validationFactory('description', $q).bind(_)
    _.validationRules.original_price.custom = validationFactory('original_price', $q).bind(_)
    _.validationRules.price.custom = validationFactory('price', $q).bind(_)
    _.goBack = goBack
    _.goToSelect = goToSelect
    _.submit = saveProduct
    _.draft = saveDraft
    _.removeDraft = removeDraft
    _.pictureHasErrors = hasError
    _.comitionCalculate = ComitionCalculate

    var action = $ionicPlatform.registerBackButtonAction(() => {
      if($state.is('productsNew')) {
        goBack()
      } else {
        $ionicHistory.backView()
      }
    }, 101)

    function ComitionCalculate (product) {
      return product.price * (1 - comitionRate) || 0
    }

    function goToSelect () {
      saveDraft(_.product)
      $state.go('productsNewSelectCategory', {}, { location: 'replace', reload: true })
    }

    function saveProduct (product) {
      _.sendingInfo = true
      product.pictures = _.pictureStore.ids()
      Product.create(product)
      .then(result => {
        removeDraft()
        Utils.swalSuccess($translate.instant('PRODUCT_SAVE_MESSAGE'))
        $state.go('users.productDetails', { productID: result.id })
      })
      .catch(error => {
        _.errors = extractErrorByField(error.data, product, Object.keys(_.errors))
        _.formController.validateForm()
        Utils.swalError(ErrorIfFor('Picture', error.data))
      })
      .finally(() => {
        _.sendingInfo = false
      })
    }

    function saveDraft (product) {
      picturesIds = PictureStore.ids()
      ProductStore.set(product)
    }

    function removeDraft () {
      ProductStore.clear()
      PictureStore.clear()
      picturesIds = PictureStore.ids()
      _.product = ProductStore.defaultValue()
      _.formController.validateForm()
    }

    function hasError () {
      return _.pictureErrors.message !== ''
    }

    function goBack ()  {
      try {
        if (hasChanges()) {
          Utils.confirm(
            'Save this product','Do you what save this product information has a draft?', 
            (buttonIndex) => {
              if (buttonIndex == 1) {
                _.draft(_.product)
              } else if (buttonIndex == 2) {
                _.removeDraft()
              }
              action()
              $state.go('users.dashboard', {}, { location: 'replace', reload: true })
            })
        } else {
          action()
          $state.go('users.dashboard', {}, { location: 'replace', reload: true })
        }
      }
      catch (e) {
        action()
        $state.go('users.dashboard', {}, { location: 'replace', reload: true })
      }
    }

    function hasChanges () {
      const productEqualsToStore = angular.equals(_.product, ProductStore.get())
      const isDefault = angular.equals(_.product, ProductStore.defaultValue())
      const dontHaveNewPictures = (picturesIds.length === PictureStore.ids().length)
      return !((productEqualsToStore && dontHaveNewPictures) || isDefault)
    }

    // Object.observe(_.product, function(changes) {
    //   changes.forEach((change) => {
    //     saveDraft(_.product)
    //   })
    // })

    ProductStore.on('change', () => {
      _.product = ProductStore.get()
    })

    $scope.$on("$destroy", function() {
      action()
    })
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
