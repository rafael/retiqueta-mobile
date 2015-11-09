import event from 'events'

export default function(ngComponent) {
  ngComponent.factory('PictureStore', PictureStore)

  function PictureStore(ENV) {
    var Model = {
      clear() {
        window.localStorage.removeItem('cacheProductPictures')
        this.emit('change')
      },
      get() {
        var picturesLocal = window.localStorage.getItem('cacheProductPictures') 
        return (picturesLocal != null) ? JSON.parse(picturesLocal) : []
      },
      push(picture) {
        var pictures = this.get()
        pictures.push(picture)
        window.localStorage.setItem('cacheProductPictures', JSON.stringify(pictures))
        this.emit('change') 
      },
      set(newPictures) {
        if(newPictures.length > 0) {
          window.localStorage.setItem('cacheProductPictures', JSON.stringify(newPictures)) 
        }
        this.emit('change')
      },
      ids() {
        return this.get().map((value) => {
          return value.id
        })
      }
    }

    Object.assign(Model, event.EventEmitter.prototype)

    if(ENV.type == 'development') {
      window.PictureStore = Model
    }

    return Model
  }

}
