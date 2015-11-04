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
    UPLOAD_PICTURE: 'Select new picture',
    UPLOADING_PICTURE: 'Uploading your picture ...',
    UPDATE_PROFILE: 'Update profile',
  });
  $translateProvider.translations('es', {
    DO_LOGIN: 'Ya poseo una cuenta',
    DO_SIGNUP: 'Quiero crearme una cuenta',
    SUBMIT: 'Crear mi cuenta',
    SIGNUP_SUCCESS: 'Tu cuenta ha sido creado con exito',
    WELCOME_MESSAGE: 'Bienvenido a Retiqueta',
    DASHBOARD_TITLE: 'Dashboard',
    PROFILE_TITLE: 'Profile',
    UPLOAD_PICTURE: 'Seleccionar nueva imagen',
    UPLOADING_PICTURE: 'Actualizando tu imagen ...',
    UPDATE_PROFILE: 'actualizar perfil',
  });
  $translateProvider.useSanitizeValueStrategy('sanitize');
  $translateProvider.preferredLanguage('en');
});
