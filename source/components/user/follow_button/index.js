export default function FollowButtonFactory (ngComponent) {
  ngComponent.directive('followButton', followButton)

  function followButton (User, $translate, $ionicAnalytics) {
    return {
      templateUrl: 'user/follow_button/index.html',
      restrict: 'E',
      scope: {
        following: '=',
        followHandler: '='
      },
      link: followButtonLink     
    }

    function followButtonLink (scope, element, attrs) {
      scope.toggleFollowship = toggleFollowship
      scope.followButtonText = followButtonText

      function toggleFollowship (following) {
        $ionicAnalytics.track('fetch start', {
          action: followAction(following)
        })
        scope.followHandler(following)
      }

      function followAction (following) {
        return (following) ? 'UNFOLLOW':'FOLLOW'
      }

      function followButtonText () {
        return $translate.instant(followAction(scope.following))
      }
    }
  }
}
