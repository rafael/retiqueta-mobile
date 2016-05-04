export default function CameraServiceFactory (ngComponent) {
  ngComponent.factory('CameraService', CameraService)

  function CameraService ($q) {
    return {
      take (options = {}) {
        var q = $q.defer()

        options = Object.assign({
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 1024,
          targetHeight: 1024,
          allowEdit: true,
          saveToPhotoAlbum: true
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
