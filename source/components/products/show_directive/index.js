export default function ProductDirective (ngComponent) {
  ngComponent.directive('showProduct', productTag)

  function productTag () {
    return {
      templateUrl: 'products/show_directive/template.html',
      restrict: 'E',
      scope: {
        product: '=',
        commentToggleFunc: '&',
        currentUser: '=',
      },
      link (scope, element, attrs) {
        if (attrs.singlePic) {
          scope.product.relationships.product_pictures = scope.product.relationships.product_pictures.slice(0, 1)
        }
        scope.detail = attrs.detail || false
        scope.isCurrentUser = () => {
          return scope.product.relationships.user.id === scope.currentUser.id
        }
        scope.toggleComment = () => {
          scope.commentToggleFunc.call()
        }
      }
    }
  }
}
