export default function AutoNextInpitWhenFullFactory (ngComponent) {
  ngComponent.directive('autoNextField', autoNextField)

  function autoNextField () {
    return {
      restrict: 'A',
      link (scope, element, attrs) {
        let siblings = Array.from(element.find('input'))

        function nextSibling (elm) {
          let index = siblings.indexOf(elm)
          return siblings[index + 1] || null
        }

        element.bind('keyup', function(e) {
          const target = e.srcElement
          if (target.attributes['maxLength']) {
            const maxLength = parseInt(target.attributes["maxlength"].value, 10)
            const myLength = target.value.length
            if (myLength >= maxLength) {
              var next = target;
              while (next = nextSibling(next)) {
                if (next == null) {
                  break;
                } else {
                  next.focus();
                  break;
                }
              }
            }
          }
        })
      }
    }
  }
}
