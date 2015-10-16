export default function(ngComponent) {
  ngComponent.controller('loginCtrl', loginCtrl)

  function loginCtrl(ENV) {
    var _ =  this
    _.Appname = ENV.app_name
  }
}
