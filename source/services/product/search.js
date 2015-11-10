import paginable from '../../libs/paginable'

export default function(ENV, $http, $q) {
  var state = []
  
  return {
    search: paginable(`${ENV.api.url}/v1/products/search`, $http, $q)
  }
}
