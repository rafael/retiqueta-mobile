export default function ProductsDirectiveFactory (ngComponent) {
  ngComponent.directive('productsList', productsTag)

  function productsTag () {
    return {
      templateUrl: 'products/list_directive/template.html',
      restrict: 'E',
      scope: {
        products: '=',
        paginationFunc: '=',
        page: '='
      },
      link: productsTagLink
    }
  }

  function productsTagLink (scope, element, attrs) {
    let canLoadMore = true
    scope.loadMore = loadMore
    scope.moreDataCanBeLoaded = moreDataCanBeLoaded

    function moreDataCanBeLoaded () {
      return canLoadMore
    }

    function loadMore () {
      if (moreDataCanBeLoaded()) {
        scope.page = scope.page + 1
        return scope.paginationFunc(scope.page)
        .then((newProducts) => {
          if (newProducts.length < 1) {
            canLoadMore = false
          }
        })
        .catch(() => {   
          canLoadMore = false
        })
        .finally(() => {
          scope.$broadcast('scroll.infiniteScrollComplete')
        })
      } else {
        scope.$broadcast('scroll.infiniteScrollComplete')
        return Promise.reject()
      }
    }
  }
}
