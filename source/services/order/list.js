import paginable from '../../libs/paginable'

export default function OrderListFactory (ENV, $http, $q) {
  return {
    getAll: paginable(`${ENV.api.url}/v1/orders`, $http, $q)
  }
}  

