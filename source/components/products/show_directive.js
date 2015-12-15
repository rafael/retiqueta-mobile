export default function ProductDirective (ngComponent) {
  ngComponent.directive('product', productTag)

  function productTag () {
    return {
      templateUrl: 'products/show_directive.html',
      retrict: 'E',
      scope: {
        product: '='
      },
      link (scope, element, attrs) {
        if (attrs.singlePic) {
          scope.product.relationships.product_pictures = scope.product.relationships.product_pictures.slice(0, 1)
        }
      }
    }
  }
}
