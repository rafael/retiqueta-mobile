function extractToken (string_token) {
  return JSON.parse(string_token || "{}")
}

function writeToken (oldObjToken, newObjToken) {
  const token = Object.assign({}, oldObjToken, newObjToken)
  window.localStorage.setItem('token', JSON.stringify(token))
  return token
}
export default function(ngComponent) {
  ngComponent.factory('authInterceptor', authInterceptor)
  ngComponent.config(configAuthInterceptor)

  function authInterceptor ($rootScope, $injector, $q, ENV, Utils) {
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
        const token = extractToken(string_token)
        Utils.logger.log('Some error on HTTP protocol')
        Utils.logger.log(response)
        Utils.logger.log('The actual token is')
        Utils.logger.log(string_token)
        switch (response.status) {
          case 400:
            // The token is erased from localStorage without reason, this is why i save in memory until refresh_token finish
            return $q.reject(response)
          case 401:
            const deferred = $q.defer();
            if (response.data.error === "invalid_token" ) {
              Utils.logger.log('Token is expired')
              $injector.get("$http")({
                method: 'POST',
                url: `${ENV.api.url}/v1/authenticate/token`,
                data: {
                  refresh_token: token.refresh_token,
                  client_id: 'ret-mobile-ios'
                }
              })
              .then((result) => {
                Utils.logger.info('Token Updated')
                Utils.logger.log(writeToken(token, result.data))
                Utils.logger.info('repeat previus request')
                $injector.get("$http")(response.config).then(function(resp) {
                  deferred.resolve(resp);
                },function(resp) {
                  deferred.reject(resp);
                });
              })
              .catch((resp) => {
                // There could be requests in flight while a refresh token just happened.
                // In this case one will succeed, the other will return a 400.
                if (resp.status == 0 || resp.status == 400) {
                  Utils.swalError('Error refreshing token')
                  return $q.reject(response)
                } else {
                  deferred.reject(resp)
                  window.localStorage.removeItem('token')
                  $injector.get("$state").go('auth.login')
                }
              })
            } else {
              deferred.reject(response)
              window.localStorage.removeItem('token')
              $injector.get("$state").go('auth.login')
            }
            return deferred.promise
          case 403:
            window.localStorage.removeItem('token')
            location.replace('#/auth/login')
            return $q.reject(response)
          case 0:
            Utils.swalError('No connection with the server, please try again later')
            return $q.reject(response)
          case 500:
            Utils.swalError('Error on the server, if the error persist contact retiqueta team')
            return $q.reject(response)
          default:
            return $q.reject(response)        
        }
      }
    }
  }

  function configAuthInterceptor ($locationProvider, $httpProvider) {
    $locationProvider.html5Mode(false)
    $httpProvider.interceptors.push('authInterceptor')
    $httpProvider.defaults.useXDomain = true
    delete $httpProvider.defaults.headers.common['X-Requested-With']
  }
}
