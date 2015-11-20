export default function index (ngComponent) {
  ngComponent.controller('wardrobeCtrl', wardrobeCtrl)

  function wardrobeCtrl(currentUser, Product, User, $scope) {
    var _ = this
    _.user = currentUser
    _.products = []

    _.doRefresh = () => { 
      Product.getByUser(currentUser.id, { include: 'product_pictures'})
      .then(result => {
        _.products = result
      })
      .finally(function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
    }

    _.doRefresh()
  }
}
