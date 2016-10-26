export default function FacebookButtonDirectiveFactory (ngComponent) {
  ngComponent.directive('facebookLogin', facebookLogin)

  function facebookLogin (FacebookAuth, Auth, $state, $ionicLoading, Utils, $ionicAnalytics) {
    return {
      restrict: 'E',
      templateUrl: 'auth/facebook_login/template.html',
      link (scope, element, attrs) {
        scope.loginWithFacebook = loginWithFacebook

        function loginWithFacebook () {
          facebookConnectPlugin.logEvent('fblogin.request')
          FacebookAuth.loginWithFacebook()
          .then(successOnFacebook)
          .catch(errorOnFacebook)
        }

        function successOnFacebook (result) {
          Auth.loginToken(result)
          $state.go('users.dashboard')
        }

        function errorOnFacebook (error) {
          facebookConnectPlugin.logEvent('fblogin.request.error')
          Utils.swalError(error)
        }
      }
    }
  }
}
