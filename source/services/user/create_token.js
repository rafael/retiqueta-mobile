import createble from '../../libs/creatable'

export default function createTokenFactory (ENV, $http, $q) {
  return {
    createToken (user_id, tokenData) {
      let url = `${ENV.api.url}/v1/users/${user_id}/relationships/push_token`
      let createFunc = createble(url, 'push_notifications', $http, $q)
      let deferred = $q.defer()

      createFunc(tokenData)
      .then(deferred.resolve)
      .catch(deferred.reject)

      return deferred.promise
    }
  }
}
