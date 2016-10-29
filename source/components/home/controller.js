export default function HomeCtrlFactory (ngComponent) {
  ngComponent.controller('homeCtrl', homeCtrl)

  function homeCtrl (ENV, $scope) {
    var _ = this
    _.Appname = ENV.app_name

    $scope.$on('$ionicView.enter', () => {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('home load');
      }
    })
  }
}
