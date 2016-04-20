import event from 'events'

export default function commentStoreFactory (ngComponent) {
  ngComponent.factory('CommentStore', CommentStore)

  function CommentStore (ENV, Comment) {
    var Model = {
      getBy (type, productID) {
        return Comment.getByProduct(type, productID)
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
