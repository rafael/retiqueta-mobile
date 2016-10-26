const PAGE_SIZE = 30

export default function searchFactory (ngComponent) {
  ngComponent.controller('SearchProductCtrl', SearchProductCtrl)

  function SearchProductCtrl ($ionicScrollDelegate, Product, $stateParams, Utils, $q, $scope, $rootScope, $ionicAnalytics, $cordovaKeyboard) {
    var _ = this
    var lastSearch = ''
    _.text = ''
    _.products = []
    _.noResult = false
    _.loading = false
    _.page = 1
    _.canLoadMore = true
    _.pageSize = PAGE_SIZE

    // Search function
    _.search = searchProducts
    _.loadMore = loadMore
    _.clear = clear

    function LoadProduct () {
      if ($stateParams.hasOwnProperty('word') && typeof $stateParams.word !== 'undefined' && $stateParams.word !== '') {
        _.text = $stateParams.word
        searchProducts()
      } else if (_.text !== '') {
        searchProducts()
      } else {
        prePopulate()
      }
    }

    function clear () {
      _.text = ''
      prePopulate()
    }

    function prePopulate (page = 1, add = false) {
      facebookConnectPlugin.logEvent('search.request')
      return Product.getFeatured({
        include: 'product_pictures',
        'page[number]': page,
        'page[size]': PAGE_SIZE,
      }).then((result) => {
        return setProducts(result, add)
      })
      .catch((error) => {
        facebookConnectPlugin.logEvent('search.request.error')
        Utils.swalError(error)
      })
      .finally(() => {
        if (page === 1) {
          $ionicScrollDelegate.scrollTop()
        }
      })
    }

    function loadMore (nextpage) {
      if (_.text !== '') {
        return populateWithProduct(nextpage, true)
      } else {
        return prePopulate(nextpage, true)
      }
    }

    function searchProducts (page = 1) {
      if (_.text === '') { return }
      _.noResult = false
      _.loading = true
      try {
        $cordovaKeyboard.close()
      } catch(e) {}
      console.log('Searching: ', _.text)
      populateWithProduct(page)
    }

    function populateWithProduct (page, add = false) {
      if (lastSearch !== _.text) {
        Utils.logger.info('Diferent search, reset page and canLoadMore')
        _.canLoadMore = true
        _.page = 1
        page = 1
      }
      facebookConnectPlugin.logEvent('search.nextpage.request')
      if (page === 1) {
        $rootScope.$broadcast('loading:show')
      }
      return Product.search({
        q: _.text,
        'page[number]': page,
        'page[size]': PAGE_SIZE,
        include: 'user,product_pictures'
      }).then((result) => {
        lastSearch = angular.copy(_.text)
        return setProducts(result, add)
      })
      .catch((error) => {
        facebookConnectPlugin.logEvent('search.nextpage.request.error')
        Utils.swalError(error)
      })
      .finally(() => {
        _.loading = false
        console.log('Search complete')
        if (page === 1) {
          $ionicScrollDelegate.scrollTop()
        }
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

    Object.observe(_, (changes) => {
      changes.forEach((change) => {
        if (change.name === 'text' && _.text === '') {
          _.page = 1
          _.canLoadMore = true
          prePopulate()
        }
      })
    })

    $scope.$on("$ionicView.enter", () => {
      facebookConnectPlugin.logEvent('search.load')
      _.canLoadMore = true
    })
    LoadProduct()
  }
}
