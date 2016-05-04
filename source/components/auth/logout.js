export default function logoutCtrlFactory (ngComponent) {
  ngComponent.controller('logoutCtrl', logoutCtrl)

  function logoutCtrl ($state, Auth) {
    Auth.logout()
    function init() {
      window.location.replace('/#')
      window.location.reload()
    }
    init()
  }
}
