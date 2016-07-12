import geteable from './geteable'
import UrlBuilder from './paginable_query_builder'

export default function getRelations (base, relation, $http, $q, config = {}) {
  const geteableBase = geteable(base, $http, $q, config)
  const relationString = (relation === null) ? '':`${relation}/`
  return function getableRelation (id, query = {}) {
    const buildQuery = UrlBuilder(query)
    return geteableBase(id, `${relationString}${buildQuery}`)
  }
}
