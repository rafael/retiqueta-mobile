export default function fellowshipCtrlFactory (ngComponent) {
  ngComponent.controller('fellowshipCtrl', fellowshipCtrl)

  function fellowshipCtrl (geter, user, Utils, viewTitle) {
    const _ = this
    _.fellowship = []
    _.viewTitle = viewTitle

    function loadFellowship () {
      geter(user.id)
      .then((result) => {
        _.fellowship = result
      })
      .catch(Utils.swalError)
    }

    loadFellowship()
  }
}
