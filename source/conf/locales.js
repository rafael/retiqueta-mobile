import ngTranslate from 'angular-translate'

angular.module('App.locales', ['pascalprecht.translate'])

const locales = angular.module('App.locales')

locales.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    DO_LOGIN: 'I have account',
    DO_SIGNUP: 'I want a new account',
    SUBMIT: 'Create my account',
    SIGNUP_SUCCESS: 'Your account has been created',
    WELCOME_MESSAGE: 'Hi!, Welcome to Retiqueta',
    DASHBOARD_TITLE: 'Dashboard',
    PROFILE_TITLE: 'Profile',
    UPLOADING_PICTURE: 'Uploading your picture ...',
  });
  $translateProvider.translations('es', {
    DO_LOGIN: 'Ya poseo una cuenta',
    DO_SIGNUP: 'Quiero crearme una cuenta',
    SUBMIT: 'Crear mi cuenta',
    SIGNUP_SUCCESS: 'Tu cuenta ha sido creado con exito',
    WELCOME_MESSAGE: 'Bienvenido a Retiqueta',
    DASHBOARD_TITLE: 'Dashboard',
    PROFILE_TITLE: 'Profile',
    UPLOADING_PICTURE: 'Actualizando tu imagen ...',
  });
  $translateProvider.useSanitizeValueStrategy('sanitize');
  $translateProvider.preferredLanguage('en');
});
