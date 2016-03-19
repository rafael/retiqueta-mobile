export default function OrderFactory (ngComponent) {
  ngComponent.factory('Order', Order)

  function Order(ENV, $http, $q) {
    let dependecies = [ENV, $http, $q]
    let Model = {}

    Object.assign(
      Model,
      require('./order/create')(...dependecies),
      require('./order/build_order')(...dependecies)
     )

    if (ENV.isDevelopment()) {
      window.Order = Model
    }

    return Model
  }
}
