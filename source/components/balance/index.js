export default function balanceCtrlFactory (ngComponent) {
  ngComponent.controller('balanceCtrl', balanceCtrl)

  function balanceCtrl (currentUser, Payout, Utils, $state, $scope, ENV) {
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
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('payout request');
      }
      _.isBusy = true
      Payout.create({ amount: _.user.attributes.available_balance })
      .then(result => {  
        reloadBalance()
     })
      .catch((e) => {
        if (ENV.isProduction()) {
          facebookConnectPlugin.logEvent('payout request error')
        }
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
      Payout.all()
      .then(result => {
        return _.payouts = result 
      })
      // .then(result => { Utils.logger.log(result) })
      .catch((error) => {
        Utils.swalError(error)
      })
    }

    $scope.$on('$ionicView.enter', () => {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('payouts load')
      }
      getPayouts()
    })
  }
}
