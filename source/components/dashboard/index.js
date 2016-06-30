export default function DashboardFactory (ngComponent) {
  ngComponent.controller('dashboardCtrl', dashCtrl)

  function dashCtrl (Product, Utils, $scope, $ionicAnalytics) {
    var _ = this
    _.products = []
    _.render = true

    function refreshFeatured() {
      _.render = false
      _.render = true
    }

    $scope.$on("$ionicView.enter", function(event, data) {
      $ionicAnalytics.track('Load', {
        action: 'Load timeline'
      })
      refreshFeatured()
    })
  }
}
