export default function(ngComponent) {
  ngComponent.directive('productPicture', productPicture)

  function productPicture(Product, PictureStore) {
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

        var reader = new FileReader();   
       
        reader.onload = function(e) {
          _.updatePicture(e.target.result.split(',')[1])
        }

        _.loadPicture = function(e) {
          _.picture = e.target.files[0]
          reader.readAsDataURL(_.picture)
        }

        _.updatePicture = function(base64picture) {
          _.loadingPicture = true
          Product.uploadPicture(_.picture, base64picture)
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
          console.log(_.pictures)
          console.log(PictureStore.get())
          _.pictures = PictureStore.get()
        })

      }
    }
  } 
}
