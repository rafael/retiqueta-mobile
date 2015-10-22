export default function(ngComponent) {
  ngComponent.factory('User', UserFactory)

  function UserFactory(ENV, $http, $q) {
    const Model = {
      get(id) {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url: `${ENV.api.url}/v1/users/${id}`,
        })
        .then((result) => {
          deferred.resolve(result.data)
        })
        .catch((error) => {
          deferred.reject(error)
        })
        return deferred.promise
      },
      create(userObj) {
        return $http({
          method: 'POST',
          url: `${ENV.api.url}/v1/registrations`,
          data: {
            data: {
              type: "users",
              attributes: userObj
            }
          }
        })
      },
      updatePicture(id, picture, encodedPicture) {
        return $http({
          method: 'PUT',
          url: `${ENV.api.url}/v1/users/${id}/upload-profile-pic`,
          data: {
            data: {
              "type": "users",
              "attributes": {
                "pic": {
                  "filename": picture.name,
                  "content": encodedPicture,
                  "content_type": picture.type,
                }
              }
            }
          }
        })
      }
    }
    return Model
  }
}
