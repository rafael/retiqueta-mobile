export default function(ENV, $http, $q) {
  return {
    update: require('../libs/updateable')(`${ENV.api.url}/v1/users`, 'users', $http, $q)
  }
}
