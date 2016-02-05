export default function(ngComponent) {
  ngComponent.factory('authInterceptor', function ($rootScope, $q, ENV) {
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
        console.log('Some error on HTTP protocol')
        console.log(response)
        switch (response.status) {
          case 400:
            if (ENV.isDevelopment()) {
              console.log('Token expired')
              console.log(string_token)
            }
            if (response.data.error_description === "access_token expired" ) {
              console.log('redirect')
              location.replace('#/update-token')
            }
            return $q.reject(response)
            brake;
          case 401:
            window.localStorage.removeItem('token')
            location.replace('#/auth/login')
            return $q.reject(response)
          case 403:
            window.localStorage.removeItem('token')
            location.replace('#/auth/login')
            return $q.reject(response)
          case 0:
            alert('No internet conection')
            return $q.reject(response)
          case 500:
            alert('Server Error')
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
