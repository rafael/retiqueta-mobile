export default function LoginWithFactory (ENV, $q, $http) {
  return {
    loginWithFacebook () {
      let deferred = $q.defer()
      this.login()
      .then(result => {
        deferred.resolve(this.create(result.authResponse))
      })
      .catch(deferred.reject)

      return deferred.promise
    }
  }
}
