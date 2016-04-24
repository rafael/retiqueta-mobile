export default function OrderDirectiveFactory (ngComponent) {
  ngComponent.directive('orderResume', orderResume)

  function orderResume () {
    return {
      restrict: 'E',
      templateUrl: 'orders/resume/template.html',
      scope: {
        order: "="
      },
      link (scope, element, attrs) {}
    }
  }
}

