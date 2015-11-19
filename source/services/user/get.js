import geteable from '../../libs/geteable'
import UrlBuilder from '../../libs/paginable_query_builder'

export default function(ENV, $http, $q) {
  return {
    get: geteable(`${ENV.api.url}/v1/users`, $http, $q),
  }
}
