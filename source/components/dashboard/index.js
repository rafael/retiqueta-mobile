export default function DashboardFactory (ngComponent) {
  ngComponent.controller('dashboardCtrl', dashCtrl)

  function dashCtrl (productsArray) {
    var _ = this
    _.products = productsArray
  }
}
