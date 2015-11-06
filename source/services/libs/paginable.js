export default function paginableFactory(url, $http, $q) {
  return function(page = 0) {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: `${url}&page=${page}`,
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
