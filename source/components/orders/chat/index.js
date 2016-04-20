const includes = [
  'line_items',
  'line_items.product',
  'line_items.product.product_pictures',
  'user',
  'fulfillment'
].join(',')

export default function orderChatCtrlFactory (ngComponent) {
  ngComponent.controller('orderChatCtrl', orderChatCtrl)

  function orderChatCtrl (Order, Utils, $stateParams, $ionicHistory) {
    console.log('ChatCtrl is loaded')
    var _ = this
    _.order = {}
    _.goBack = goBack

    function goBack () {
      $ionicHistory.goBack()
    }

    function getorder () {
      Order.get($stateParams.id, { include: includes })
      .then(order => {
        console.log('Get order')
        _.order = order
      })
      .catch(Utils.swalError)
    }
    getorder()
  }
}
