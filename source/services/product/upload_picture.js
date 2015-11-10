import Createable from '../../libs/creatable'

export default function UploadPictureProduct (ENV, $http, $q) {
  var factory = Createable(`${ENV.api.url}/v1/product_pictures`, 'product_pictures', $http, $q)
  return {
    uploadPicture(picture, encodedPicture) {
      return factory({
        position: 0,
        "pic": {
          "filename": picture.name,
          "content": encodedPicture,
          "content_type": picture.type,
        }
      })
    }
  }
}
