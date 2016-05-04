import event from 'events'

export default function commentStoreFactory (ngComponent) {
  ngComponent.factory('CommentStore', CommentStore)

  function CommentStore (ENV, Comment) {
    var Model = {
      getBy (type='products', productID) {
        return Comment.getBy(type, productID)
      },
      create (productID, commentObj, type="products") {
        return Comment.create(productID, commentObj, type)
      }
    }

    Object.assign(Model, event.EventEmitter.prototype)

    if(ENV.isDevelopment()) {
      window.CommentStore = Model
    }

    return Model
  }
}
