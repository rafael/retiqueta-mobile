export default function deleteProductFactory (ENV, $http, $q) {
  return {
    destroy: require('../../libs/deleteable')(`${ENV.api.url}/v1/products`, 'products', $http, $q)
  }
}
