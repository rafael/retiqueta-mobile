import onNotification from './onnotification'
import RegisterToken from './register_token'

export default function InitPushFactory (ioPush, Auth, User, $q, ENV) {
  return function init () {
    ioPush.init({
      "debug": ENV.isDevelopment(),
      "onNotification": onNotification(ENV),
      "onRegister": RegisterToken(Auth, User, $q, ENV)
    })
  }
}
