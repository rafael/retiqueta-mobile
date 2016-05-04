import event from 'events'
import _chain from 'pipeable'

export default function PictureStoreFactory (ngComponent) {
  ngComponent.factory('PictureStore', PictureStore)

  function PictureStore (ENV) {
    var Model = {
      clear () {
        window.localStorage.removeItem('cacheProductPictures')
        this.emit('change')
      },
      get () {
        var picturesLocal = window.localStorage.getItem('cacheProductPictures')
        return (picturesLocal != null) ? JSON.parse(picturesLocal) : []
      },
      getExactNumber (number) {
        return defaultPictureSize(number, this.get())
      },
      setPicture (defaultSize, index, picture) {
        _chain(this.getExactNumber(defaultSize, this.get()))
          .pipe(pictures => {
            pictures[index] = picture
            this.set(pictures)
          })
      },
      push (picture) {
        _chain(this.get())
          .pipe(Array.concat, picture)
          .pipe((pictures) => {
            window.localStorage.setItem('cacheProductPictures', JSON.stringify(pictures))
          })
        this.emit('change')
      },
      set (newPictures) {
        if (newPictures.length > 0) {
          window.localStorage.setItem('cacheProductPictures', JSON.stringify(newPictures))
        }
        this.emit('change')
      },
      ids () {
        return this.get().map(value => {
          return value.id
        })
      }
    }

    Object.assign(Model, event.EventEmitter.prototype)

    if (ENV.isDevelopment()) {
      window.PictureStore = Model
    }

    return Model
  }
}

function defaultPictureSize(size = 4, picturesArray) {
  let picturesLeft = size - picturesArray.length
  var completableArray = []

  if (picturesLeft > 0 && picturesLeft <= size) {
    completableArray = Array.apply(null, { length: picturesLeft }).map(value => {
      return { attributes: { url: '' } }
    })
  }

  return picturesArray.concat(completableArray)
}
