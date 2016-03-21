export default function(ngComponent) {

  ngComponent.factory('Like', Like)

  function Like (ENV, $http, $q) {
    var Model = {}

    Object.assign(
      Model,
      require('./like/create')(ENV, $http, $q)
    )

    if (ENV.isDevelopment()) {
      console.info('Saving Like model on window')
      window.Like = Model
    }
    return Model
  }
}
