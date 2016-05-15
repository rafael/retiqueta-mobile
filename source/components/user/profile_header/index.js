export default function profileHeaderFactory (ngComponent) {
  ngComponent.directive('profileHeader', profileHeader)

  function profileHeader (User, Utils) {
    return {
      templateUrl: 'user/profile_header/template.html',
      restrict: 'E',
      scope: {
        user: '='
      },
      link: profileHeaderLink     
    }

    function profileHeaderLink (scope, element, attrs) {
      scope.isOwner = attrs.owner === 'true'
      scope.toggleFollowship = toggleFollowship

      function toggleFollowship (following) {
        User.followToggle(scope.user.id, following)
        .then(result => {
          scope.user.attributes.followers_count += (result.following) ? 1 : -1
          scope.user.meta.followed_by_current_user = result.following
        })
        .catch(error => {
          Utils.swalError(error)
        })
      }
    }
  }
}
