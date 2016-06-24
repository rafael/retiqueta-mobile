export default function ProductDirective (ngComponent) {
  ngComponent.directive('showProduct', productTag)

  function productTag () {
    return {
      templateUrl: 'products/show_directive/template.html',
      restrict: 'E',
      scope: {
        product: '=',
        commentToggleFunc: '&',
        currentUser: '='
      },
      link: productTagLink     
    }

    function productTagLink (scope, element, attrs) {
      if (attrs.singlePic) {
        scope.product.relationships.product_pictures = scope.product.relationships.product_pictures.slice(0, 1)
      }
      scope.detail = attrs.detail || false
      scope.isCurrentUser = isCurrentUser
      scope.toggleComment = toggleComment
      scope.canBuy = canBuy

      // scope.product.attributes.status = "sold"

      function canBuy () {
        return !isSold() && !isCurrentUser()
      }

      function isSold () {
        return scope.product.attributes.status === "sold"
      }
        
      function isCurrentUser () {
        return scope.product.relationships.user.id === scope.currentUser.id
      }
        
      function toggleComment () {
        scope.commentToggleFunc.call()
      }
    }
  }
}
