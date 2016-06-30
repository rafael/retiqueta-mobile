export default function ordersCtrlFactory (ngComponent) {
  ngComponent.controller('ordersCtrl', ordersCtrl)

  function ordersCtrl (Order, Utils, $scope, $ionicAnalytics) {
    var _ = this
    _.loading = false
    _.orders = []

    function getOrders () {
      _.loading = true
      Order.getAll({
        include: 'line_items,line_items.product,line_items.product.product_pictures,user,'
      })
      .then(orders => {
        _.orders = orders
      })
      .catch(Utils.swalError)
      .finally(() => {
        _.loading = false
      })
    }

    $scope.$on('$ionicView.enter', () => {
      $ionicAnalytics.track('Load', {
        action: 'orders list'
      })
      getOrders()
    })
  }
}
