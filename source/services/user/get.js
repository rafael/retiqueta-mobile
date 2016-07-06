import getableRelation from '../../libs/geteable_relation'

export default function userGetFactory (ENV, $http, $q) {
  return {
    get: getableRelation(`${ENV.api.url}/v1/users`, null, $http, $q)
  }
}

