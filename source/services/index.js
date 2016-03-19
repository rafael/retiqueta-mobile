angular.module('App.services', [])

let services = angular.module('App.services')

// services.run(() => {
//   console.log('Running services module')
// })

// How to add factories or services to the services module
// require('./example-factory.js')(services)

// Factory example code
// export default function(ngComponent) {
//   ngComponent.factory('exampleFactory', ExampleFactory)
// }

require('./auth')(services)
require('./user')(services)
require('./product')(services)
require('./utils')(services)
require('./notifications')(services)
require('./camera')(services)
require('./comment')(services)
require('./like')(services)
require('./mercadopago')(services)
require('./order')(services)
require('./cardio')(services)
// require('./worker')(services)

// Stores (this objects save the state on localStorage)
require('./stores/product_pictures')(services)
require('./stores/product')(services)
require('./stores/comment')(services)

// services.run((PictureStore, Product, WKS, ENV) => {
//   if (ENV.type === 'development') {
//     window.Benchmark = require('benchmark')
//   }
// })

export default services
