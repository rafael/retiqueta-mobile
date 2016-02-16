function registerForIonicUser(user_id, token) {
  return new Promise(function(resolve, reject) {
    Ionic.io()
    var ionicUser = Ionic.User.current()

    if (!ionicUser.id) {
      ionicUser.id = user_id
    }

    ionicUser.addPushToken(token)
    ionicUser.save()
    resolve(ionicUser)
  })
}

export default function RegisterToken (Auth, User, $q, ENV) {
  return function saveToken (token) {
    try {
      let deferred = $q.defer()
      var user = {}
      let device = ionic.Platform.device()
      let data = {
        token: token._token,
        device_id: device.uuid,
        environment: ENV.type,
        platform: ionic.Platform.platform()
      }

      if (ENV.isDevelopment()) {
        console.log("Token assigned for ionic Push")
        console.log(data)
      }

      Auth.getUser()
      .then(current_user => {
        user = current_user
        return registerForIonicUser(user.id, token)
      })
      .then(ionicUser => {
        return User.createToken(user.id, data)
      })
      .then((result) => {
        if (ENV.isDevelopment()) {
          console.info('The User device token has been updated')
          console.log(result)
        }
        deferred.resolve(result)
      })
      .catch(deferred.reject)

      return deferred.promise
    }
    catch (e){
      console.log(e)
    }
  }
}


