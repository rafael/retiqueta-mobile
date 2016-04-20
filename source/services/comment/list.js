import geteableRelation from '../../libs/geteable_relation'

export default function getCommentFactory (ENV, $http, $q) {
  return {
    getBy (type, id) {
      return geteableRelation(`${ENV.api.url}/v1/${type}`, '/relationships/comments', $http, $q)(id)
    }
  }
}
