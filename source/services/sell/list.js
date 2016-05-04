import paginable from '../../libs/paginable'

export default function SellListFactory (ENV, $http, $q) {
  return {
    getAll: paginable(`${ENV.api.url}/v1/sales`, $http, $q)
  }
}  

