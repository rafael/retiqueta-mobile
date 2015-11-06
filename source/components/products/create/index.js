import productForm from './product_form_fields'

export default function(ngComponent) {
  ngComponent.controller('productCreateCtrl', productCreateCtrl)

  function productCreateCtrl($scope, FormForConfiguration, Product, ProductPictures, ProductStore) {
    var _ = this
    var picturesStore = ProductPictures()
    var productStore = ProductStore()
    _.pictures = picturesStore.get()
    _.product = productStore.get()

    FormForConfiguration.enableAutoLabels();
    _.sendingInfo = false;
    
    _.validationRules = productForm
      
    _.submit = (product) => {
      _.sendingInfo = true
      product.pictures = picturesStore.ids()
      Product.create(product)
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.warn(error)
      })
      .finally(() => {
        _.sendingInfo = false
      })
    }

    Array.observe(_.pictures, function(changes) {
      changes.forEach((change) => {
        picturesStore.set(change.object)
      })
    });

    Object.observe(_.product, function(changes) {
      changes.forEach((change) => {
        productStore.set(change.object)
      })
    })
  }
}
