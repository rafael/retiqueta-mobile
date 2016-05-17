const DEVELOPMENT = 'development'
const PRODUCTION = 'production'
const node_env = process.env.NODE_ENV || DEVELOPMENT
const DEBUG_MODE = process.env.DEBUG_MODE || true

angular.module('App.contants', [])

const contants = angular.module('App.contants')
const ENV = {
  app_name: 'Retiqueta',
  type: node_env,
  api: {
    // url: (node_env === 'production') ? 'https://api.retiqueta.com':'http://localhost:9393'
    url: (node_env === 'production') ? 'https://api.retiqueta.com':'https://api.retiqueta.com'
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
    public: 'TEST-f4c0a8de-a40c-46c2-90f9-202e66994dd3'
  },
  auth: {}
}

if (ENV.isDevelopment()) {
  window.ENV = ENV
}

contants.constant('ENV', ENV)
