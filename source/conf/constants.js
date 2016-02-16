const DEVELOPMENT = 'development'
const PRODUCTION = 'production'
const node_env = process.env.NODE_ENV || DEVELOPMENT

angular.module('App.contants', [])

const contants = angular.module('App.contants')

contants.constant('ENV', {
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
  auth: {}
})
