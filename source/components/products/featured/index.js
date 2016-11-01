export default function FeaturedDirective (ngComponent) {
  ngComponent.directive('featuredProducts', featuredProducts)

  function featuredProducts (Product, Utils, $q, $ionicAnalytics) {
    return {
      templateUrl: 'products/featured/template.html',
      restrict: 'E',
      scope: {
        render: '=',
        products: '=',
      },
      link: featuredProductsLink
    }

    function featuredProductsLink (scope, element, attrs) {
      const PAGE_SIZE = 16
      let canLoadMore = true
      let page = 1
      scope.hasPicture = hasPicture
      scope.loadMore = loadMore
      scope.moreDataCanBeLoaded = moreDataCanBeLoaded

      function moreDataCanBeLoaded () {
        return canLoadMore && (scope.products.length === 0 || scope.products.length >= PAGE_SIZE )
      }

      function loadMore () {
        if (moreDataCanBeLoaded()) {
          page = page + 1
          loadFeatured(page)
        } else {
          scope.$broadcast('scroll.infiniteScrollComplete')
          return $q.reject()
        }
      }

      function hasPicture (productPictures) {
        return productPictures.length > 0
      }

      function loadFeatured (page) {
        Product.getTimeline({
          include: 'product_pictures, likes',
          'page[number]': page,
          'page[size]': PAGE_SIZE,
        })
        .then(result => {
          if (page === 1 && result.length > 1) {
            scope.products = result
          } else if (result.length > 1) {
            scope.products = scope.products.concat(result)
          } else {
            canLoadMore = false
          }
        })
        .catch((e) => {
          Utils.swalError(e)
          canLoadMore = false
        })
        .finally(() => {
          scope.$broadcast('scroll.infiniteScrollComplete')
        })
      }

      function render () {
        if (scope.render === true && moreDataCanBeLoaded()) {
          loadFeatured(page)
        }
      }

      scope.$watch(() => {
        return scope.render
      }, () => {
        render()
      })

      render()
    }
  }
}
