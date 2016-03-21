export default function logoutCtrlFactory (ngComponent) {
  ngComponent.controller('logoutCtrl', logoutCtrl)

  function logoutCtrl ($state, Auth) {
    Auth.logout()
    window.location.replace('/#')
    window.location.reload()
    ionic.Platform.exitApp()
  }
}
