export default function LikeAddDirectiveFactory (ngComponent) {
  ngComponent.directive('likeAdd', LikeAdd)

  function LikeAdd (Like) {
    return {
      retrict: 'A',
      scope: {
        productId: '&'
      },
      link (scope, element, attrs) {
        scope.add = function() {
          toggleElem()
          Like.add(productId)
          .then(result => {
            console.log(result)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            toggleElem()
          })
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
