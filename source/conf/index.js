import routes from './routes'
import constans from './constants'
import locales from './locales'

angular.module('App.configutarions', ['ionic'])

const confs = angular.module('App.configutarions')

confs.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
})

confs.factory('authInterceptor', function($rootScope, $q, $location) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      var string_token = window.localStorage.getItem('token');
      if (typeof token !== 'undefined' && token !== 'null' && token !== null) {
        var token = JSON.parse(string_token)
        config.headers.Authorization = 'Bearer ' + token.access_token;
      }
      return config;
    },
    responseError: function(response) {
      if (response.status === 401) {
        $window.localStorage.removeItem('token');
        $location.path('/login');
        return $q.reject(response);
      } else {
        return $q.reject(response);
      }
    }
  };
})

confs.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $locationProvider.html5Mode(false);
  $httpProvider.interceptors.push('authInterceptor');
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
