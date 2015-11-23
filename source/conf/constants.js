const node_env = process.env.NODE_ENV || 'development'

angular.module('App.contants', [])

const contants = angular.module('App.contants')

contants.constant('ENV', {
  app_name: 'Retiqueta',
  type: NODE_ENV,
  api: {
    url: (NODE_ENV === 'production') ? 'https://api.retiqueta.com':'https://api.retiqueta.com'
  }
})

