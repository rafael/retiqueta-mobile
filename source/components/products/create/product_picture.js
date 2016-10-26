const numberOfPhotosPerProduct = 4

export default function productPictureDirectiveFactory (ngComponent) {
  ngComponent.directive('productPicture', productPicture)

  function productPicture (Product, PictureStore, CameraService, $ionicScrollDelegate, Utils, $ionicAnalytics) {
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
        _.selectSource = false
        _.pictureIndex = 0

        _.hasUrl = (picture) => {
          // Utils.logger.info('Picture inside product pictures directive')
          // Utils.logger.log(picture)
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
            Utils.logger.info('Result of picture uploading')
            Utils.logger.log(result)
            PictureStore.setPicture(numberOfPhotosPerProduct, _.pictureIndex, result)
          })
          .catch(Utils.swalError)
          .finally(() => {
            _.loadingPicture = false
            _.selectSource = false
          })
        }

        _.uploadPic = () => {
          facebookConnectPlugin.logEvent('product.create.upload_picture')
          CameraService.take({
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
          })
          .then(result => {
            _.updatePicture('data:image/jpeg;base64,' + result)
          })
        }

        _.takePic = () => {
          facebookConnectPlugin.logEvent('product.create.take_picture')
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
