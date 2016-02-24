import routes from './routes'
import constans from './constants'
import locales from './locales'

angular.module('App.configurations', ['ionic'])

const confs = angular.module('App.configurations')

require('./ionic_conf')(confs)
require('./auth_interceptor')(confs)
