export default function GeoFactory (ngComponent) {

  ngComponent.factory('GeoService', GeoService)

  function GeoService (ENV, Utils, $http, $q, $cordovaGeolocation) {
    var geocoder = new google.maps.Geocoder;
    var Model = {
      resolveLocation,
      reverseGeolocation
    }

    if (ENV.isDevelopment()) {
      Utils.logger.info('Saving GeoService model on window')
      window.GeoService = Model
    }

    return Model

    function resolveLocation(address) {
      let deferred = $q.defer()
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if(results[0]) {
            deferred.resolve(results[0])
          } else {
            deferred.reject(status)
          }
        } else {
          deferred.reject(status)
        }
      })
      return deferred.promise
    }

    function reverseGeolocation () {
      let deferred = $q.defer()
      $cordovaGeolocation
      .getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
      .then((position) => {
        const latlng = { 
          lat: position.coords.latitude, 
          lng: position.coords.longitude
        }
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              deferred.resolve(Object.assign({}, results[0], { cords: latlng }))
            } else {
              Utils.logger.log(results)
              deferred.reject(status)
            }
          } else {
            Utils.logger.log('Geocoder failed due to: ', status)
            deferred.reject(status)
          }
        })
      })
      .catch((e) => {
        deferred.reject(e)
      })

      return deferred.promise
    } 
  }
}
