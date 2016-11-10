import { Rules as FormRules, baseErrorsObject } from './product_form_fields'
import { extractErrorByField, validationFactory } from '../../../libs/merge_validations'

const numberOfPhotosPerProduct = 4;

export default function ProductEditFactory (ngComponent) {
  ngComponent.controller('productEditCtrl', productEditCtrl)

  function productEditCtrl (ENV, GeoService, $ionicHistory, $ionicPlatform, $q, $state, $scope, FormForConfiguration, Product, ProductStore, PictureStore,  Utils, $translate, currentUser, $rootScope, $stateParams) {
    FormForConfiguration.enableAutoLabels()
    var _ = this
    let picturesIds = PictureStore.ids()
    let lastGeolocationResult = ''
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
    _.product = ProductStore.get();
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
    _.goToSelect = goToSelect
    _.submit = saveProduct
    _.pictureHasErrors = hasError
    _.comitionCalculate = ComitionCalculate
    _.reverseGeolocation = reverseGeolocation
    _.goBack = goBack

    function goBack () {
      removeDraft();
      return history.back();
    }

    function ComitionCalculate (product) {
      return product.price * (1 - comitionRate) || 0
    }

    function goToSelect () {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('product edit select_type')
      }
      $state.go('.select_category', { productID: _.product.id }, { location: 'replace', reload: true })
    }

    function saveProduct (product) {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('product create request')
      }
      _.sendingInfo = true
      product.pictures = _.pictureStore.ids()

      $rootScope.$broadcast('loading:show')

      Product.update(product.id, product)
      .then(result => {
        removeDraft();
        $ionicHistory.clearCache();
        $state.go('users.productDetails', { productID: product.id }, { reload: true, inherit: false, notify: true  });
      })
      .catch(error => {
        if (ENV.isProduction()) {
          facebookConnectPlugin.logEvent('product create failure');
        }
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

    function hasError () {
      return _.pictureErrors.message !== ''
    }

    function reverseGeolocation () {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('product create geolocate')
      }
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
      Utils.logger.info('Resolving address')
      _.geolocated = false
      _.geoLocalizationInProgress = true
      GeoService.resolveLocation(address)
      .then((location) => {
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
    });

    ProductStore.on('change', () => {
      _.product = ProductStore.get();
    });

    PictureStore.on('change', () => {
      picturesHasChanged = true;
    });


    function LoadProduct () {
      Product.get($stateParams.productID,  {
        include: 'user,product_pictures'
      })
        .then((product) => {
          product.attributes.id = product.id;
          _.product = product.attributes;
          for (var i = 0; i < product.relationships.product_pictures.length - 1; i++) {
            PictureStore.setPicture(numberOfPhotosPerProduct, i,  product.relationships.product_pictures[i]);
          }
          ProductStore.set(product.attributes);
        })
        .catch((e) => {
          Utils.swalError(e);
        });
    }

    function removeDraft () {
      ProductStore.clear()
      PictureStore.clear()
      _.product = ProductStore.get();
      _.sendingInfo = false
      _.geolocated = false
      _.geoLocalizationInProgress = false
      picturesIds = PictureStore.ids()
      _.product = ProductStore.defaultValue()
      _.formController.resetErrors()
    }

    // Life Cicle Events
    $scope.$on("$ionicView.enter", (event, data) => {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('product create load');
      }
      if (_.product.id != $stateParams.productID) {
        LoadProduct();
      }
    });
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
