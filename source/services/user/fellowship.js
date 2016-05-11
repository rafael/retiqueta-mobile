import getRelationFactory from '../../libs/geteable_relation'

export default function followToggleFactory (ENV, $http, $q) {
  const getFollowers = getRelationFactory(`${ENV.api.url}/v1/users`, '/relationships/followers', $http, $q)
  const getFollowing = getRelationFactory(`${ENV.api.url}/v1/users`, '/relationships/following', $http, $q)
  return {
    getFollowers,
    getFollowing
  }
}
