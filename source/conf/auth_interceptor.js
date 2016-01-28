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
        var string_token = window.localStorage.getItem('token')
        switch (response.status) {
          case 400:
            if (typeof token !== 'undefined' && token !== 'null' && token !== null) {
              $location.path('/update-token')
            }
            return $q.reject(response)
            brake;
          case 401:
            window.localStorage.removeItem('token')
            $location.path('/auth/login')
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

