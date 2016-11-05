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

    function LoadProduct () {
      _.text = ''
      if ($stateParams.hasOwnProperty('word') && typeof $stateParams.word !== 'undefined' && $stateParams.word !== '') {
        _.text = $stateParams.word
        searchProducts(1, false, 10)
      } else {
        searchProducts(1, false, 10)
      }
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

        return Product.search(searchRequest).then((result) => {
          lastSearch = angular.copy(_.text)
          return setProducts(result, add)
        })
        .catch((error) => {
          if (ENV.isProduction()) {
            facebookConnectPlugin.logEvent('search nextpage request error');
          }
          _.loading = false
          $scope.$broadcast('scroll.infiniteScrollComplete');
          Utils.swalError(error)
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
    }

    function setProducts (newProducts, add) {
      if (add) {
        _.products = _.products.concat(newProducts)
      } else {
        _.products = newProducts
      }

      if (!ENV.isProduction()) {
        console.log('Product length ' + _.products.length)
      }

      _.noResult = _.products.length === 0

      return newProducts
    }

    Object.observe(_, (changes) => {
      changes.forEach((change) => {
        if (change.name === 'text' && _.text === '') {
          _.page = 1
          searchProducts()
        }
      })
    })

    $scope.$on("$ionicView.enter", () => {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('search load');
      }
    })
    LoadProduct()
  }
}
