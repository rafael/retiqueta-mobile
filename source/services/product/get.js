export default function(ENV, $http, $q) {
  return {
    get: require('../../libs/geteable')(`${ENV.api.url}/v1/products`, $http, $q)
  }
}
