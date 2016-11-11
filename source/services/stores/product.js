import event from 'events'

const defaultProduct = {
  category: '',
  description: '',
  location: '',
  original_price: '',
  price: '',
  lat_lon: '',
  pictures: '',
  id: null
};

export default function productStoreFacotry (ngComponent) {
  ngComponent.factory('ProductStore', ProductStore)

  function ProductStore (ENV) {
    var Model = {
      clear () {
        window.localStorage.removeItem('cacheProductStore')
        this.emit('change')
      },
      get () {
        var productLocal = window.localStorage.getItem('cacheProductStore')
        return (productLocal !== null) ? JSON.parse(productLocal) : this.defaultValue()
      },
      defaultValue() {
        return Object.assign({}, defaultProduct)
      },
      set (newProduct) {
        if (Object.keys(newProduct).length > 0) {
          window.localStorage.setItem('cacheProductStore', JSON.stringify(newProduct))
        }
        this.emit('change')
      }
    }

    Object.assign(Model, event.EventEmitter.prototype)

    if (ENV.isDevelopment()) {
      window.ProductStore = Model
    }

    return Model
  }
}
