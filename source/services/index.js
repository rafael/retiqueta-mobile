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

export default services
