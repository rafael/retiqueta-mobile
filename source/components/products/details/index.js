export default function ProductDetailFactory (ngComponent) {
  ngComponent.controller('productDetail', productDetail)

  function productDetail (currentUser, ProductData, $ionicHistory) {
    var _ = this
    _.product = ProductData
    _.goBack = goBack
    _.currentUser = currentUser

    function goBack () {
      $ionicHistory.goBack()
    }
  }
}
