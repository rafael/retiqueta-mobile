import routes from './routes'
import constans from './constants'

angular.module('App.configurations', [
  'ionic',
  'ionic.service.analytics',
])

const confs = angular.module('App.configurations')

require('./ionic_conf')(confs)
require('./auth_interceptor')(confs)
require('./loader_interceptor')(confs)
require('./image_size_header')(confs)
require('./form_for_translations')(confs)
