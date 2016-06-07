import InitPushFactoryComponent from './notifications/init'

export default function notificationFactory (ngComponent) {
  ngComponent.factory('AppPush', AppPush)
  InitPushFactoryComponent(ngComponent)

  function AppPush(Auth, User, $q, ENV, $ionicPush, $ionicPlatform, Utils, InitPushFactory) {
    let Model = {
      init: InitPushFactory
    }

    return Model
  }
}
