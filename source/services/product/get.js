import geteable from '../../libs/geteable'
import UrlBuilder from '../../libs/paginable_query_builder'

export default function getProductFactory (ENV, $http, $q) {
  var userProductGet = geteable(`${ENV.api.url}/v1/users`, $http, $q)
  return {
    get: geteable(`${ENV.api.url}/v1/products`, $http, $q),
    getByUser (userId, query = {}) {
      var buildQuery = UrlBuilder(query)
      return userProductGet(userId, `/relationships/products/${buildQuery}`)
    }
  }
}
