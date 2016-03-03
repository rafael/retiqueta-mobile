export default function updateTokenCtrlFactory (ngComponent) {
  ngComponent.controller('updateTokenCtrl', updateTokenCtrl)

  function updateTokenCtrl (Auth, $state) {
    Auth.refreshToken()
    .then(result => {
      $state.go('users.dashboard')
    })
    .catch(error => {
      $state.go('auth.login')
    })
  }
}
