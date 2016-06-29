export default function wardrobeIndexFactory (ngComponent) {
  ngComponent.controller('wardrobeCtrl', wardrobeCtrl)

  function wardrobeCtrl (user, currentUser, Product, User, $scope, $ionicHistory) {
    var _ = this
    _.user = user
    _.isOwner = (user.id === currentUser.id)
    _.products = []
    _.page = 0
    _.doRefresh = doRefresh
    _.loadMore = loadMore

    function loadMore (nextpage) {
      /* Api dont paginate userProducts
         if (_.text !== '') {
         return doRefresh(nextpage, true)
         } else {
         return Promise.resolve()
         }
         */
      return Promise.resolve()
    }

    function isOwner () {
      return _.user.id === currentUser.id
    }

    function ClearHistoryIfOwner () {
      if (isOwner()) {
        $ionicHistory.clearHistory()
      } 
    }

    function doRefresh (page = 0, add = false) {
      return Product.getByUser(user.id, {
        // 'page[size]': 15,
        // 'page[number]': page,
        include: 'product_pictures'
      })
      .then(result => {
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
      _.noResult = _.products.length === 0 && _.text !== ''
      return newProducts
    }

    function LoadUser () {
      User.get(user.id).then(user => { Object.assign(_.user, user) })
    }

    $scope.$on("$ionicView.enter", function(event, data) {
      LoadUser()
      ClearHistoryIfOwner()
    })

    doRefresh()
  }
}
