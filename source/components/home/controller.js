export default function HomeCtrlFactory (ngComponent) {
  ngComponent.controller('homeCtrl', homeCtrl)

  function homeCtrl (ENV) {
    var _ = this
    _.Appname = ENV.app_name
  }
}
