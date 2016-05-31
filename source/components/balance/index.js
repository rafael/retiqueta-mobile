export default function balanceCtrlFactory (ngComponent) {
  ngComponent.controller('balanceCtrl', balanceCtrl)

  function balanceCtrl (currentUser, Payout, Utils, $state) {
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
      _.isBusy = true
      Payout.create({ amount: _.user.attributes.available_balance })
      .then(result => {  
        $state.go($state.current, {}, { reload: true, inherit: false, notify: true })
      })
      .catch(Utils.swalError)
      .finally(() => { _.isBusy = false })
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
      .then(result => { return _.payouts = result })
      .then(result => { Utils.logger.log(result) })
      .catch(Utils.swalError)
    }

    getPayouts()
  }
}
