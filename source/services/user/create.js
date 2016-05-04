export default function userCreateFactory (ENV, $http, $q) {
  return {
    create: require('../../libs/creatable')(`${ENV.api.url}/v1/registrations`, 'users', $http, $q)
  }
}
