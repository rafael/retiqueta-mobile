export default function likeThisFactory (ngComponent) {
  ngComponent.directive('likeThis', likeThis)

  function likeThis () {
    return {
      restrict: 'A',
      scope: {
        productId: '='
      },
      link (scope, element, attrs) {
        element.bind('click', (e) => {
          e.preventDefault()
          console.log(scope.productId)
        })
      }
    }
  }
}
