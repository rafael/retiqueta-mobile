import uuid from 'node-uuid'
export default function saveTokenOnApi (Auth, User, $q, ENV) {
  return function(token) {
    if (ENV.isDevelopment()) {
      console.info('Saving token on retiqeuta API')
    }
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
      if (ENV.isDevelopment()) {
        console.info('The User device token has been updated')
        console.log(result)
      }
    })
    .catch((e) => {
      console.log(e)
    })
  }
}
