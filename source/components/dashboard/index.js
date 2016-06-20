export default function DashboardFactory (ngComponent) {
  ngComponent.controller('dashboardCtrl', dashCtrl)

  function dashCtrl (Product, Utils, $scope) {
    var _ = this
    _.products = []

    function refreshFeatured () {
      Product.getFeatured({
        include: 'product_pictures, likes'
      })
      .then(result => {
        _.products = result
      })
      .catch(Utils.swalError)
    }

    $scope.$on("$ionicView.enter", function(event, data) {
      refreshFeatured()
    })
  }
}
