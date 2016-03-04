export default function logoutCtrlFactory (ngComponent) {
  ngComponent.controller('logoutCtrl', logoutCtrl)

  function logoutCtrl ($state, Auth) {
    Auth.logout()
    location.replace('/')
    ionic.Platform.exitApp()
  }
}
