const starts_count = 5
const totalArray = Array.apply(null, Array(5))

export default function StarsRatingFactory (ngComponent) {
  ngComponent.directive('starsRating', starsRating)

  function starsRating () {
    return {
      restrict: 'E',
      templateUrl: 'utils/stars_rating/template.html',
      scope: {
        count: "@"
      },
      link: function(scope, element, attrs) {
        var resultHelper = 0
        scope.starsArray = totalArray.map( (value, index) => {
          resultHelper = scope.count - index
          if (resultHelper >= 1) {
            return 1
          } else if (resultHelper > 0 && resultHelper < 1) {
            return 0.5
          } else {
            return 0
          }
        })
      }
    }
  }
}

