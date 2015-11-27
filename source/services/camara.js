export default function CamaraFactory (ngComponent) {

  ngComponent.factory('Camara', CamaraFactory)

  function CamaraFactory ($q) {
    return {
      getPicture(options) {
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
