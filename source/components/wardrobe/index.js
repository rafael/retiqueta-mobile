const PAGE_SIZE = 30
const START_PAGE = 1

export default function wardrobeIndexFactory (ngComponent) {
  ngComponent.controller('wardrobeCtrl', wardrobeCtrl)

  function wardrobeCtrl ($state, user, currentUser, Product, User, $scope, $ionicHistory, $ionicAnalytics) {
    var _ = this
    _.user = user
    _.isOwner = (user.id === currentUser.id)
    _.products = []
    _.page = START_PAGE
    _.pageSize = PAGE_SIZE
    _.canLoadMore = true
    _.doRefresh = doRefresh
    _.loadMore = loadMore
    _.hasGoBack = hasGoBack
    _.goBack = goBack

    function goBack () {
      return history.back()
    }

    function hasGoBack () {
      return (user.id !== currentUser.id)
    }

    function loadMore (nextpage) {
      if (_.canLoadMore) {
        return doRefresh(nextpage, true)
        .then((result) => {
          if (result.length < 1) {
            _.canLoadMore = false
          }
        })
      } else {
         return Promise.resolve()
      }
      // return Promise.resolve()
    }

    function isOwner () {
      return _.user.id === currentUser.id
    }

    function ClearHistoryIfOwner () {
      if (isOwner()) {
        $ionicHistory.clearHistory()
      }
    }

    function doRefresh (page = START_PAGE, add = false) {
      $ionicAnalytics.track('fetch start', {
        action: 'wardrobe products'
      })
      return Product.getByUser(user.id, {
        'page[size]': PAGE_SIZE,
        'page[number]': page,
        include: 'product_pictures'
      })
      .then(result => {
        $ionicAnalytics.track('fetch success', {
          action: 'wardrobe products'
        })
        return setProducts(result, add)
      })
      .finally(() => {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete')
      })
    }

    function setProducts (newProducts, add) {
      if (add) {
        _.products = _.products.concat(newProducts)
      } else {
        _.products = newProducts
      }
      return newProducts
    }

    function LoadUser () {
      User.get(user.id)
      .then(user => { Object.assign(_.user, user) })
      // .finally(() => { console.log(_.user) })
    }

    $scope.$on("$ionicView.enter", function(event, data) {
      $ionicAnalytics.track('Load', {
        action: 'wardrobe view'
      })
      _.canLoadMore = true
      LoadUser()
      ClearHistoryIfOwner()
    })

    doRefresh()
  }
}
