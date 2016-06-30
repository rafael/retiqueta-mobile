export default function FacebookButtonDirectiveFactory (ngComponent) {
  ngComponent.directive('facebookLogin', facebookLogin)

  function facebookLogin (FacebookAuth, Auth, $state, $ionicLoading, Utils, $ionicAnalytics) {
    return {
      restrict: 'E',
      templateUrl: 'auth/facebook_login/template.html',
      link (scope, element, attrs) {
        scope.loginWithFacebook = loginWithFacebook

        function loginWithFacebook () {
          $ionicAnalytics.track('fetch start', {
            action: 'loginWithFacebook'
          })
          FacebookAuth.loginWithFacebook()
          .then(successOnFacebook)
          .catch(errorOnFacebook)
        }

        function successOnFacebook (result) {
          $ionicAnalytics.track('fetch success', {
            action: 'loginWithFacebook'
          })
          Auth.loginToken(result)
          $state.go('users.dashboard')
        }

        function errorOnFacebook (error) {
          $ionicAnalytics.track('fetch error', {
            action: 'loginWithFacebook',
            error
          })
          Utils.swalError(error)
        }

      }
    }
  }
}
