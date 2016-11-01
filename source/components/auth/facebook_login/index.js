export default function FacebookButtonDirectiveFactory (ngComponent) {
  ngComponent.directive('facebookLogin', facebookLogin)

  function facebookLogin (FacebookAuth, Auth, $state, $ionicLoading, Utils, ENV) {
    return {
      restrict: 'E',
      templateUrl: 'auth/facebook_login/template.html',
      link (scope, element, attrs) {
        scope.loginWithFacebook = loginWithFacebook

        function loginWithFacebook () {
          if (ENV.isProduction()) {
            facebookConnectPlugin.logEvent('fblogin request');
          }
          FacebookAuth.loginWithFacebook()
          .then(successOnFacebook)
          .catch(errorOnFacebook)
        }

        function successOnFacebook (result) {
          Auth.loginToken(result)
          $state.go('users.dashboard')
        }

        function errorOnFacebook (error) {
          if (ENV.isProduction()) {
            facebookConnectPlugin.logEvent('fblogin request error');
          }
          Utils.swalError(error)
        }
      }
    }
  }
}
