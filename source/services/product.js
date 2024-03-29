export default function(ngComponent) {

  ngComponent.factory('Product', Product)

  function Product(ENV, $http, $q) {
    var Model = {}

    Object.assign(
      Model,
      require('./product/create')(ENV, $http, $q),
      require('./product/get')(ENV, $http, $q),
      require('./product/update')(ENV, $http, $q),
      require('./product/delete')(ENV, $http, $q),
      require('./product/all')(ENV, $http, $q),
      require('./product/search')(ENV, $http, $q),
      require('./product/upload_picture')(ENV, $http, $q)
    )

    if (ENV.isDevelopment()) {
      console.info('Saving Product model on window')
      window.Product = Model
    }
    return Model
  }
}
