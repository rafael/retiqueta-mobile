import jsonapi from './jsonapi'
import UrlBuilder from './paginable_query_builder'

export default function paginableFactory (url, $http, $q) {
  return function (query) {
    var deferred = $q.defer()
    var queryString = UrlBuilder(query)
    var fullUrl = `${url}/${queryString}`
    $http({
      method: 'GET',
      url: fullUrl
    })
      .then(result => {
        if (result.hasOwnProperty('data') && result.data !== null) {
          deferred.resolve(jsonapi(result.data))
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
