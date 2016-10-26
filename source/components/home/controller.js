export default function HomeCtrlFactory (ngComponent) {
  ngComponent.controller('homeCtrl', homeCtrl)

  function homeCtrl (ENV, $scope, $ionicAnalytics) {
    var _ = this
    _.Appname = ENV.app_name

    $scope.$on('$ionicView.enter', () => {
      facebookConnectPlugin.logEvent('home.load')
    })
  }
}
