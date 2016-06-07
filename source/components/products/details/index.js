export default function ProductDetailFactory (ngComponent) {
  ngComponent.controller('productDetail', productDetail)

  function productDetail (currentUser, Product, $ionicHistory, $timeout, $stateParams, Utils, $ionicScrollDelegate, CommentStore, $scope, $state) {
    var _ = this
    var openCommentForm = false     
    _.product = {} 
    _.goBack = goBack
    _.currentUser = currentUser
    _.showCommentForm = false   
    _.commentFormWasShowed = false
    _.ToggleCommentForm = ToggleCommentForm
    _.productNotEmpty = productNotEmpty

    function productNotEmpty () {
      return _.product.hasOwnProperty('attributes')
    }

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
    CommentStore.on('fetchFinish', needToShowCommentForm)

    $scope.$watch(() => _.showCommentForm, (value) => {
      _.commentFormWasShowed = _.commentFormWasShowed || value
    })

    $scope.$on("$ionicView.enter", function(event, data) {
      CommentStore.emit('refresh')
      _.showCommentForm = false
      openCommentForm = typeof $stateParams.onComment !== 'undefined'
      _.commentFormWasShowed = typeof $stateParams.onComment !== 'undefined'
      $timeout(() => {
        $ionicScrollDelegate.$getByHandle('productDetail').scrollTop()
      }, 10)
      needToShowCommentForm()
    })
    LoadProduct()
  }
}
