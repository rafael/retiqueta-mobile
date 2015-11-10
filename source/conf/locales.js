import ngTranslate from 'angular-translate'

angular.module('App.locales', ['pascalprecht.translate'])

const locales = angular.module('App.locales')

locales.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    DO_LOGIN: 'I have account',
    DO_SIGNUP: 'I want a new account',
    CREATE_ACCOUNT: 'Create account',
    SUBMIT: 'Save',
    SAVE_DRAFT: 'Save draft',
    SIGNUP_SUCCESS: 'Your account has been created',
    WELCOME_MESSAGE: 'Hi!, Welcome to Retiqueta',
    DASHBOARD_TITLE: 'Dashboard',
    PROFILE_TITLE: 'Profile',
    UPLOAD_PICTURE: 'Select new picture',
    UPLOADING_PICTURE: 'Uploading your picture ...',
    UPDATE_PROFILE: 'Update profile',
    PRODUCT_SAVE_MESSAGE: 'Your product is save in your wardrobe',
    ADD_PRODUCT_TO_WARDROBE: 'Add new product to your wardrobe',
    SEARCH_PRODUCT: 'Search',
  });
  $translateProvider.translations('es', {
    DO_LOGIN: 'Ya poseo una cuenta',
    DO_SIGNUP: 'Quiero crearme una cuenta',
    CREATE_ACCOUNT: 'Crear cuenta',
    SUBMIT: 'Guardar',
    SAVE_DRAFT: 'Guardar como borrador',
    SIGNUP_SUCCESS: 'Tu cuenta ha sido creado con exito',
    WELCOME_MESSAGE: 'Bienvenido a Retiqueta',
    DASHBOARD_TITLE: 'Dashboard',
    PROFILE_TITLE: 'Profile',
    UPLOAD_PICTURE: 'Seleccionar nueva imagen',
    UPLOADING_PICTURE: 'Actualizando tu imagen ...',
    UPDATE_PROFILE: 'actualizar perfil',
    PRODUCT_SAVE_MESSAGE: 'Se ha guardado tu producto',
    ADD_PRODUCT_TO_WARDROBE: 'Crea tu nuevo producto',
    SEARCH_PRODUCT: 'Buscar producto'
  });
  $translateProvider.useSanitizeValueStrategy('sanitize');
  $translateProvider.preferredLanguage('en');
});
