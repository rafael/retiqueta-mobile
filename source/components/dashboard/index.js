export default function DashboardFactory (ngComponent) {
  ngComponent.controller('dashboardCtrl', dashCtrl)

  function dashCtrl (Product, Timeline, Utils, $scope, ENV, $rootScope) {
    var _ = this
    var ONE_HOUR = 60 * 60;
    var ONE_DAY = 60 * 60 * 24;
    var date = new Date
    _.cards = []

    function howOld(card) {
      var difference = (date - new Date(card.data.attributes.created_at)) / 1000
      var age = 0
      if (difference < ONE_HOUR) {
        age = Math.round(difference / 60) + "m"
      } else if (difference < ONE_DAY) {
        age = Math.round(difference / 3600)
        if(age == 1) {
          age =  "1 hr"
        } else {
          age =  age + " hrs"
        }
      } else {
        age = Math.round(difference / 86400) + " d"
      }
      if (!ENV.isProduction()) {
        console.log('Card is: ' + age + ' old.')
      }
      card.data.attributes.age = age
    }

    function getCards() {
      if (!ENV.isProduction()) {
        console.log('Getting timeline cards.')
      }
      var request = {
        'page[number]': 1,
        'page[size]': 5
      }
      Timeline.get(request).then((result) => {
        if(typeof result !== 'undefined' || result.length > 0) {
            if (!ENV.isProduction()) {
              console.log('Got a result' + result)
            }
          result.map(howOld)
          _.cards = result
        }
      }).catch((error) => {
        if (ENV.isProduction()) {
          facebookConnectPlugin.logEvent('timeline request error');
        }
        if (!ENV.isProduction()) {
          console.log('Timeline error ' + error)
        }
        Utils.swalError(error)
      })
      .finally(() => {
        if (!ENV.isProduction()) {
          console.log('Timeline request complete')
        }
      })
    }

    $scope.$on("$ionicView.enter", () => {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('timeline load')
      }
      getCards()
    })
  }
}
