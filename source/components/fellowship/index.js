const PAGE_SIZE = 100
const START_PAGE = 0

export default function fellowshipCtrlFactory (ngComponent) {
  ngComponent.controller('fellowshipCtrl', fellowshipCtrl)

  function fellowshipCtrl ($q, geter, user, Utils, viewTitle, $scope, ENV) {
    const _ = this
    let state = { page: START_PAGE, canLoadMore: true }
    _.fellowship = []
    _.viewTitle = viewTitle
    _.moreDataCanBeLoaded = moreDataCanBeLoaded
    _.loadMore = loadMore

    function moreDataCanBeLoaded () {
      return state.canLoadMore && _.fellowship.length >= PAGE_SIZE     
    }

    function loadMore () {
      if (state.canLoadMore) {
        loadFellowship(state.page + 1)
        .then((result) => {
          if (result.length < PAGE_SIZE) {
            state.canLoadMore = false
          }  
        })
        .catch((e) => {
          Utils.logger.info('Error loading more fellowship relationship')
          Utils.logger.log(e)
          state.canLoadMore = false
        })
        .finally(() => {
          scope.$broadcast('scroll.infiniteScrollComplete')
        })
      } else {
        scope.$broadcast('scroll.infiniteScrollComplete')
      }
    }

    function loadFellowship (page = START_PAGE) {
      if (page === 1) {
        _.fellowship = []
        state.canLoadMore = true
      }
      state.page = page
      return geter(user.id, {
        'page[number]': page,
        'page[size]': PAGE_SIZE
      })
      .then((result) => {
        _.fellowship = _.fellowship.concat(result)
        return result
      })
      .catch(Utils.swalError)
    }
  
    $scope.$on("$ionicView.enter", function(event, data) {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('friends load');
      }
      loadFellowship(START_PAGE)
    })
  }
}
