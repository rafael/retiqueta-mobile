export default function ProductDirective (ngComponent) {
  ngComponent.directive('showProduct', productTag)

  function productTag () {
    return {
      templateUrl: 'products/show_directive.html',
      retrict: 'E',
      scope: {
        product: '=',
        commentToggleFunc: '&'
      },
      link (scope, element, attrs) {
        if (attrs.singlePic) {
          scope.product.relationships.product_pictures = scope.product.relationships.product_pictures.slice(0, 1)
        }
        scope.detail = attrs.detail || false
        scope.showCommentForm = false
        scope.ToggleCommentForm = () => {
         scope.showCommentForm = !scope.showCommentForm
        }
      }
    }
  }
}
