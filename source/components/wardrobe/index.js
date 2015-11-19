export default function index (ngComponent) {
  ngComponent.controller('wardrobeCtrl', wardrobeCtrl)

  function wardrobeCtrl(currentUser, Product) {
    var _ = this
    _.user = currentUser
    _.products = []
    Product.getByUser(currentUser.id, { include: 'product_pictures'})
    .then(result => {
      _.products = result
    })
  }
}
