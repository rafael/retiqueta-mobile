export default function fellowshipCtrlFactory (ngComponent) {
  ngComponent.controller('fellowshipCtrl', fellowshipCtrl)

  function fellowshipCtrl (geter, user, Utils, viewTitle, $scope, $ionicAnalytics) {
    const _ = this
    _.fellowship = []
    _.viewTitle = viewTitle

    function loadFellowship () {
      geter(user.id)
      .then((result) => {
        _.fellowship = result
      })
      .catch(Utils.swalError)
    }
  
    $scope.$on("$ionicView.enter", function(event, data) {
      $ionicAnalytics.track('Load', {
        action: 'viewTitle'
      })
      loadFellowship()
    })
  }
}
