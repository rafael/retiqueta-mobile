
import components from './components'
import services from './services'
import partials from './partials'
import routes from './routes'

angular.module('App', [
  'App.components',
  'App.partialsPrecompile',
  'App.services',
  'App.routes',
  'ionic'
])

angular.module('App').constant('ENV', {
  app_name: 'Retiqueta',
})

angular.module('App').run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

angular.bootstrap(document.body, ['App'])

// angular.module('App').run(function() {
//   console.log('Running Angular with browserify')
// })
