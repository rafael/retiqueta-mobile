
angular.module('App.components', [])

const components = angular.module('App.components')

// components.run(() => {
//   console.log('Running directives module')
// })

// How to add controller to the components module
// require('./example/controller.js')(components);
require('./home/controller.js')(components);

// How to add a directive to the components module
// require('./example/directive.js')(components);

// component example
// export default function(ngComponent) {
//   ngComponent.controllers('Example', Example)
// }

export default components
