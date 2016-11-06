export default function(ngComponent) {

  ngComponent.factory('Timeline', Timeline)

  function Timeline(ENV, $http, $q) {
    var Model = {}

    Object.assign(
      Model,
      require('./timeline/get')(ENV, $http, $q)
    )

    if (ENV.isDevelopment()) {
      console.info('Saving Timeline model on window')
      window.Timeline = Model
    }
    return Model
  }
}
