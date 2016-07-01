export default function searchFactory (ngComponent) {
  ngComponent.controller('SearchProductCtrl', SearchProductCtrl)

  function SearchProductCtrl (Product, $stateParams, Utils, $q, $scope, $ionicAnalytics) {
    var _ = this
    var lastSearch = ''
    _.text = ''
    _.products = []
    _.noResult = false
    _.loading = false
    _.page = 1
    _.canLoadMore = true

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
      $ionicAnalytics.track('fetch start', {
        action: 'load featured on search'
      })
      return Product.getFeatured({
        include: 'product_pictures',
        'page[number]': page,
        'page[size]': 15,
      }).then((result) => {
        $ionicAnalytics.track('fetch success', {
          action: 'load featured on search'  
        })
        return setProducts(result, add)
      })
      .catch((error) => {
        $ionicAnalytics.track('fetch error', {
          action: 'load featured on search'  
        })
        Utils.swalError(error)
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
      $ionicAnalytics.track('fetch start', {
        action: 'searching',
        page: page,
        text: _.text
      })
      return Product.search({
        q: _.text,
        'page[number]': page,
        'page[size]': 15,
        include: 'user,product_pictures'
      }).then((result) => { 
        lastSearch = angular.copy(_.text)
        $ionicAnalytics.track('fetch success', {
          action: 'searching',
          page: page,
          text: _.text
        })
        return setProducts(result, add) 
      })
      .catch((error) => {
        $ionicAnalytics.track('fetch error', {
          action: 'searching',
          page: page,
          text: _.text
        })
        Utils.swalError(error)
      })
      .finally(() => {
        _.loading = false
        console.log('Search complete')
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
      $ionicAnalytics.track('Load', {
        action: 'search view'
      })
      LoadProduct() 
    })

  }
}
