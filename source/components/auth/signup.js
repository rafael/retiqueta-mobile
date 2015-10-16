export default function(ngComponent) {
  ngComponent.controller('signupCtrl', signupCtrl)

  function signupCtrl(ENV) {
    var _ =  this
    _.Appname = ENV.app_name
  }
}
