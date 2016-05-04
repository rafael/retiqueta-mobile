import geteable_relation from '../../libs/geteable_relation'

export default function OrderGetFactory (ENV, $http, $q) {
  return {
    get: geteable_relation(`${ENV.api.url}/v1/orders`, null, $http, $q)
  }
}  

