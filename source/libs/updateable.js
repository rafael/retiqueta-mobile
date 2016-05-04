export default function Updateable (url, type, $http, $q) {
  return function (id, attrs) {
    var deferred = $q.defer()
    $http({
      method: 'PATCH',
      url: `${url}/${id}`,
      data: {
        data: {
          type: type,
          attributes: attrs
        }
      }
    })
      .then(result => {
        if (result.hasOwnProperty('data') && result.data !== null && result.data.hasOwnProperty('data')) {
          deferred.resolve(result.data.data)
        } else if (result.hasOwnProperty('data')) {
          deferred.resolve(result.data)
        } else {
          deferred.resolve(result)
        }
      })
      .catch(error => {
        deferred.reject(error)
      })

    return deferred.promise
  }
}
