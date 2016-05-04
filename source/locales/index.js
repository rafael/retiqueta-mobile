import ngTranslate from 'angular-translate'
import enTranslation from './en'
import esTranslation from './es'
import esVeNgLocale from './es-ve'

angular.module('App.locales', ['pascalprecht.translate', 'ngLocale'])

const locales = angular.module('App.locales')

locales.config(function ($translateProvider) {
  $translateProvider.translations('en', enTranslation)
  $translateProvider.translations('es', esTranslation)
  // $translateProvider.useSanitizeValueStrategy('sanitize')
  $translateProvider.preferredLanguage('es')
})
