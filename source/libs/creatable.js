
export default function Creatable (url, type, $http, $q) {
  return function(Obj) {
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
      if (result.data.hasOwnProperty('data')) {
        deferred.resolve(result.data.data)
      } else {
        deferred.resolve(result.data)
      }
    })
    .catch(error => {
      deferred.reject(error)
    })

    return deferred.promise
  }
}
