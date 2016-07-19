export default function ProductsDirectiveFactory (ngComponent) {
  ngComponent.directive('productsList', productsTag)

  function productsTag ($q) {
    return {
      templateUrl: 'products/list_directive/template.html',
      restrict: 'E',
      scope: {
        products: '=',
        paginationFunc: '=',
        page: '=',
        pageSize: '=?',
        canLoadMore: '=?'
      },
      link: productsTagLink
    }

    function productsTagLink (scope, element, attrs) {
      scope.canLoadMore = true
      scope.loadMore = loadMore
      scope.moreDataCanBeLoaded = moreDataCanBeLoaded
      scope.pageSize = (typeof scope.pageSize === 'undefined') ? 15 : scope.pageSize

      function moreDataCanBeLoaded () {
        return scope.canLoadMore
      }

      function loadMore () {
        if (moreDataCanBeLoaded()) {
          scope.page = scope.page + 1
          return scope.paginationFunc(scope.page)
          .then((newProducts) => {
            if (typeof newProducts !== 'undefined' && newProducts.length < 1) {
              scope.canLoadMore = false
            }
          })
          .catch(() => {
            scope.canLoadMore = false
          })
          .finally(() => {
            scope.$broadcast('scroll.infiniteScrollComplete')
          })
        } else {
          scope.$broadcast('scroll.infiniteScrollComplete')
          return $q.reject()
        }
      }
    }
  }
}
