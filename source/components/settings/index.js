export default function SettingsFactory (ngComponent) {
  ngComponent.controller('settingsCtrl', settingsCtrl)

  function settingsCtrl (
    ENV,
    $scope,
    $ionicPlatform,
    $cordovaAppVersion) {

    var _ = this
    _.AppVersion = 'App version not detect'
    _.VersionCode = 'Version code not detect'

    function seed() {
      $cordovaAppVersion.getVersionCode().then(function (code) {
          _.VersionCode = code
      });
      $cordovaAppVersion.getVersionNumber().then(function (version) {
          _.AppVersion = version
      });
    }

    $scope.$on("$ionicView.enter", function(event, data) {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('settings load');
      }
    })

    if (ENV.isProduction()) {
      seed()
    }
  }

}
