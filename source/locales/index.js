import ngTranslate from 'angular-translate'
import enTranslation from './en'
import esTranslation from './es'

angular.module('App.locales', ['pascalprecht.translate'])

const locales = angular.module('App.locales')

locales.config(function ($translateProvider) {
  $translateProvider.translations('en', enTranslation)
  $translateProvider.translations('es', esTranslation)
  // $translateProvider.useSanitizeValueStrategy('sanitize')
  $translateProvider.preferredLanguage('es')
})
