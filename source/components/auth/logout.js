export default function logoutCtrlFactory (ngComponent) {
  ngComponent.controller('logoutCtrl', logoutCtrl)

  function logoutCtrl ($state, Auth) {
    Auth.logout()
    $state.go('login')
  }
}
