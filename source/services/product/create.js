export default function(ENV, $http, $q) {
  return {
    create: require('../../libs/creatable')(`${ENV.api.url}/v1/products`, 'products', $http, $q)
  }
}