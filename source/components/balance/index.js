export default function balanceCtrlFactory (ngComponent) {
  ngComponent.controller('balanceCtrl', balanceCtrl)

  function balanceCtrl (currentUser, Payout, Utils, $state, $scope, $ionicAnalytics) {
    var _ = this
    _.user = currentUser
    _.isBusy = false
    _.payouts = []
    _.hasBankInformation = hasBankInformation
    _.hasBalanceAvaliable = hasBalanceAvaliable
    _.classByStatus = classByStatus
    _.requestPayout = requestPayout
    _.statusToLocale = statusToLocale

    function requestPayout () {      
      $ionicAnalytics.track('Tap', {
        action: 'requestPayout'
      })
      $ionicAnalytics.track('fetch start', {
        action: 'requestPayout'
      })
      _.isBusy = true
      Payout.create({ amount: _.user.attributes.available_balance })
      .then(result => {  
        $ionicAnalytics.track('fetch success', {
          action: 'requestPayout'
        })
        reloadBalance()
     })
      .catch((e) => {
        $ionicAnalytics.track('fetch error', {
          action: 'requestPayout',
          error: e
        })
        Utils.swalError(e)
      })
      .finally(() => { _.isBusy = false })
    }

    function reloadBalance () {
      _.user.attributes.available_balance = 0
      getPayouts()
    }

    function classByStatus (payoutStatus) {
      switch (payoutStatus) {
        case 'processing':
          return 'button-stable'
        default:
          return 'button-outline button-positive'
      }
    }

    function statusToLocale (payoutStatus) {
      return `BALANCE_STATUS_${payoutStatus.toUpperCase()}`
    }

    function hasBalanceAvaliable () {
      return _.user.attributes.available_balance > 0
    }

    function hasBankInformation () {
      return _.user.attributes.bank_account !== null && typeof _.user.attributes.bank_account === 'object'
    }

    function getPayouts () {
      $ionicAnalytics.track('fetch start', {
        action: 'get payouts on balance view'
      })
      Payout.all()
      .then(result => {
        $ionicAnalytics.track('fetch success', {
          action: 'get payouts on balance view'
        })
        return _.payouts = result 
      })
      // .then(result => { Utils.logger.log(result) })
      .catch((error) => {
        $ionicAnalytics.track('fetch success', {
          action: 'get payouts on balance view'
        })
        Utils.swalError(error)
      })
    }
    
    $scope.$on('$ionicView.enter', () => {
      $ionicAnalytics.track('Load', {
        action: 'Balance view'
      })
      getPayouts()
    })
  }
}
