export default function updateTokenCtrlFactory (ngComponent) {
  ngComponent.controller('updateTokenCtrl', updateTokenCtrl)

  function updateTokenCtrl (Auth, $state) {
    console.log($state)
    Auth.refreshToken()
    .then(result => {
      $state.back()
    })
    .catch(error => {
      console.log(error)
      $state.go('auth.login')
    })
  }
}
