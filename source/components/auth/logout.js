export default function logoutCtrlFactory (ngComponent) {
  ngComponent.controller('logoutCtrl', logoutCtrl)

  function logoutCtrl ($state, Auth, $ionicHistory) {
    Auth.logout()
    $ionicHistory.clearHistory()
    $ionicHistory.clearCache()
    $state.go('home', { reload: true })
  }
}
