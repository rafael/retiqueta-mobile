export default function logoutCtrlFactory (ngComponent) {
  ngComponent.controller('logoutCtrl', logoutCtrl)

  function logoutCtrl ($state, Auth) {
    window.localStorage.clear()
    Auth.logout()
    $state.go('home')
  }
}
