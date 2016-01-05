export default function ProductsDirectiveFactory (ngComponent) {
  ngComponent.directive('products', productsTag)

  function productsTag () {
    return {
      templateUrl: 'products/list_directive.html',
      retrict: 'E',
      scope: {
        products: '='
      },
      link (scope, element, attrs) {}
    }
  }
}
