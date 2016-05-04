function extractToken (string_token) {
  return JSON.parse(string_token || "{}")
}
export default function(ngComponent) {
  ngComponent.factory('authInterceptor', function ($rootScope, $q, ENV, Utils) {
    return {
      request: function (config) {
        config.headers = config.headers || {}
        var token = window.localStorage.getItem('token')
        if (typeof token !== 'undefined' && token !== 'null' && token !== null) {
          var token = JSON.parse(token)
          config.headers.Authorization = 'Bearer ' + token.access_token
        }
        return config
      },
      responseError: function (response) {
        var string_token = window.localStorage.getItem('token')
        if (ENV.isDevelopment()) {
          console.log('Some error on HTTP protocol')
          console.log(response)
          console.log('The actual token is')
          console.log(string_token)
        }
        switch (response.status) {
          case 400:
            // The token is erased from localStorage without reason, this is why i save in memory until refresh_token finish
            if (response.data.error_description === "access_token expired" ) {
              ENV.auth.token = extractToken(string_token)
              response.status = 404
              location.replace('#/update-token')
            }
            return $q.reject(response)
          case 401:
            window.localStorage.removeItem('token')
            location.replace('#/auth/login')
            return $q.reject(response)
          case 403:
            window.localStorage.removeItem('token')
            location.replace('#/auth/login')
            return $q.reject(response)
          case 0:
            Utils.swalError('No connection with the server')
            return $q.reject(response)
          case 500:
            Utils.swalError('Error on the server, if the error persist contact retiqueta team')
            return $q.reject(response)
          default:
            return $q.reject(response)        
        }
      }
    }
  })

  ngComponent.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(false)
    $httpProvider.interceptors.push('authInterceptor')
    $httpProvider.defaults.useXDomain = true
    delete $httpProvider.defaults.headers.common['X-Requested-With']
  })
}
