export default function CameraServiceFactory (ngComponent) {
  ngComponent.factory('CameraService', CameraService)

  function CameraService ($q) {
    return {
      take (options) {
        var q = $q.defer()

        if ( typeof Camara === 'undefined') {
          q.reject('there is none Camara module')
        }

        options = Object.assign({
          destinationType: Camera.DestinationType.DATA_URL
        }, options)


        navigator.camera.getPicture(function (result) {
          q.resolve(result)
        }, function (err) {
          q.reject(err)
        }, options)

        return q.promise
      }
    }
  }
}
