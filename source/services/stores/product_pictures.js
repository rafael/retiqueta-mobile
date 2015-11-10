import event from 'events'
import _tap from '../../libs/tapeable'

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
        _tap(this.get())
        .tap((pictures) => { 
          pictures.push(picture)
          return pictures
        })
        .tap((pictures) => {
          window.localStorage.setItem('cacheProductPictures', JSON.stringify(pictures))
        })
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
