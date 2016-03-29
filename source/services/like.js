export default function(ngComponent) {

  ngComponent.factory('Like', Like)

  function Like (ENV, $http, $q) {
    var Model = Object.assign(
      {},
      require('./like/create')(...arguments),
      require('./like/delete')(...arguments),
      require('./like/toggle')(...arguments)
    )

    if (ENV.isDevelopment()) {
      console.info('Saving Like model on window')
      window.Like = Model
    }
    return Model
  }
}
