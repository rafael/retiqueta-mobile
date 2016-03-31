const includes = [
  'line_items',
  'line_items.product',
  'line_items.product.product_pictures',
  'user',
  'fulfillment'
].join(',')

export default function orderCtrlFactory (ngComponent) {
  ngComponent.controller('orderCtrl', orderCtrl)

  function orderCtrl (Order, Utils, $stateParams, $ionicHistory) {
    var _ = this
    _.order = {}
    _.goBack = goBack

    function goBack () {
      $ionicHistory.goBack()
    }

    function getorder () {
      Order.get($stateParams.id, {
        include: includes
      })
      .then(order => {
        _.order = order
      })
      .catch(Utils.swalError)
    }
    getorder()
  }
}
