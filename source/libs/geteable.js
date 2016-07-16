import jsonapi from './jsonapi'

export default function Geteable (url, $http, $q) {
  return function (id, extra = '', config = {}) {
    var deferred = $q.defer()
    $http(Object.assign({}, config, {
      method: 'GET',
      url: `${url}/${id}${extra}`
    }))
    .then(result => {
      console.log(result)
      if (result.hasOwnProperty('data') && result.data !== null && result.data.hasOwnProperty('data')) {
        deferred.resolve(jsonapi(result.data))
      } else {
        deferred.resolve(jsonapi(result))
      }
    })
    .catch((error) => {
      deferred.reject(error)
    })
    return deferred.promise
  }
}
