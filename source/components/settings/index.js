export default function SettingsFactory (ngComponent) {
  ngComponent.controller('settingsCtrl', settingsCtrl)

  function settingsCtrl (
    ENV,
    $scope,
    $ionicPlatform) {

    var _ = this
    _.deviceInformation = '{ test: value }';
    _.isWebView = 'false';
    _.isIPad = 'false';
    _.isIOS = 'false';
    _.isAndroid = 'false';
    _.isWindowsPhone = 'false';
    _.currentPlatform = 'None';
    _.currentPlatformVersion = '0.0.0';

    $ionicPlatform.ready(function() {
      if($ionicPlatform.version() !== 'undefined') {
        _.deviceInformation = $ionicPlatform.device();
        _.isWebView = $ionicPlatform.isWebView();
        _.isIPad = $ionicPlatform.isIPad();
        _.isIOS = $ionicPlatform.isIOS();
        _.isAndroid = $ionicPlatform.isAndroid();
        _.isWindowsPhone = $ionicPlatform.isWindowsPhone();
        _.currentPlatform = $ionicPlatform.platform();
        _.currentPlatformVersion = $ionicPlatform.version();
      }
    });

    $scope.$on("$ionicView.enter", function(event, data) {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('settings load');
      } else {
        console.log('Settings load')
      }
    })
  }

}
