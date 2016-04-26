import jsonapi from './jsonapi'

export default function Geteable (url, $http, $q) {
  return function (id, extra = '') {
    var deferred = $q.defer()
    $http({
      method: 'GET',
      url: `${url}/${id}${extra}`
    })
      .then(result => {
        if (result.hasOwnProperty('data') && result.data !== null && result.data.hasOwnProperty('data')) {
          deferred.resolve(jsonapi(result.data))
        } else {
          deferred.resolve(result)
        }
      })
      .catch((error) => {
        deferred.reject(error)
      })
    return deferred.promise
  }
}
