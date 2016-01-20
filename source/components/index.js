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

// User
require('./wardrobe')(components)
require('./profile/edit')(components)
require('./profile/profile_picture')(components)
require('./user/profile_header')(components)
require('./user/follow_button')(components)
require('./settings')(components)

// Products
require('./products/dashboard/index')(components)
require('./products/create/index')(components)
require('./products/create/product_picture')(components)
require('./products/show_directive')(components)
require('./products/list_directive')(components)
require('./products/details/index')(components)

// Comments
require('./comments/list')(components)
require('./comments/create')(components)

// Search
require('./search/index')(components)

// component example
// export default function(ngComponent) {
//   ngComponent.controllers('Example', Example)
// }

// Util
require('./utils/file_model')(components)
require('./utils/on_change_file')(components)
require('./utils/picture_input')(components)
require('./utils/linkify')(components)

export default components
