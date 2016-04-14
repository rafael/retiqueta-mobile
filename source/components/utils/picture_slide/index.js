export default function PictureSlideFactory (ngComponent) {
  ngComponent.directive('pictureSlide', pictureSlide)

  function pictureSlide () {
    return {
      templateUrl: 'utils/picture_slide/template.html',
      restrict: 'E',
      scope: {
        pictures: '='
      },
      link (scope, element, attrs) {
        scope.nextSlide = nextSlide
        scope.previusSlide = previusSlide
        scope.moveTo = moveTo
        scope.actualSlide = 0
        scope.isThisSlide = (index) => {
          return scope.actualSlide === index
        }

        const container = element[0].querySelector('.picture-slide-container')

        function nextSlide (index) {
          moveSlide(index, 'right')
        }

        function previusSlide (index) {
          moveSlide(index, 'left')
        }

        function moveSlide (index, direction) {
          const nextSlide = nextIndex(index, direction)
          moveTo(nextSlide)
        } 

        function moveTo (index) {
          const newPosition = index * 100 * -1
          container.setAttribute('style', 
                                 `left: ${newPosition}%`)
          scope.actualSlide = index
        }

        function nextIndex (index, direction, max = scope.pictures.length) {
          if (direction === 'left') {
            return (index === 0) ? max - 1 : index - 1
          } else {
            return (index + 1 === max) ? 0: index + 1
          }
        }
      }
    }
  }
}
