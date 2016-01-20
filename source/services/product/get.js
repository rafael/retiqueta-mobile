import geteableRelation from '../../libs/geteable_relation'

export default function getProductFactory (ENV, $http, $q) {
  return {
    get: geteableRelation(`${ENV.api.url}/v1/products`, '', $http, $q),
    getByUser: geteableRelation(`${ENV.api.url}/v1/users`, '/relationships/products', $http, $q)
  }
}
