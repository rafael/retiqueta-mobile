export default function likeThisFactory (ngComponent) {
  ngComponent.directive('likeThis', likeThis)

  function likeThis (Like) {
    return {
      retrict: 'A',
      scope: {
        product: '='
      },
      link (scope, element, attrs) {
        element.bind('click', (e) => {
          e.preventDefault()
          LikeIt(scope.product.id)
        })

        toggleClass(scope.product.meta.liked_by_current_user)

        function LikeIt (productId) {
          toggleElem()
          toggleClass(!scope.product.meta.liked_by_current_user)
          addToLikeCount()

          // Like on the api
          Like.toggle(productId, !scope.product.meta.liked_by_current_user)
          .catch(error => {
            console.log(error)
            // If fails return the like button to unlike state
            toggleClass(!scope.product.meta.liked_by_current_user)
            addToLikeCount()
          })
          .finally(() => {
            toggleElem()
          })
        }

        function addToLikeCount () {
          let alreadyLike = scope.product.meta.liked_by_current_user
          scope.product.attributes.likes_count += (alreadyLike) ? 1 : -1
        }

        function toggleClass (alreadyLike) {
          if (typeof alreadyLike === 'string') {
            alreadyLike = alreadyLike === 'true'
          }
          scope.product.meta.liked_by_current_user = alreadyLike
          if (alreadyLike) {
            element.addClass('already-like-it') 
            element.removeClass('not-like-it') 
          } else {
            element.removeClass('already-like-it')
            element.addClass('not-like-it') 
          }
        }

        function toggleElem() {
          let state = getState(element)
          if(state) {
            angular.element(element).attr('disable', 'disable')
          } else {
            angular.element(element).attr('disable', '')
          }
        }

        function getState(elm) {
          let state = angular.element(elm).attr('disable')
          return (state === 'disable') ? false :  true
        }
      }
    }
  }
}
