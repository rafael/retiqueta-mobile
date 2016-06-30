import { Rules as FormRules, baseErrorsObject } from './product_form_fields'
import { extractErrorByField, validationFactory } from '../../../libs/merge_validations'

export default function ProductCreateFactory (ngComponent) {
  ngComponent.controller('productCreateCtrl', productCreateCtrl)

  function productCreateCtrl ($ionicAnalytics, GeoService, $ionicHistory, $ionicPlatform, $q, $state, $scope, FormForConfiguration, Product, PictureStore, ProductStore, Utils, $translate, currentUser, $rootScope) {
    FormForConfiguration.enableAutoLabels()
    var _ = this
    let picturesIds = PictureStore.ids()
    let lastGeolocationResult = ''
    let action = () => {}
    let picturesHasChanged = false
    var comitionRate = 0
    try {
      let storeFee =  currentUser.attributes.store_fee 
      comitionRate = (typeof storeFee !== 'undefined' && storeFee !== null) ? storeFee : 0
    } catch(e) {
      comitionRate = 0
    }
    
    _.currentUser = currentUser
    _.pictureStore = PictureStore
    _.product = ProductStore.get()
    _.sendingInfo = false
    _.geolocated = false
    _.geoLocalizationInProgress = false
    _.errors = baseErrorsObject
    _.formController = {}
    _.pictureErrors = { message: '' }
    _.validationRules = FormRules
    _.validationRules.category.custom = validationFactory('category', $q).bind(_)
    _.validationRules.description.custom = validationFactory('description', $q).bind(_)
    _.validationRules.original_price.custom = validationFactory('original_price', $q).bind(_)
    _.validationRules.price.custom = validationFactory('price', $q).bind(_)
    _.goBack = goBack
    _.goToSelect = goToSelect
    _.submit = saveProduct
    _.pictureHasErrors = hasError
    _.comitionCalculate = ComitionCalculate
    _.reverseGeolocation = reverseGeolocation

    function ComitionCalculate (product) {
      return product.price * (1 - comitionRate) || 0
    }

    function goToSelect () {
      $ionicAnalytics.track('Tap', {
        action: 'select product type'
      })
      saveDraft(_.product)
      $state.go('productsNewSelectCategory', {}, { location: 'replace', reload: true })
    }

    function saveProduct (product) {
      $ionicAnalytics.track('fetch start', {
        action: 'create product'
      })
      _.sendingInfo = true
      product.pictures = _.pictureStore.ids()

      $rootScope.$broadcast('loading:show')
      
      Product.create(product)
      .then(result => {
        $ionicAnalytics.track('fetch success', {
          action: 'create product',
          payload: result
        })
        removeDraft()
        // Utils.swalSuccess($translate.instant('PRODUCT_SAVE_MESSAGE'))
        $state.go('users.me')
      })
      .catch(error => {
        $ionicAnalytics.track('fetch error', {
          action: 'create product',
          error
        })
        Utils.logger.info('Error on product creation')
        Utils.logger.log(error)
        _.errors = extractErrorByField(error.data, product, Object.keys(_.errors))
        _.formController.validateForm(true).then((e) => {console.log(e)}).catch((e) => {console.log(e)})
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
      _.sendingInfo = false
      _.geolocated = false
      _.geoLocalizationInProgress = false
      picturesIds = PictureStore.ids()
      _.product = ProductStore.defaultValue()
      _.formController.resetErrors()
    }

    function hasError () {
      return _.pictureErrors.message !== ''
    }

    function goBack ()  {
      try {
        if (hasChanges()) {
          Utils.confirm(
            $translate.instant('CREATE_PRODUCT_SAVE_DRAFT_MESSAGE_TITLE'),
            $translate.instant('CREATE_PRODUCT_SAVE_DRAFT_MESSAGE_CONTENT'),
            (buttonIndex) => {
              if (buttonIndex == 1) {
                $ionicAnalytics.track('Tap', {
                  action: 'save draft on create product',
                  product: _.product
                })
                saveDraft(_.product)
              } else if (buttonIndex == 2) {
                $ionicAnalytics.track('Tap', {
                  action: 'remove draft on create product',
                  product: _.product
                })
                removeDraft()
              }
              exitView()
            })
        } else {
          exitView()
        }
      }
      catch (e) {
        exitView()
      }
    }

    function exitView () {
      action()
      picturesHasChanged = false
      $state.go('users.dashboard', {}, { location: 'replace', reload: true })
    }

    function hasChanges () {
      const productEqualsToStore = angular.equals(_.product, ProductStore.get())
      const isDefault = angular.equals(_.product, ProductStore.defaultValue())
      return !(productEqualsToStore || isDefault) || picturesHasChanged
    }

    function reverseGeolocation () {
      $ionicAnalytics.track('Tap', {
        action: 'geolocate product'
      })
      Utils.logger.info('Starting geoLocalization')
      _.geolocated = false
      _.geoLocalizationInProgress = true
      GeoService.reverseGeolocation()
      .then((location) => {
        _.geolocated = true
        _.product.location = location.formatted_address
        _.product.lat_lon = `${location.cords.lat},${location.cords.lng}`
      })
      .catch(onGeoError)
      .finally(() => {
        _.geoLocalizationInProgress = false
      })
    }

    function resolveLocation (address) {
      $ionicAnalytics.track('fetch start', {
        action: 'revese geolocate address',
        address
      })
      Utils.logger.info('Resolving address')
      _.geolocated = false
      _.geoLocalizationInProgress = true
      GeoService.resolveLocation(address)
      .then((location) => {
        $ionicAnalytics.track('fetch success', {
          action: 'revese geolocate address',
          address
        })
        _.geolocated = true
        lastGeolocationResult = location.formatted_address
        _.product.location = location.formatted_address
        _.product.lat_lon = `${location.geometry.location.lat()},${location.geometry.location.lng()}`
      })
      .catch(onGeoError)
      .finally(() => {
        _.geoLocalizationInProgress = false
      })
    }

    function onGeoError (e) {
      Utils.logger.log(e)
      if (e.PERMISSION_DENIED === 1) {
        Utils.swalError('Permision to GPS denied')
      } else {
        Utils.swalError('Error on GPS geolocation')
      }
    }

    $scope.$watch(() => _.product.location, function (newValue, oldValue) {
      const needToGeolocate = newValue !== oldValue
      && newValue !== ''
      && oldValue !== ''
      && newValue !== lastGeolocationResult
      && _.geoLocalizationInProgress !== true
      if (needToGeolocate) {
        resolveLocation(_.product.location)
      }
    })

    // Product Store events
    ProductStore.on('change', () => {
      _.product = ProductStore.get()
    })

    PictureStore.on('change', () => {
      picturesHasChanged = true
    })

    // Life Cicle Events

    $scope.$on("$destroy", () => { action() })
    $scope.$on("$ionicView.enter", (event, data) => {
      $ionicAnalytics.track('Load', {
        action: 'create product'
      })
      action = $ionicPlatform.registerBackButtonAction(() => {
        if($state.is('productsNew')) {
          goBack()
        } else {
          $ionicHistory.backView()
        }
      }, 101)
    })
    // $scope.$on("$ionicView.leave", function(event, data) {})
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
