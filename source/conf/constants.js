const node_env = process.env.NODE_ENV || 'development'

angular.module('App.contants', [])

const contants = angular.module('App.contants')

contants.constant('ENV', {
  app_name: 'Retiqueta',
  type: node_env,
  api: {
    url: (node_env === 'production') ? 'https://api.retiqueta.com':'https://api.retiqueta.com'
  }
})

