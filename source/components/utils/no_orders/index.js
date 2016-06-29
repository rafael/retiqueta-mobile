export default function noOrdersDirectiveFactory (ngComponent) {
  ngComponent.directive('noOrders', noOrders)

  function noOrders () {
    return {
      templateUrl: 'utils/no_orders/template.html',
      restrict: 'E',
      transclude: true,
      scope: {
        noBuyButton: '@',
        noSellButton: '@'
      }
    }
  }
}
