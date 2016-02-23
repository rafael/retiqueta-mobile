const numberOfPhotosPerProduct = 4

export default function productPictureDirectiveFactory (ngComponent) {
  ngComponent.directive('productPicture', productPicture)

  function productPicture (Product, PictureStore, CameraService, $ionicScrollDelegate) {
    return {
      templateUrl: 'products/create/product_picture.html',
      restrict: 'E',
      controllerAs: 'ctrl',
      bindToController: true,
      controller () {
        var _ = this
        _.picture = ''
        _.pictures = PictureStore.getExactNumber(numberOfPhotosPerProduct)
        _.loadingPicture = false
        _.selectSource = true
        _.pictureIndex = 0

        _.hasUrl = (picture) => {
          return picture.attributes.url !== ''
        }

        _.setSelectSource = (index, value = true) => {
          _.pictureIndex = index
          _.selectSource = value
          $ionicScrollDelegate.scrollTop()
        }

        _.updatePicture = (base64picture) => {
          _.loadingPicture = true
          Product.uploadPicture(base64picture)
          .then(result => {
            PictureStore.setPicture(numberOfPhotosPerProduct, _.pictureIndex, result)
          })
          .catch(e => {
            console.log(e)
          })
          .finally(() => {
            _.loadingPicture = false
            _.selectSource = false
          })
        }

        _.uploadPic = () => {
          CameraService.take({
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
          })
          .then(result => {
            _.updatePicture('data:image/jpeg;base64,' + result)
          })
        }

        _.takePic = () => {
          CameraService.take()
          .then(result => {
            _.updatePicture('data:image/jpeg;base64,' + result)
          })
        }

        PictureStore.on('change', () => {
          _.pictures = PictureStore.getExactNumber(numberOfPhotosPerProduct)
        })
      }
    }
  }
}


