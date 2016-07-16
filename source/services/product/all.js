import paginable from '../../libs/paginable'

export default function allProductsFacotry (ENV, $http, $q) {
  return {
    getFeatured: paginable(`${ENV.api.url}/v1/products/featured`, $http, $q),
    getTimeline: paginable(`${ENV.api.url}/v1/products/timeline`, $http, $q)
  }
}
