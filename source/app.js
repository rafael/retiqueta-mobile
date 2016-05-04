// Polyfills
require('babelify/polyfill')
require('object.observe')
require('array.observe')
require('promise.prototype.finally')

import configurations from './conf'
import components from './components'
import services from './services'
import partials from './partials'
import locales from './locales'

const app = angular.module('App', [
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

app.run((ENV) => {
  if(ENV.isDevelopment()) {
    window.ENV = ENV
  }
})

app.config(function (ENV, $compileProvider) {
  if (ENV.isProduction()) {
    $compileProvider.debugInfoEnabled(false)
  }
});

//angular.module('App').config(function($ionicConfigProvider) {
//  $ionicConfigProvider.views.maxCache(0);
//})

angular.bootstrap(document.body, ['App'])
