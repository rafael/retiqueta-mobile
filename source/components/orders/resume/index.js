export default function OrderDirectiveFactory (ngComponent) {
  ngComponent.directive('orderResume', orderResume)

  function orderResume () {
    return {
      restrict: 'E',
      templateUrl: 'orders/resume/template.html',
      scope: {
        order: "=",
        detailMessage: "@",
        type: "@"
      },
      link: orderResumeLink
    }

    function orderResumeLink (scope, element, attrs) {
      scope.firstProduct = setFirstProduct(scope.order)
      function setFirstProduct (order) {
        let line_item = order.relationships.line_items[0]
        if (order.relationships.line_items.length > 0) {
          return line_item.relationships.product
        } else {
          return {}
        }
      }
    }
  }
}
