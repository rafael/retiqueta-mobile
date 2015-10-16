const NODE_ENV = process.env.NODE_ENV || 'development'

angular.module('App.contants', [])

const contants = angular.module('App.contants')

contants.constant('ENV', {
  app_name: 'Retiqueta',
  type: NODE_ENV,
  api: {
    url: (NODE_ENV === 'production') ? 'https://192.168.0.1':'https://146.148.39.248'
  }
})

contants.run((ENV) => {
  if(NODE_ENV === 'development') {
    window.ENV = ENV
  }
})
