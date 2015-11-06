import ngResource from 'ng-resource'

ngResource(window, angular)

angular.module('App.services', ['ngResource'])

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
require('./products')(services)
require('./utils')(services)

// Stores (this objects save the state on localStorage)
require('./stores/product_pictures')(services)
require('./stores/product')(services)

export default services
