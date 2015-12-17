import InitPushFactory from './notifications/init'

export default function notificationFactory (ngComponent) {
  ngComponent.factory('AppPush', AppPush)

  function AppPush($ionicPush, ENV, Auth, User, $q) {
    let dependencies = [$ionicPush, Auth, User, $q, ENV]

    let Model = {
      init: InitPushFactory(...dependencies)
    }

    return Model
  }
}
