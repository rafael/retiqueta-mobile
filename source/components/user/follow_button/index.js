export default function FollowButtonFactory (ngComponent) {
  ngComponent.directive('followButton', followButton)

  function followButton (User, $translate) {
    return {
      templateUrl: 'user/follow_button/index.html',
      restrict: 'E',
      scope: {
        following: '=',
        followHandler: '='
      },
      link (scope, element, attrs) {
        scope.toggleFollowship = (following) => {
          scope.followHandler(following)
        }

        scope.followButtonText = () => {
          if (scope.following) {
            return $translate.instant('UNFOLLOW')
          } else {
            return $translate.instant('FOLLOW')
          }
        }
      }
    }
  }
}
