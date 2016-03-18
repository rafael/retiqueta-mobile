import uuid from 'node-uuid'
export default function saveTokenOnApi (Auth, User, $q, ENV) {
  
  if (typeof device === 'undefined') {
    var device = {
      uuid: uuid.v4(),
      platform: 'browser'
    }
  }  

  return function(token) {
    if (ENV.isDevelopment()) {
      console.info('Saving token on retiqeuta API')
    }
    Auth.getUser()
    .then(current_user => {
      return User.createToken(current_user.id, {
        environment: ENV.type,
        token: token,
        device_id: device.uuid,
        platform: device.platform.toLowerCase()
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
