const includes = [
  'line_items',
  'line_items.product',
  'line_items.product.product_pictures',
  'user',
  'fulfillment'
].join(',')

export default function orderCtrlFactory (ngComponent) {
  ngComponent.controller('orderCtrl', orderCtrl)

  function orderCtrl (Order, Utils, $stateParams, $ionicHistory, $scope, $ionicAnalytics, currentUser) {
    var _ = this
    _.order = {}
    _.firstProduct = {}
    _.showOrderId = showOrderId
    _.goBack = goBack
    _.isBuyer = isBuyer

    function goBack () {
      $ionicHistory.goBack()
    }

    function showOrderId (id) {
      Utils.swalSuccess(id, 'Order ID')
    }

    function isBuyer () {
      return _.order.relationships.user.id === currentUser.id
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

    $scope.$on('$ionicView.enter', () => {
      facebookConnectPlugin.logEvent('order.load')
      getorder()
    })
  }
}
