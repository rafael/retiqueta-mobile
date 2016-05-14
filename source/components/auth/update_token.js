export default function updateTokenCtrlFactory (ngComponent) {
  ngComponent.controller('updateTokenCtrl', updateTokenCtrl)

  function updateTokenCtrl (Auth, $state, $ionicHistory, ENV, $stateParams, $scope) {
    Auth.refreshToken({
      refresh_token: $stateParams.token, 
      user_id: $stateParams.userID
    })
    .then(result => {
      try {
        $ionicHistory.goBack()
      } catch (e) {
        $state.go('users.dashboard')
      }
    })
    .catch(error => {
      if (ENV.isDevelopment()) {
        console.log(error)
      }
      //location.replace('#/auth/login')
    })

    $scope.$on("$ionicView.leave", function(event, data){
      console.log("State Params: ", data.stateParams);
    });
  }
}
