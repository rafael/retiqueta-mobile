// Polyfills
require('babelify/polyfill')
require('object.observe')
require('array.observe')

import configurations from './conf'
import components from './components'
import services from './services'
import partials from './partials'
import locales from './locales'

angular.module('App', [
  'App.components',
  'App.partialsPrecompile',
  'App.services',
  'App.routes',
  'App.contants',
  'App.configurations',
  'App.locales',
  'ionic.service.core',
  'ionic.service.analytics',
  'ionic.service.push'
])

angular.module('App').run((ENV) => {
  if(ENV.isDevelopment()) {
    window.ENV = ENV
  }
})

//angular.module('App').run(function($rootScope, $state, $templateCache) {
//  $rootScope.$on('$stateChangeStart', function(event, toState){
//    console.log($templateCache)
//  })
//  console.log('Running Angular with browserify')
//})
//
//angular.module('App').config(function($ionicConfigProvider) {
//  $ionicConfigProvider.views.maxCache(0);
//})

angular.bootstrap(document.body, ['App'])
