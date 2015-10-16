import ngTranslate from 'angular-translate'

angular.module('App.locales', ['pascalprecht.translate'])

const locales = angular.module('App.locales')

locales.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    DO_LOGIN: 'I have account',
    DO_SIGNUP: 'I want a new account',
  });
  $translateProvider.translations('es', {
    DO_LOGIN: 'Ya poseo una cuenta',
    DO_SIGNUP: 'Quiero crearme una cuenta',
  });
  $translateProvider.useSanitizeValueStrategy('sanitize');
  $translateProvider.preferredLanguage('en');
});
