export default function ProductDetailFactory (ngComponent) {
  ngComponent.controller('productDetail', productDetail)

  function productDetail (currentUser, ProductData, $ionicHistory, $stateParams) {
    var _ = this
    _.product = ProductData
    _.goBack = goBack
    _.currentUser = currentUser
    _.showCommentForm = typeof $stateParams.onComment !== 'undefined'
    _.ToggleCommentForm = ToggleCommentForm

    function goBack () {
      $ionicHistory.goBack()
    }

    function ToggleCommentForm () {
      _.showCommentForm = !_.showCommentForm
      console.log(_.showCommentForm)
    }

  }
}
