import geteable from '../../libs/geteable'

export default function(ENV, $http, $q) {
  return {
    get: geteable(`${ENV.api.url}/v1/users`, $http, $q),
  }
}
