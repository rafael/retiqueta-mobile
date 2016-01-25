import geteableRelation from '../../libs/geteable_relation'

export default function getCommentFactory (ENV, $http, $q) {
  return {
    getByProduct: geteableRelation(`${ENV.api.url}/v1/products`, '/relationships/comments', $http, $q)
  }
}
