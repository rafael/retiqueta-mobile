export default function SettingsFactory (ngComponent) {
  ngComponent.controller('settingsCtrl', settingsCtrl)

  function settingsCtrl (ENV, $scope) {
    $scope.$on("$ionicView.enter", function(event, data) {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('settings load');
      }
    })
  }
}
