export default function orderChatCtrlFactory (ngComponent) {
  ngComponent.controller('orderChatCtrl', orderChatCtrl)

  function orderChatCtrl (CommentStore,
    currentUser,
    ENV,
    $ionicHistory,
    $ionicScrollDelegate,
    Order,
    Fulfillment,
    $scope,
    $stateParams,
    $state,
    Utils) {
    var _ = this
    _.order = $stateParams.order
    _.firstProduct = setFirstProduct(_.order)
    _.status = status()
    _.currentUser = currentUser
    _.goBack = goBack
    _.buyerOrSeller = buyerOrSeller($stateParams.type)
    _.isBuyer = isBuyer()
    _.isBuyerAndPending = isBuyerAndPending()
    _.isSellerAndSent = isSellerAndSent()
    _.isSeller = isSeller()
    _.upperStatus = status().toUpperCase()

    function isBuyer() {
      return _.buyerOrSeller === 'buyer'
    }

    function updateStatus() {
      Fulfillment.update(_.order.relationships.fulfillment.id, { status: 'sent' })
        .then(result => {
          result;
        })
        .catch(error => {
          if (ENV.isProduction()) {
            facebookConnectPlugin.logEvent('profile edit request error');
          }
          Utils.swalError(error)
        });
    }

    function isBuyerAndPending() {
      return _.buyerOrSeller === 'buyer' && _.status === 'pending'
    }

    function isSellerAndSent() {
      return _.buyerOrSeller === 'seller' && _.status === 'sent'
    }

    function isSeller() {
      return _.buyerOrSeller === 'seller'
    }

    function buyerOrSeller(type) {
      if(type === 'order') {
        return 'buyer'
      } else {
        return 'seller'
      }
    }

    function status() {
      return _.order.relationships.fulfillment.attributes.status
    }

    function goBack () {
      if ($stateParams.type === 'order' || $stateParams.type === 'sell') {
        $state.go('users.activities.orders')
      } else {
        $ionicHistory.goBack()
      }
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
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('chat load');
      }
      CommentStore.emit('refresh', 'fulfillments', $stateParams.order.relationships.fulfillment.id )
    })
  }
}
