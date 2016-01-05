export default function wardrobeIndexFactory (ngComponent) {
  ngComponent.controller('wardrobeCtrl', wardrobeCtrl)

  function wardrobeCtrl (user, currentUser, Product, User, $scope) {
    var _ = this
    _.user = user
    _.isOwner = (user.id === currentUser.id)
    _.products = []

    _.doRefresh = () => {
      Product.getByUser(user.id, {
        include: 'product_pictures'
      })
        .then(result => {
          _.products = result
        })
        .finally(() => {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete')
        })
    }

    _.doRefresh()
  }
}
