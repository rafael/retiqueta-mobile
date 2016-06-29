export default function profileResumeFactory (ngcomponent) {
  ngcomponent.directive('profileResume', profileResume)

  function profileResume (User, Utils, Auth, $state) {
    return {
      templateUrl: 'user/profile_resume/template.html',
      restrict: 'E',
      scope: {
        user: '=',
        ownerFollowing: '='
      },
      link: profileResumeLink     
    }

    function profileResumeLink (scope, element, attrs) {
      scope.isOwner = false
      scope.toggleFollowship = followShip
      scope.goToUserProfile = goToUserProfile

      function goToUserProfile (id) {
        $state.go('users.profile', { userID: id })
      } 

      function setIsOwner () {
        Auth.getCurrentUser()
        .then(user => {
          scope.isOwner = scope.user.id === user.id
        })
      }

      function followShip (following) {
        User.followToggle(scope.user.id, following)
        .then(result => {
          scope.ownerFollowing = result.following 
        })
        .catch(Utils.swalError)
      }

      scope.$watchCollection(() => {
        return scope.user
      }, () => {
        setIsOwner()
      })
    }
  }
}
