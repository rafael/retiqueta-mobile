import InitPushFactory from './notifications/init'

export default function notificationFactory (ngComponent) {
  ngComponent.factory('AppPush', AppPush)

  function AppPush(Auth, User, $q, ENV, $ionicPush, $ionicPlatform, Utils) {
    let Model = {
      init: InitPushFactory(...arguments)
    }

    return Model
  }
}
