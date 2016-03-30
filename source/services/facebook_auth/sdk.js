export default function LoginWithFactory (ENV, $q, $http) { 
  return {
    login (permissions = ['public_profile','email']) {
      let deferred = $q.defer()
      facebookConnectPlugin.login(permissions, (result) => {
        deferred.resolve(result)
      } , (error) => {
        deferred.reject(error)
      })
      return deferred.promise
    },
    logout () {
      let deferred = $q.defer()
      facebookConnectPlugin.logout((result) => {
        deferred.resolve(result)
      }, (error) => {
        deferred.reject(error)
      })
      return deferred.promise
    },
    getLoginStatus () {
      let deferred = $q.defer()
      facebookConnectPlugin.getLoginStatus((result) => {
        deferred.resolve(result)
      }, (error) => {
        deferred.reject(error)
      })
      return deferred.promise
    }
  }
}


