import formFor from '../../node_modules/angular-form-for/dist/form-for'
import formForTemplate from '../../node_modules/angular-form-for/dist/form-for.default-templates'

angular.module('App.components', [
  'formFor',
  'formFor.defaultTemplates',
  'currencyFilter'
])

const components = angular.module('App.components')

// components.run(() => {
//   console.log('Running directives module')
// })

// How to add controller to the components module
require('./home/controller')(components)
require('./dashboard/index')(components)

// Auth controllers
require('./auth/login')(components)
require('./auth/signup')(components)
require('./auth/update_token')(components)
require('./auth/logout')(components)
require('./auth/facebook_login')(components)

// User
require('./wardrobe')(components)
require('./profile/edit')(components)
require('./profile/profile_picture')(components)
require('./user/profile_header')(components)
require('./user/profile_resume')(components)
require('./user/follow_button')(components)
require('./fellowship')(components)
require('./settings')(components)
require('./favorites')(components)
require('./faq')(components)

// Sales
require('./sales')(components)

// Balance
require('./balance')(components)

// Orders
require('./orders/list')(components)
require('./orders/resume')(components)
require('./orders/detail')(components)
require('./orders/chat')(components)

// Products
require('./products/create/index')(components)
require('./products/create/product_picture')(components)
require('./products/create/select_category')(components)
require('./products/show_directive')(components)
require('./products/list_directive')(components)
require('./products/resume_directive')(components)
require('./products/details/index')(components)
require('./products/featured')(components)

// Checkout
require('./checkout/create')(components)
require('./checkout/creditcard_token')(components)

// Comments
require('./comments/list')(components)
require('./comments/create')(components)

// Likes
require('./like_this')(components)

// Search
require('./search/index')(components)

// Util
require('./utils/file_model')(components)
require('./utils/on_change_file')(components)
require('./utils/picture_input')(components)
require('./utils/linkify')(components)
require('./utils/select_category')(components)
require('./utils/stars_rating')(components)
require('./utils/currency_filter')
require('./utils/cardio-reader')(components)
require('./utils/text_field')(components)
require('./utils/auto_next_input_when_full')(components)
require('./utils/picture_slide')(components)

// component example
// export default function(ngComponent) {
//   ngComponent.controllers('Example', Example)
// }

export default components
