import Createable from '../../libs/creatable'
import GetPictureData from '../../libs/get_picture_data'

export default function UploadPictureProduct (ENV, $http, $q) {
  var factory = Createable(`${ENV.api.url}/v1/product_pictures`, 'product_pictures', $http, $q)
  return {
    uploadPicture(encodedPicture) {
      return factory({
        position: 0,
        "pic": GetPictureData(encodedPicture)            
      })
    }
  }
}
