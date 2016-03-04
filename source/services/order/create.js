export default function createOrderFactory (ENV, $http, $q) {
  return {
    create: require('../../libs/creatable')(`${ENV.api.url}/v1/orders`, 'orders', $http, $q)
  }
}
