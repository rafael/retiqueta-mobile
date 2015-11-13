
export default function Updateable (url, type, $http, $q) {
  return function (id, attrs) {
    var deferred = $q.defer()
    $http({
      method: 'PATCH',
      url: `${url}/${id}`,
      data: {
        data: {
          type: type,
          attributes: attrs,
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
