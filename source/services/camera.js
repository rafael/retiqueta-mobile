export default function CameraServiceFactory (ngComponent) {

  ngComponent.factory('CameraService', CameraService)

  function CameraService ($q) {
    return {
      take(options) {
        options = Object.assign({ 
          destinationType: Camera.DestinationType.DATA_URL
        }, options)
        var q = $q.defer();
        
        navigator.camera.getPicture(function(result) {
          q.resolve(result);
        }, function(err) {
          q.reject(err);
        }, options);
        
        return q.promise;
      }
    }
  }
}
