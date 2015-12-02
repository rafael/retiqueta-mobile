import GetPictureData from '../../libs/get_picture_data'

export default function(ENV, $http, $q) {
  return {
    updatePicture(id, encodedPicture) {
      return $http({
        method: 'PUT',
        url: `${ENV.api.url}/v1/users/${id}/upload-profile-pic`,
        data: {
          data: {
            "type": "users",
            "attributes": {
              "pic": GetPictureData(encodedPicture)            
            }
          }
        }
      })
    }
  }
}
