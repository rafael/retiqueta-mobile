export default function LoaderInterceptorFactory (ngComponent) {
  ngComponent.factory('onHttpInterceptor', onHttp)
  ngComponent.config(configInterceptor)
  ngComponent.run(onLoadingListerner)

  function configInterceptor ($httpProvider) {
    $httpProvider.interceptors.push('onHttpInterceptor')
  }

  function onHttp ($rootScope, $q) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show')
        return config
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide')
        return $q.resolve(response)
      },
      responseError: function(response) {
        $rootScope.$broadcast('loading:hide')
        return $q.reject(response)
      }
    }
  }

  function onLoadingListerner ($rootScope, $ionicLoading) {
    $rootScope.$on('loading:show', function() {
      $ionicLoading.show()
    })

    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide()
    })
  }
}


