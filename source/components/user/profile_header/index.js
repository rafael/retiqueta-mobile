export default function profileHeaderFactory (ngComponent) {
  ngComponent.directive('profileHeader', profileHeader)

  function profileHeader (User, Utils, ENV) {
    return {
      templateUrl: 'user/profile_header/template.html',
      restrict: 'E',
      scope: {
        user: '='
      },
      link: profileHeaderLink
    };

    function profileHeaderLink (scope, element, attrs) {
      scope.isOwner = attrs.owner === 'true';
      scope.toggleFollowship = toggleFollowship;
      scope.openWebsite = () => {
        window.open(scope.user.attributes.website, '_system');
      };

      function toggleFollowship (following) {
        User.followToggle(scope.user.id, following)
        .then(result => {
          if (ENV.isProduction()) {
            facebookConnectPlugin.logEvent('profile ' + followAction(following) + ' success');
          }
          scope.user.attributes.followers_count += (result.following) ? 1 : -1;
          scope.user.meta.followed_by_current_user = result.following;
        })
        .catch(error => {
          if (ENV.isProduction()) {
            facebookConnectPlugin.logEvent('profile ' + followAction(following) + ' error');
          }
          Utils.swalError(error);
        });
      }

      function followAction (following) {
        return (following) ? 'unfollow':'follow';
      }
    }
  }
}
