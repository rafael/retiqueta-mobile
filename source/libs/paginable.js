export default function paginableFactory(url, $http, $q) {
  return function(query = null, page = 0, size = 10) {
    var deferred = $q.defer();
    var finalUrl = `${url}?page_number=${page}&page_size=${size}`
    finalUrl += (query === null) ? '' : `&q=${query}` 
    $http({
      method: 'GET',
      url: finalUrl,
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
