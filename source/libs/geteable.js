export default function Geteable(url, $http, $q) {
  return function(id, extra = '') {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: `${url}/${id}${extra}`,
    })
    .then((result) => {
      if (result.data.hasOwnProperty('data')) {
        deferred.resolve(result.data.data)
      } else {
        deferred.resolve(result.data)
      }
    })
    .catch((error) => {
      deferred.reject(error)
    })
    return deferred.promise
  }
}

