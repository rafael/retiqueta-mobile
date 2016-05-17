import uuid from 'node-uuid'
export default function saveTokenOnApi (Auth, User, $q, ENV, $ionicPush, $ionicPlatform, Utils) {
  return function(token) {
    Utils.logger.info('Saving token on retiqeuta API')
    Auth.getUser()
    .then(current_user => {
      return User.createToken(current_user.id, {
        environment: ENV.type,
        token: token,
        device_id: ionic.Platform.device().uuid,
        platform: ionic.Platform.platform()
      })
    })
    .then((result) => {
      Utils.logger.info('The User device token has been updated')
      Utils.logger.log(result)
    })
    .catch((e) => {
      Utils.logger.log(e)
    })
  }
}
