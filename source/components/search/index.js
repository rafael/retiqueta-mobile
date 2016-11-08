const PAGE_SIZE = 30

export default function searchFactory (ngComponent) {
  ngComponent.controller('SearchProductCtrl', SearchProductCtrl)

  function SearchProductCtrl ($ionicScrollDelegate, Product, $stateParams, Utils, $q, $scope, $rootScope, ENV, $cordovaKeyboard) {
    var _ = this
    var lastSearch = ''
    _.text = ''
    _.products = []
    _.noResult = false
    _.loading = false
    _.page = 1
    _.pageSize = PAGE_SIZE

    // Search function
    _.search = searchProducts
    _.clear = clear

    function LoadProduct (page_size = 16) {
      _.text = ''
      if ($stateParams.hasOwnProperty('word') && typeof $stateParams.word !== 'undefined' && $stateParams.word !== '') {
        _.text = $stateParams.word
      }
      searchProducts(1, false, page_size)
    }

    function clear () {
      _.text = ''
      searchProducts()
    }

    function searchProducts (page = 1, add = false, page_size = PAGE_SIZE) {
      if(!_.loading) {
        if (!ENV.isProduction()) {
          console.log('Search request: page->' + page + ' add-> ' + add + ' text->' + _.text)
        }
        if (lastSearch !== _.text) {
          Utils.logger.info('Different search, reset page')
          _.page = 1
          page = 1
        }

        if (ENV.isProduction()) {
          facebookConnectPlugin.logEvent('search nextpage request')
        }

        _.loading = true

        try {
          $cordovaKeyboard.close()
        } catch(e) {}

        var searchRequest = {
          'q': _.text,
          'page[number]': page,
          'page[size]': page_size,
          'include': 'user,product_pictures'
        }

        Product.search(searchRequest).then((result) => {
          lastSearch = angular.copy(_.text)
          setProducts(result, add)
        })
        .catch((error) => {
          if (ENV.isProduction()) {
            facebookConnectPlugin.logEvent('search nextpage request error');
          }
          _.loading = false
          Utils.swalError(error)
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
        .finally(() => {
          if (!ENV.isProduction()) {
            console.log('Search complete')
          }
          if (page === 1) {
            $ionicScrollDelegate.scrollTop()
          }
          _.loading = false
          _.page = page+1
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }
      return _.products
    }

    function setProducts (newProducts, add) {
      if(!add) {
        _.products = []
      }
      _.products = _.products.concat(newProducts)
      _.noResult = _.products.length === 0

      if (!ENV.isProduction()) {
        console.log('Product length ' + _.products.length)
      }

      return newProducts
    }

    $scope.$on("$ionicView.enter", () => {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('search load');
      }
      LoadProduct()
    })
  }
}
