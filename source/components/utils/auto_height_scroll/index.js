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
      
      function setHeight (height) {
        scrollable.css({
          'height': `${height}px`
        })
      }

      scope.$watch(() => {
        return element[0].className
      }, (newValue) => {
        if (newValue.indexOf('with-comment-form-add') !== -1 || newValue.indexOf('with-comment-form') !== -1) {
          setHeight(viewPortHeight - 120) 
        } else {
          setHeight(viewPortHeight - 80)
        }
      })
    }
  }
}
