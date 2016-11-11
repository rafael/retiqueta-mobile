export default function ProductDetailFactory (ngComponent) {
  ngComponent.controller('productDetail', productDetail)

  function productDetail (ENV, currentUser, Product, $ionicHistory, $translate, $timeout, $stateParams, Utils, $ionicScrollDelegate, CommentStore, $scope, $state) {
    var _ = this
    var openCommentForm = false     
    _.loading = false
    _.product = {} 
    _.optionsModal = false
    _.showCommentForm = false   
    _.commentFormWasShowed = false
    _.goBack = goBack
    _.currentUser = currentUser
    _.ToggleCommentForm = ToggleCommentForm
    _.productNotEmpty = productNotEmpty
    _.showOptions = showOptions
    _.isOwner = isOwner
    _.deleteProduct = deleteProduct

    function deleteProduct (id) {
      Utils.confirm(
        $translate.instant('PRODUCT_DELETE_CONFIRMATION'), 
        $translate.instant('PRODUCT_DELETE_MESSAGE'),
        (buttonIndex) => {
          if (buttonIndex == 1) {
            if (ENV.isProduction()) {
              facebookConnectPlugin.logEvent('product delete request');
            }
            Product.destroy(id)
            .then(() => {
              $state.go('users.me')
            })
            .catch((e) => {
              if (ENV.isProduction()) {
                facebookConnectPlugin.logEvent('product delete request error')
              }
              Utils.swalError(e)
            })
          }
        })
    }

    function isOwner () {
      if (_.product.hasOwnProperty('relationships')) {
        return _.product.relationships.user.id === currentUser.id
      } else {
        return false
      }
    }

    function showOptions () {
      _.optionsModal = !_.optionsModal
    }

    function productNotEmpty () {
      return _.product.hasOwnProperty('attributes') && _.loading === false
    }

    function goBack () {
      if ($ionicHistory.backView() !== null) {
        $ionicHistory.goBack()
      } else {
        $state.go('users.dashboard')
      }
    }

    function LoadProduct () {
      _.loading = true
      Product.get($stateParams.productID,  {
        include: 'user,product_pictures'
      })
      .then((product) => {
        _.product = product
      })
      .catch(Utils.swalError)
      .finally(() => { _.loading = false })
    }

    function ToggleCommentForm (forceShow = false) {
      _.showCommentForm = !_.showCommentForm || forceShow;
      if (_.showCommentForm) {
        scrollComments();
      }
    }

    function needToShowCommentForm () {
      if (openCommentForm) {
        ToggleCommentForm(openCommentForm);
      }
    }

    function scrollComments (parentType = 'products', parentId = _.product.id) {
      if (parentType === 'products' && parentId === _.product.id) {
        $timeout(() => {
          $ionicScrollDelegate.$getByHandle('productDetail').scrollBottom();
        }, 10);
      }
    }

    CommentStore.on('new', scrollComments);
    CommentStore.on('fetchFinish', needToShowCommentForm);

    $scope.$watch(() => _.showCommentForm, (value) => {
      _.commentFormWasShowed = _.commentFormWasShowed || value;
    });

    $scope.$on("$ionicView.enter", function(event, data) {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('product load');
      }
      CommentStore.emit('refresh', 'product', $stateParams.productID);
      _.showCommentForm = false;
      openCommentForm = typeof $stateParams.onComment !== 'undefined';
      _.commentFormWasShowed = typeof $stateParams.onComment !== 'undefined';
      $timeout(() => {
        $ionicScrollDelegate.$getByHandle('productDetail').scrollTop();
      }, 10);
      needToShowCommentForm();
    });
    LoadProduct();
  }
}
