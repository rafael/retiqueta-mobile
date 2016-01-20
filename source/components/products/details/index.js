export default function ProductDetailFactory (ngComponent) {
  ngComponent.controller('productDetail', productDetail)

  function productDetail (ProductData) {
    var _ = this
    _.product = ProductData
  }
}
