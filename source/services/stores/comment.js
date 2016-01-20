import event from 'events'

export default function commentStoreFactory (ngComponent) {
  ngComponent.factory('CommentStore', CommentStore)

  function CommentStore (ENV, Comment) {
    var Model = {
      getByProduct (productID) {
        return Comment.getByProduct(productID)
      },
      create (productID, commentObj) {
        return Comment.create(productID, commentObj)
      }
    }

    Object.assign(Model, event.EventEmitter.prototype)

    if(ENV.isDevelopment()) {
      window.CommentStore = Model
    }

    return Model
  }
}
