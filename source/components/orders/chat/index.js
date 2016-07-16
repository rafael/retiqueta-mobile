const includes = [
  'line_items',
  'line_items.product',
  'line_items.product.product_pictures',
  'user',
  'fulfillment',
].join(',')

export default function orderChatCtrlFactory (ngComponent) {
  ngComponent.controller('orderChatCtrl', orderChatCtrl)

  function orderChatCtrl ($ionicAnalytics, Order, Utils, $stateParams, $state, $ionicHistory, CommentStore, currentUser, $ionicScrollDelegate, $scope) {
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
      $ionicAnalytics.track('fetch start', {
        action: 'fetch order on order chat view',
        id: $stateParams.id
      })
      Order.get($stateParams.id, { include: includes })
      .then(order => {
        $ionicAnalytics.track('fetch success', {
          action: 'fetch order on order chat view',
          id: $stateParams.id
        })
        _.order = order
        _.firstProduct = setFirstProduct(order)
        CommentStore.emit('refresh', 'fulfillments', order.relationships.fulfillment.id )
      })
      .catch((error) => {
        $ionicAnalytics.track('fetch error', {
          action: 'fetch order on order chat view',
          id: $stateParams.id,
          error: error
        })

        Utils.swalError(error)
      })
    }

    function setFirstProduct (order) {
      let line_item = order.relationships.line_items[0]
      if (order.relationships.line_items.length > 0) {
        return line_item.relationships.product
      } else {
        return {}
      }
    }

    function scrollComments (type, parentId) {
      if (type === 'fulfillments' && parentId === _.order.relationships.fulfillment.id ) {
        $ionicScrollDelegate.$getByHandle('comments').scrollBottom()
      }
    }

    CommentStore.on('new', scrollComments)
    CommentStore.on('fetchFinish', scrollComments)
    $scope.$on("$ionicView.enter", (event, data) => {
      $ionicAnalytics.track('Load', {
        action: 'orders chat',
        id: $stateParams.id
      })
      getorder() 
    })
  }
}
