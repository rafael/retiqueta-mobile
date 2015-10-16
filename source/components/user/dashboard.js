export default function(ngComponent) {
  ngComponent.controller('dashboardCtrl', dashCtrl)

  function dashCtrl(currentUser) {
    var _ = this
    console.log(currentUser)
    _.current_user = currentUser
  }
}
