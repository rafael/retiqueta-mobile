export default function ProductDetailFactory (ngComponent) {
  ngComponent.controller('productDetail', productDetail)

  function productDetail (currentUser, Product, $ionicHistory, $timeout, $stateParams, Utils, $ionicScrollDelegate, CommentStore, $scope, $state) {
    var _ = this
    var openCommentForm = typeof $stateParams.onComment !== 'undefined'
    _.product = null
    _.goBack = goBack
    _.currentUser = currentUser
    _.showCommentForm = false   
    _.ToggleCommentForm = ToggleCommentForm

    function goBack () {
      if ($ionicHistory.backView() !== null) {
        $ionicHistory.goBack()
      } else {
        $state.go('users.dashboard')
      }
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

    function ToggleCommentForm (forceShow = false) {
      _.showCommentForm = !_.showCommentForm || forceShow
      if (_.showCommentForm) {
        scrollComments()
      }
    }

    function needToShowCommentForm () {
      if (openCommentForm) {
        ToggleCommentForm(openCommentForm)
      }
    }

    function scrollComments () {
      $timeout(() => {
        $ionicScrollDelegate.$getByHandle('productDetail').scrollBottom()
      }, 10)
    }

    CommentStore.on('new', scrollComments)
    CommentStore.on('fetchFinish', scrollComments)

    $scope.$on("$ionicView.enter", function(event, data) {
      _.showCommentForm = false
      $timeout(() => {
        $ionicScrollDelegate.$getByHandle('productDetail').scrollTop()
      }, 10)
      needToShowCommentForm()
    })
    LoadProduct()
  }
}
