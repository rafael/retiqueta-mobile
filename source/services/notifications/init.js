import onNotification from './onnotification'
import RegisterToken from './register_token'

export default function InitPushFactory (ioPush, Auth, User, $q, ENV) {
  return function init () {
    if( isAlreadyInitPush() ) {
      ioPush.init({
        "debug": ENV.isDevelopment(),
        "onNotification": onNotification(ENV),
        "onRegister": RegisterToken(Auth, User, $q, ENV)
      })
    }
    return ioPush
  }
}

function isAlreadyInitPush () {
  var token = window.localStorage.getItem('ionic_io_push_token')
  if(token === null) {
    return false
  } else {
    return token.hasOwnProperty('token')
  }
}
