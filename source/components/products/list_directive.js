export default function(ngComponent) {
  ngComponent.directive('productsTag', productsTag)

  function productsTag() {
    return {
      templateUrl: 'products/list_directive.html',
      retrict: 'E',
      scope: {
        products: '='
      },
      link(scope, element, attrs) {},
    }
  }
}
