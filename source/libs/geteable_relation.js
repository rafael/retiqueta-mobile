import geteable from './geteable'
import UrlBuilder from './paginable_query_builder'

export default function getRelations (base, relation, $http, $q) {
  const geteableBase = geteable(base, $http, $q)
  const relationString = (relation === null) ? '':`${relation}/`
  return function getableRelation (id, query = {}) {
    const buildQuery = UrlBuilder(query)
    return geteableBase(id, `${relationString}${buildQuery}`)
  }
}
