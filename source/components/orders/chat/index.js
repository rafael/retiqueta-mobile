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
    var _ = this;
    // Order information
    _.order = $stateParams.order;
    _.currentUser = currentUser;
    _.status = _.order.relationships.fulfillment.attributes.status
    _.firstProduct = setFirstProduct(_.order);
    _.buyerOrSeller = buyerOrSeller();
    _.statusClass = statusClass();
    _.upperStatus = upperStatus();
    // Buyer or Seller information acessors
    _.isBuyer = isBuyer();
    _.isBuyerAndSent = isBuyerAndSent();
    _.isSellerAndPending = isSellerAndPending();
    _.isSeller = isSeller();
    // Function
    _.updateStatus = updateStatus;
    _.goBack = goBack;

    // Determines if user viewing page is the buyer or seller
    function buyerOrSeller() {
      if($stateParams.type === 'order') {
        return 'buyer';
      } else {
        return 'seller';
      }
    }

    // If seller = True
    function isSeller() {
      return _.buyerOrSeller === 'seller';
    }

    // If buyer = True
    function isBuyer() {
      return _.buyerOrSeller === 'buyer';
    }

    // If buyer and the order has been SENT = True
    function isBuyerAndSent() {
      return isBuyer() && _.status === 'sent';
    }

    // If seller and the order is still PENDING = True
    function isSellerAndPending() {
      return isSeller() && _.status === 'pending';
    }

    // Returns the class of existing status
    function statusClass() {
      if (!ENV.isProduction()) {
        console.log("generate status class for status ".concat(_.status).concat(" and user is ").concat(_.buyerOrSeller));
      }
      return "status status-".concat(_.status).concat("-").concat(_.buyerOrSeller);
    }

    function upperStatus(){
      return _.status.toUpperCase();
    }

    // Hides the status update button
    function hideButton() {
      if (!ENV.isProduction()) {
        console.log("hide button");
      }
      if(_.isBuyer){
        document.getElementById('buyer-button').style.display = 'none';
      } else {
        document.getElementById('seller-button').style.display = 'none';
      }
    }

    // Updates status of order, then calls UI updating functions to 'refresh' data on screen
    function updateStatus(status) {
      if (!ENV.isProduction()) {
        console.log("updating status");
      }

      Fulfillment.update(_.order.relationships.fulfillment.id, { status: status })
        .then(result => {
          _.status = status;
          document.getElementById("status").innerHTML=upperStatus();
          document.getElementById("status").className=statusClass();
          hideButton();
        })
        .catch(error => {
          if (ENV.isProduction()) {
            facebookConnectPlugin.logEvent('profile edit request error');
          }
          Utils.swalError(error);
        });
    }

    function goBack () {
      if ($stateParams.type === 'order' || $stateParams.type === 'sell') {
        $state.go('users.activities.orders');
      } else {
        $ionicHistory.goBack();
      }
    }

    function setFirstProduct (order) {
      let line_item = order.relationships.line_items[0];
      if (order.relationships.line_items.length > 0) {
        return line_item.relationships.product;
      } else {
        return {};
      }
    }

    function scrollComments (type, parentId) {
      if (type === 'fulfillments' && parentId === _.order.relationships.fulfillment.id ) {
        $ionicScrollDelegate.$getByHandle('comments').scrollBottom();
      }
    }

    $scope.$on("$ionicView.enter", (event, data) => {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('chat load');
      }
    });

    CommentStore.on('new', scrollComments);
    CommentStore.on('fetchFinish', scrollComments);
    CommentStore.emit('refresh', 'fulfillments', $stateParams.order.relationships.fulfillment.id );
  }
}
