import formFor from '../../node_modules/angular-form-for/dist/form-for'
import formForTemplate from '../../node_modules/angular-form-for/dist/form-for.default-templates'

angular.module('App.components', ['formFor', 'formFor.defaultTemplates'])

const components = angular.module('App.components')

// components.run(() => {
//   console.log('Running directives module')
// })

// How to add controller to the components module
require('./home/controller')(components)

// Auth controllers
require('./auth/login')(components)
require('./auth/signup')(components)
require('./auth/update_token')(components)
require('./auth/logout')(components)

// User controllers
require('./user/dashboard')(components)
require('./profile/profile')(components)
// component example
// export default function(ngComponent) {
//   ngComponent.controllers('Example', Example)
// }

// Utils
require('./utils/file-model')(components)
require('./utils/on-change-file')(components)

export default components
