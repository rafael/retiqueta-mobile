import _chain from 'pipeable'
import jsonapi from './jsonapi'

export default function paginableFactory(url, $http, $q) {
  return function(query) {
    var deferred = $q.defer();
    var queryString = UrlBuilder(query)
    $http({
      method: 'GET',
      url: `${url}/${queryString}`,
    })
    .then(result => {
      if (result.data.hasOwnProperty('data')) {
        deferred.resolve(jsonapi(result.data).data)
      } else {
        deferred.resolve(result)
      }
    })
    .catch(error => {
      deferred.reject(error)
    })

    return deferred.promise
  }

  function UrlBuilder(query = {}) {
    return _chain(query)
    .pipe(Object.assign, { page_number: 0, page_size: 10 })
    .pipe(Object.keys)
    .pipe(Array.map, (key) => {
      return [key, query[key]]
    })
    .pipe((queries) => {
      return Array.concat([''], queries)
    })
    .pipe(Array.reduce, (prev, current, index, array) => {
      var start = (index === 1) ? '?' : '&'
      return prev + `${start}${current[0]}=${current[1]}`
    })
    .result()
  }
}
