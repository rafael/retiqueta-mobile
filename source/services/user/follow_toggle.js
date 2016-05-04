export default function followToggleFactory (ENV, $http, $q) {
  return {
    followToggle (userID, following) {
      var deferred = $q.defer()
      var verb = (following) ? 'unfollow' : 'follow'

      $http({
        method: 'POST',
        url: `${ENV.api.url}/v1/users/${userID}/${verb}`
      })
        .then(result => {
          deferred.resolve({
            userID: userID,
            following: !following
          })
        })
        .catch(error => {
          deferred.reject(error)
        })

      return deferred.promise
    }
  }
}
