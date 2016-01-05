export default function(ngComponent) {
  ngComponent.factory('authInterceptor', function ($rootScope, $q, $location) {
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
        if (response.status === 401) {
          var string_token = window.localStorage.getItem('token')
          if (typeof token !== 'undefined' && token !== 'null' && token !== null) {
            $location.path('/update-token')
            return $q.reject(response)
          } else {
            window.localStorage.removeItem('token')
            $location.path('/login')
            return $q.reject(response)
          }
        } else {
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
