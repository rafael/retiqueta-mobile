import onNotification from './onnotification'
import RegisterToken from './register_token'

export default function InitPushFactory (Auth, User, $q, ENV, $ionicPush, $ionicPlatform, Utils) {
  let saveTokenOnApi = RegisterToken(...arguments)
  function InitPush () {
    var push = $ionicPush.init({
      "debug": ENV.isDevelopment(),
      "onNotification": onNotification(ENV),
      "onRegister": onRegisterCallback
    })

    function onRegisterCallback (data) {
      Utils.logger.info('Device has been register on Ionic Platform Push')
      Utils.logger.log(data)
      // persist the token in the Ionic platforms

      saveTokenOnApi(data.token)
    }
  }

  return function init () {
    $ionicPlatform.ready(InitPush)
  }
}

function isAlreadyInitPush () {
  var token = JSON.parse(window.localStorage.getItem('ionic_io_push_token') || '{}')
  return token.hasOwnProperty('token')
}
