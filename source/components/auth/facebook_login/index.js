export default function FacebookButtonDirectiveFactory (ngComponent) {
  ngComponent.directive('facebookLogin', facebookLogin)

  function facebookLogin (FacebookAuth, Auth, $state, $ionicLoading, Utils, $ionicAnalytics) {
    return {
      restrict: 'E',
      templateUrl: 'auth/facebook_login/template.html',
      link (scope, element, attrs) {
        scope.loginWithFacebook = loginWithFacebook

        function loginWithFacebook () {
          $ionicAnalytics.track('User try loging with facebook', {})
          FacebookAuth.loginWithFacebook()
          .then(successOnFacebook)
          .catch(errorOnFacebook)
        }

        function successOnFacebook (result) {
          $ionicAnalytics.track('User sucessfuly loging with facebook', {})
          Auth.loginToken(result)
          $state.go('users.dashboard')
        }

        function errorOnFacebook (error) {
          $ionicAnalytics.track('Error on login with facebook', error)
          Utils.swalError(error)
        }

      }
    }
  }
}
