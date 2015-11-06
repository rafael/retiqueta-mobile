export default function(ngComponent) {
  ngComponent.controller('dashboardCtrl', dashCtrl)

  function dashCtrl(currentUser, Product) {
    var _ = this
    _.current_user = currentUser
  }
}
