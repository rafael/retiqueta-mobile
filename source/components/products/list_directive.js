export default function ProductsDirectiveFactory (ngComponent) {
  ngComponent.directive('productsList', productsTag)

  function productsTag () {
    return {
      templateUrl: 'products/list_directive.html',
      restrict: 'E',
      scope: {
        products: '='
      },
      link (scope, element, attrs) {}
    }
  }
}
