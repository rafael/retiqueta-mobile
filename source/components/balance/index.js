export default function balanceCtrlFactory (ngComponent) {
  ngComponent.controller('balanceCtrl', balanceCtrl)

  function balanceCtrl (currentUser) {
    var _ = this
    _.user = currentUser

    
    function hasBankInformation() {
      return _.user.attributes.bank_account !== null && typeof _.user.attributes.bank_account === 'object'
    }
  }
}
