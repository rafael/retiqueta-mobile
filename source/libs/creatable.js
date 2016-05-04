export default function Creatable (url, type, $http, $q) {
  return function (Obj) {
    var deferred = $q.defer()
    $http({
      method: 'POST',
      url: `${url}`,
      data: {
        data: {
          type: type,
          attributes: Obj
        }
      }
    })
    .then(result => {
      if (result.status >= 400) { return deferred.reject(result) }
      
      if (result.hasOwnProperty('data') && result.data !== null && result.data.hasOwnProperty('data')) {
        deferred.resolve(result.data)
      } else {
        deferred.resolve(result)
      }
    }, (error) => {
      deferred.reject(error)
    })

    return deferred.promise
  }
}
