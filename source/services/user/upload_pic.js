export default function(ENV, $http, $q) {
  return {
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
}
