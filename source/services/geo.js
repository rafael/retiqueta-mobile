export default function GeoFactory (ngComponent) {

  ngComponent.factory('GeoService', GeoService)

  function GeoService (ENV, Utils, $http, $q, $cordovaGeolocation) {
    var geocoder = new google.maps.Geocoder;
    var Model = {
      resolveLocation: getLocation
    }

    function getLocation() {
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
            if (results[1]) {
              deferred.resolve(Object.assign({}, results[1], { cords: latlng }))
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

    if (ENV.isDevelopment()) {
      console.info('Saving GeoService model on window')
      window.GeoService = Model
    }
    return Model
  }
}
