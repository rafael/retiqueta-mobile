export default function(ngComponent) {
  ngComponent.factory('User', UserFactory)

  function UserFactory(ENV, $resource) {
    let Model = $resource(
      `${ENV.api.url}/api/v1/users/:id`,
      { id: '@id'},
      {
        'show'    : { method: 'GET' },
        'create'  : { method: 'POST', headers: { 'Access-Control-Allow-Origin': '*' }},
        'update'  : { method: 'PUT' },
        'destroy' : { method: 'DELETE'}
      }
    )

    return Model
  }
}
