export default function DashboardFactory (ngComponent) {
  ngComponent.controller('dashboardCtrl', dashCtrl)

  function dashCtrl ($ionicScrollDelegate,
    Product,
    Timeline,
    Utils,
    $scope,
    ENV,
    $rootScope) {
    var _ = this;
    var ONE_HOUR = 60 * 60;
    var ONE_DAY = 60 * 60 * 24;
    var date = new Date;
    _.cards = [];
    _.isMore = true;
    _.loading = false;
    _.page = 1;
    _.pageSize = 5;
    _.getCards = getCards;

    function filterCard(card) {
      return card.type == 'featured_picks' || card.type == 'user_likes';
    }

    function howOld(card) {
      var difference = (date - new Date(card.attributes.created_at)) / 1000;
      var age = 0;
      if (difference < ONE_HOUR) {
        age = Math.max(Math.round(difference / 60),1) + "m";
      } else if (difference < ONE_DAY) {
        age = Math.round(difference / 3600);
        if(age == 1) {
          age =  "1 hr";
        } else {
          age =  age + " hrs";
        }
      } else {
        age = Math.round(difference / 86400) + " d";
      }
      card.attributes.age = age;
    }

    function getCards(page = 1, add = false) {
      if(!_.loading && _.isMore) {
        _.loading = true;
        if (!ENV.isProduction()) {
          console.log('Timeline card request: page->' + page + ' add-> ' + add);
        }
        if (page > 1 && ENV.isProduction()) {
          facebookConnectPlugin.logEvent('timeline request scroll');
        }
        var request = {
          'page[number]': page,
          'page[size]': _.pageSize
        }
        Timeline.get(request).then((result) => {
          if(typeof result !== 'undefined' && result.length > 0) {
            result.map(howOld);
            result = result.filter(filterCard);
            if(add) {
              _.cards = _.cards.concat(result);
            } else {
              _.cards = result;
            }
          } else if(typeof result !== 'undefined' && result.length === 0){
            _.isMore = false;
            if (ENV.isProduction()) {
              facebookConnectPlugin.logEvent('timeline request end');
            } else {
              console.log('No more results ' + _.isMore);
            }
          }
        }).catch((error) => {
          if (ENV.isProduction()) {
            facebookConnectPlugin.logEvent('timeline request error');
          } else {
            console.log('Timeline error ' + error);
          }
          Utils.swalError(error);
          _.loading = false;
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
        .finally(() => {
          if (ENV.isProduction()) {
            facebookConnectPlugin.logEvent('timeline request complete');
          } else {
            console.log('Timeline request complete');
          }
          if(_.isMore) {
            _.page = page + 1;
          }
          _.loading = false;
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      } else {
          console.log('No more results ' + _.isMore);
      }
      return _.cards
    }

    $scope.$on("$ionicView.enter", () => {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('timeline load');
      } else {
        console.log('Timeline load');
      }
      _.isMore = true;
      getCards();
    })
  }
}
