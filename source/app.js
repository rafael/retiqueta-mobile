require("babelify/polyfill");

import configurations from './conf'
import components from './components'
import services from './services'
import partials from './partials'

require('object.observe')
require('array.observe')

angular.module('App', [
  'App.components',
  'App.partialsPrecompile',
  'App.services',
  'App.routes',
  'App.contants',
  'App.configurations',
  'App.locales'
])

angular.bootstrap(document.body, ['App'])

// angular.module('App').run(function() {
//   console.log('Running Angular with browserify')
// })
