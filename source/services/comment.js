export default function(ngComponent) {

  ngComponent.factory('Comment', Comment)

  function Comment (ENV, $http, $q) {
    var Model = {}

    Object.assign(
      Model,
      require('./comment/list')(ENV, $http, $q),
      require('./comment/create')(ENV, $http, $q)
    )

    if (ENV.isDevelopment()) {
      console.info('Saving Comment model on window')
      window.Comment = Model
    }
    return Model
  }
}
