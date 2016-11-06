import paginable from '../../libs/paginable'

export default function getTimelineFactory (ENV, $http, $q) {
  return {
    get: paginable(`${ENV.api.url}/v1/timeline`, $http, $q)
  }
}
