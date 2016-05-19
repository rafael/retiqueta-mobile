export default function ProductDetailFactory (ngComponent) {
  ngComponent.controller('productDetail', productDetail)

  function productDetail (currentUser, Product, $ionicHistory, $stateParams, Utils) {
    var _ = this
    _.product = null
    _.goBack = goBack
    _.currentUser = currentUser
    _.showCommentForm = typeof $stateParams.onComment !== 'undefined'
    _.ToggleCommentForm = ToggleCommentForm

    function goBack () {
      $ionicHistory.goBack()
    }

    function LoadProduct () {
      Product.get($stateParams.productID,  {
        include: 'user,product_pictures'
      })
      .then((product) => {
        _.product = product
      })
      .catch(Utils.swalError)
    }

    function ToggleCommentForm () {
      _.showCommentForm = !_.showCommentForm
    }

    LoadProduct()

  }
}
