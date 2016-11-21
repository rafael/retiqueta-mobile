export default function(ngComponent) {

  ngComponent.factory('Fulfillment', Fulfillment);

  function Fulfillment(ENV, $http, $q) {
    var Model = {};

    Object.assign(
      Model,
      require('./fulfillment/update')(ENV, $http, $q)
    );

    return Model;
  }
}
