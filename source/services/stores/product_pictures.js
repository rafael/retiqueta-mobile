export default function(ngComponent) {
  ngComponent.factory('ProductPictures', ProductPictures)

  function ProductPictures(ENV) {
    
    return function ProductPicturesFactory() {
      var picturesLocal = window.localStorage.getItem('cacheProductPictures') 
      var pictures = (picturesLocal != null) ? JSON.parse(picturesLocal) : []
      var Model = {
        restart() {
          window.localStorage.removeItem('cacheProductPictures')
          picturesLocal = null
          pictures = []
        },
        get() {
          return pictures.slice(0)
        },
        add(picture) {
          pictures.push(picture)
          window.localStorage.setItem('cacheProductPictures', JSON.stringify(pictures))
          return pictures = pictures.slice(0)    
        },
        set(newPictures) {
          if(newPictures.length > 0) {
            window.localStorage.setItem('cacheProductPictures', JSON.stringify(newPictures))
            pictures = newPictures.slice(0) 
          }
          return pictures
        },
        ids() {
          return pictures.map((value) => {
            return value.id
          })
        }
      }

      return Model
    }
  }
}
