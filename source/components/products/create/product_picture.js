export default function(ngComponent) {
  ngComponent.directive('productPicture', productPicture)

  function productPicture(Product, PictureStore, CameraService) {
    return {
      templateUrl: 'products/create/product_picture.html',
      retrict: 'E',
      controllerAs: 'ctrl',
      bindToController: true,

      controller: function() {
        var _ = this
        _.picture = ''       
        _.pictures = PictureStore.get()
        _.loadingPicture = false

        _.updatePicture = function(base64picture) {
          _.loadingPicture = true
          Product.uploadPicture(base64picture)
          .then((result) => {
            PictureStore.push(result)
          })
          .catch((e) => {     
            console.log(e)
          })
          .finally(() => {
            _.loadingPicture = false
          })
        }

        PictureStore.on('change', () => {
          _.pictures = PictureStore.get()
        })

      }
    }
  } 
}
