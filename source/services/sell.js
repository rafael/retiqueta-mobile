export default function SellFactory (ngComponent) {
  ngComponent.factory('Sell', Sell)

  function Sell(ENV, $http, $q) {
    let dependecies = [ENV, $http, $q]
    let Model = {}

    Object.assign(
      Model,
      require('./sell/list')(...dependecies)
     )

    if (ENV.isDevelopment()) {
      window.Sell = Model
    }

    return Model
  }
}
