import event from 'events'

export default function(ngComponent) {
  ngComponent.factory('ProductStore', ProductStore)

  function ProductStore(ENV) {
    var defaultProduct = {
      category: '',
      title: '',
      description: '',
      original_price: '',
      price: '',
      pictures: '',
    }
    var Model = {
      clear() {
        window.localStorage.removeItem('cacheProductStore')
        this.emit('change')
      },
      get() {
        var productLocal = window.localStorage.getItem('cacheProductStore') 
        return (productLocal != null) ? JSON.parse(productLocal) : Object.assign({}, defaultProduct)
      },
      set(newProduct) {
        if(Object.keys(newProduct).length > 0) {
          window.localStorage.setItem('cacheProductStore', JSON.stringify(newProduct))
        }
        this.emit('change')  
      },
    }

    Object.assign(Model, event.EventEmitter.prototype)
    
    if(ENV.type == 'development') {
      window.ProductStore = Model
    }

    return Model
  }
}
