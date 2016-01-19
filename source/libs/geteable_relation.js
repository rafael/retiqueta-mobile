import geteable from './geteable'
import UrlBuilder from './paginable_query_builder'

export default function getRelations (base, relation, $http, $q) {
  var geteableBase = geteable(base, $http, $q)
  return function getableRelation (id, query = {}) {
    var buildQuery = UrlBuilder(query)
    return geteableBase(id, `${relation}/${buildQuery}`)
  }
}
