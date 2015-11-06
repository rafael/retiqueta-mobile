
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
    
    _.validationRules = {
      category: {
        inputType: 'text',
        required: true
      },
      title: {
        inputType: 'text',
        required: true
      }, 
      description: {
        inputType: 'text',
        required: true
      },
      original_price: {
        inputType: 'text',
        required: true
      }, 
      price: {
        inputType: 'text',
        required: true
      },  
    };

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
      //console.log(changes)
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
