export default function (ngComponent) {
  ngComponent.directive('autoHeightScroll', autoHeightScroll)

  function autoHeightScroll () {
    return {
      restrict: 'A',
      link: autoHeightScrollLink
    }

    function autoHeightScrollLink (scope, element) {
      const viewPortHeight = window.innerHeight
      const scrollable = element.children()
      window.ngElment = element
      function setHeight (height) {
        scrollable.css({
          'height': `${height}px`
        })
      }

      scope.$watch(() => {
        return element[0].className
      }, (newValue) => {
        console.log(newValue)
        console.log('las clases del elemento cambiaron')
        if (newValue.indexOf('with-comment-form-add') !== -1 || newValue.indexOf('with-comment-form') !== -1) {
          console.log('salio el comentario')
          setHeight(viewPortHeight - 120) 
        } else {
          setHeight(viewPortHeight - 80)
        }
      })
    }
  }
}
