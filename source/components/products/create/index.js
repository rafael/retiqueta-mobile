import productForm from './product_form_fields'

export default function(ngComponent) {
  ngComponent.controller('productCreateCtrl', productCreateCtrl)

  function productCreateCtrl($scope, FormForConfiguration, Product, PictureStore, ProductStore, Utils, $translate) {
    var _ = this
    _.pictureStore = PictureStore
    _.product = ProductStore.get()

    FormForConfiguration.enableAutoLabels();
    _.sendingInfo = false;
    
    _.validationRules = productForm
      
    _.submit = (product) => {
      _.sendingInfo = true
      product.pictures = _.pictureStore.ids()
      Product.create(product)
      .then(result => {
        ProductStore.clear()
        _.pictureStore.clear()
        Utils.swalSuccess($translate.instant('PRODUCT_SAVE_MESSAGE'));
        
      })
      .catch(error => {
        console.warn(error)
      })
      .finally(() => {
        _.sendingInfo = false
      })
    }

    _.draft = (product) => {
      ProductStore.set(product)
    }

    _.removeDraft = () => {
      ProductStore.clear()
      PictureStore.clear()
    }

    ProductStore.on('change', function() {
      _.product = ProductStore.get()
    })

  }
}
