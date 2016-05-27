const includes = [
  'line_items',
  'line_items.product',
  'line_items.product.product_pictures',
  'user',
  'fulfillment',
].join(',')

export default function orderChatCtrlFactory (ngComponent) {
  ngComponent.controller('orderChatCtrl', orderChatCtrl)

  function orderChatCtrl (Order, Utils, $stateParams, $state, $ionicHistory, CommentStore, currentUser, $ionicScrollDelegate) {
    var _ = this
    _.order = {}
    _.firstProduct = {}
    _.currentUser = currentUser
    _.goBack = goBack

    function goBack () {
      if ($stateParams.type === 'order' || $stateParams.type === 'sell') {
        $state.go('users.activities.orders')
      } else {
        $ionicHistory.goBack()
      }
    }

    function getorder () {
      Order.get($stateParams.id, { include: includes })
      .then(order => {
        _.order = order
        _.firstProduct = setFirstProduct(order)
      })
      .catch(Utils.swalError)
    }

    function setFirstProduct (order) {
      let line_item = order.relationships.line_items[0]
      if (order.relationships.line_items.length > 0) {
        return line_item.relationships.product
      } else {
        return {}
      }
    }

    function scrollComments () {
      $ionicScrollDelegate.$getByHandle('comments').scrollBottom()
    }

    CommentStore.on('new', scrollComments)
    CommentStore.on('fetchFinish', scrollComments)
    getorder() 
  }
}
