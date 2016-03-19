export default function ProductDetailFactory (ngComponent) {
  ngComponent.controller('productDetail', productDetail)

  function productDetail (ProductData, $ionicHistory) {
    var _ = this
    _.product = ProductData
    _.goBack = goBack

    function goBack () {
      $ionicHistory.goBack()
    }
  }
}
