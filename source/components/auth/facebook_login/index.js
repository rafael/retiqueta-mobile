export default function FacebookButtonDirectiveFactory (ngComponent) {
  ngComponent.directive('facebookLogin', facebookLogin)

  function facebookLogin (FacebookAuth, Auth, $state, $ionicLoading, Utils) {
    return {
      restrict: 'E',
      templateUrl: 'auth/facebook_login/template.html',
      link (scope, element, attrs) {
        scope.loginWithFacebook = loginWithFacebook

        function loginWithFacebook () {
          $ionicLoading.show()
          FacebookAuth.loginWithFacebook()
          .then(successOnFacebook)
          .catch(errorOnFacebook)
          .finally($ionicLoading.hide)
        }

        function successOnFacebook (result) {
          Auth.loginToken(result)
          $state.go('users.dashboard')
        }

        function errorOnFacebook (error) {
          Utils.swalError(error)
        }

      }
    }
  }
}
