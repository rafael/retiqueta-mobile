import paginable from '../../libs/paginable'

export default function searchProdcutFactory (ENV, $http, $q) {
  return {
    search: paginable(`${ENV.api.url}/v1/products/search`, $http, $q)
  }
}
