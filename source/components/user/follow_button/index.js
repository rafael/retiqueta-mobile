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
      link: followButtonLink     
    }
  }

  function followButtonLink (scope, element, attrs) {
    scope.toggleFollowship = toggleFollowship
    scope.followButtonText = followButtonText
    
    function toggleFollowship (following) {
      scope.followHandler(following)
    }
  
    function followButtonText () {
      if (scope.following) {
        return $translate.instant('UNFOLLOW')
      } else {
        return $translate.instant('FOLLOW')
      }
    }
  }
}
