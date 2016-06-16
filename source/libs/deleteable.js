export default function Creatable (url, type, $http, $q) {
  return function (id) {
    var deferred = $q.defer()
    return $http({
      method: 'DELETE',
      url: `${url}/${id}`,
    })
  }
}
