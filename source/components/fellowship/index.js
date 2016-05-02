export default function fellowshipCtrlFactory (ngComponent) {
  ngComponent.controller('fellowshipCtrl', fellowshipCtrl)

  function fellowshipCtrl (geter, user, Utils) {
    const _ = this
    _.fellowship = []

    function loadFellowship () {
      geter(user.id)
      .then((result) => {
        console.log(result)
        _.fellowship = result
      })
      .catch(Utils.swalError)
    }

    loadFellowship()
  }
}
 
