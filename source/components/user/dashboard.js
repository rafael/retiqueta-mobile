export default function(ngComponent) {
  ngComponent.controller('dashboardCtrl', dashCtrl)

  function dashCtrl(currentUser) {
    var _ = this
    _.current_user = currentUser
  }
}
