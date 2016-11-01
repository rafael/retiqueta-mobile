const DEVELOPMENT = 'development'
const PRODUCTION = 'production'
const node_env = process.env.NODE_ENV || DEVELOPMENT
const API_ENDPOINT = process.env.API_ENDPOINT || 'http://192.168.99.100'
const DEBUG_MODE = process.env.DEBUG_MODE || true

function mercadopagoKeys () {
  switch (node_env) {
    case PRODUCTION:
      return 'APP_USR-024493bc-8221-4da7-8ff8-4fb1d96cf520'
    default: 
      return 'TEST-f4c0a8de-a40c-46c2-90f9-202e66994dd3'
  }
}

angular.module('App.contants', [])
const contants = angular.module('App.contants')
const ENV = {
  app_name: 'Retiqueta',
  type: node_env,
  api: {
    url: (node_env === 'production') ? 'https://api.retiqueta.com': API_ENDPOINT
  },
  isDevelopment () {
    return this.type === DEVELOPMENT
  },
  isProduction () {
    return this.type === PRODUCTION
  },
  debug() {
    return DEBUG_MODE
  },
  mercadopago_keys: {
    public: mercadopagoKeys()
  },
  auth: {}
}

if (ENV.isDevelopment()) {
  window.ENV = ENV
}

contants.constant('ENV', ENV)
