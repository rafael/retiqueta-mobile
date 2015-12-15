export default function updateTokenCtrlFactory (ngComponent) {
  ngComponent.controller('updateTokenCtrl', updateTokenCtrl)

  function updateTokenCtrl (Auth, $state) {
    if (Auth.refreshToken()) {
      $state.go('login')
    }
  }
}
