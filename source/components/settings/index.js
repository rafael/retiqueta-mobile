export default function SettingsFactory (ngComponent) {
  ngComponent.controller('settingsCtrl', settingsCtrl)

  function settingsCtrl ($ionicAnalytics, $scope) {
    $scope.$on("$ionicView.enter", function(event, data) {
      $ionicAnalytics.track('Load', {
        action: 'settings view'
      })
    })
  }
}
