export default function updateProductFactory (ENV, $http, $q) {
  return {
    update: require('../../libs/updateable')(`${ENV.api.url}/v1/products`, 'products', $http, $q)
  };
}
