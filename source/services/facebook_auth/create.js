export default function CreateFacebookAuthFactory (ENV, $q, $http) {
  let url = `${ENV.api.url}/v1/authenticate/fb/connect`
  return {
    create ({accessToken, expiresIn}) {
      var deferred = $q.defer()
      $http({
        method: 'POST',
        url: url,
        data: {
          "token": accessToken,
          "expires_in": expiresIn
        }
      })
      .then(result => {
        deferred.resolve(result.data)
      })
      .catch(deferred.reject)

      return deferred.promise
    } 
  }
}
