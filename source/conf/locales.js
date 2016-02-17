import ngTranslate from 'angular-translate'

angular.module('App.locales', ['pascalprecht.translate'])

const locales = angular.module('App.locales')

locales.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    DO_LOGIN: 'My Retiqueta',
    DO_SIGNUP: 'Sign up',
    CREATE_ACCOUNT: 'Start on Retiqueta!',
    SUBMIT: 'Save',
    SIGNIN: 'Get my inside',
    SAVE_DRAFT: 'Save draft',
    SIGNUP_SUCCESS: 'Your account has been created',
    WELCOME_MESSAGE: 'Hi!, Welcome to Retiqueta',
    DASHBOARD_TITLE: 'Dashboard',
    PROFILE_TITLE: 'Profile',
    UPDATE_PROFILE_SUCCESS: 'Your profile has been updated!',
    UPLOAD_PICTURE: 'Select from gallery',
    TAKE_PICTURE: 'Take from camara',
    UPLOADING_PICTURE: 'Uploading your picture ...',
    UPDATE_PROFILE: 'Update profile',
    PRODUCT_SAVE_MESSAGE: 'Your product is save in your wardrobe',
    ADD_PRODUCT_TO_WARDROBE: 'Add new product to your wardrobe',
    SEARCH_PRODUCT: 'Search',
    WARDROBE_TITLE: 'wardrobe',
    NOT_RESULT_FOR_SEARCH: 'None result for your search',
    SEARCHING: 'Searching ...',
    EDIT_PROFILE: 'Edit my profile',
    SYSTEM_OPTIONS: 'System options',
    SIGNOUT: 'Take me out',
    AUTH_CREATE: 'Create',
    AUTH_DRESS: 'Dress',
    AUTH_SHARE: 'Share',
    PRODUCT_DETAIL: 'Product detail',
    CONNECT_WITH_FACEBOOK: 'Connect using facebook',
    REMOVE_DRAFT: 'Delete draft'
  })
  $translateProvider.translations('es', {
    DO_LOGIN: 'Mi retiqueta',
    DO_SIGNUP: 'Registrate',
    CREATE_ACCOUNT: '¡A Retiqueta!',
    SUBMIT: 'Guardar',
    SIGNIN: 'Ingresar',
    SAVE_DRAFT: 'Guardar como borrador',
    SIGNUP_SUCCESS: 'Tu cuenta ha sido creado con exito',
    WELCOME_MESSAGE: 'Bienvenido a Retiqueta',
    DASHBOARD_TITLE: 'Dashboard',
    PROFILE_TITLE: 'Profile',
    UPDATE_PROFILE_SUCCESS: 'Tu perfil ha sido actualizado',
    UPLOAD_PICTURE: 'Seleccionar de la galeria',
    TAKE_PICTURE: 'Tomar foto',
    UPLOADING_PICTURE: 'Actualizando tu imagen ...',
    UPDATE_PROFILE: 'actualizar perfil',
    PRODUCT_SAVE_MESSAGE: 'Se ha guardado tu producto',
    ADD_PRODUCT_TO_WARDROBE: 'Crea tu nuevo producto',
    SEARCH_PRODUCT: 'Buscar producto',
    WARDROBE_TITLE: 'closet',
    NOT_RESULT_FOR_SEARCH: 'Ningun reltado para tu busqueda',
    SEARCHING: 'Buscado ...',
    EDIT_PROFILE: 'Editar mi perfil',
    SYSTEM_OPTIONS: 'Opciones del sistema',
    SIGNOUT: 'Salir de retiqueta',
    AUTH_CREATE: 'Create',
    AUTH_DRESS: 'Dress',
    AUTH_SHARE: 'Share',
    PRODUCT_DETAIL: 'Detalle del producto',
    CONNECT_WITH_FACEBOOK: 'Conectar con Facebook',
    REMOVE_DRAFT: 'Limpiar'
  })
  $translateProvider.useSanitizeValueStrategy('sanitize')
  $translateProvider.preferredLanguage('en')
})
