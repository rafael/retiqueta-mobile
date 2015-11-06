export default function(ngComponent) {
  ngComponent.factory('ProductStore', ProductStore)

  function ProductStore(ENV) {
    
    return function ProductStoreFactory() {
      var productLocal = window.localStorage.getItem('cacheProductStore') 
      var defaultProduct = {
        category: '',
        title: '',
        description: '',
        original_price: '',
        price: '',
        pictures: '',
      }
      var product = (productLocal != null) ? JSON.parse(productLocal) : defaultProduct
      var Model = {
        restart() {
          window.localStorage.removeItem('cacheProductStore')
          productLocal = null
          product = []
        },
        get() {
          return product
        },
        set(newProduct) {
          if(Object.keys(newProduct).length > 0) {
            window.localStorage.setItem('cacheProductStore', JSON.stringify(newProduct))
            product = newProduct
          }
          return product
        },
      }

      return Model
    }
  }
}
