export default function notificationFactory (ngComponent) {
  ngComponent.factory('AppPush', AppPush)

  function AppPush($ionicPush, ENV, Auth, User, $q) {
    var development = ENV.type === 'development'
  
    function processNotification (notification) {
      console.log(notification)
    } 

    function processRegistration (data) {
      var deferred = $q.defer()
      // Here we put a logic like this to save in the our backend the given token
      // 
      // somethin like this
      //
      // Auth.getUser()
      // .then(user => {
      //   // this method is in the User service, this path the user and add the token
      //   return User.updateDeviceToken(user.id, data.token)
      //  })
      // .then(savedtoken => {
      //    deferred.resolve(savedtoken)
      //  })
      //  .catch(error => {
      //    deferred.reject(error)
      //  })

      return deferred.promise

    }

    function init() {
      $ionicPush.init({
        "debug": development,
        "onNotification": processNotification,
        "onRegister": processRegistration,
      });
    }

    function register() {
      $ionicPush.register()
    }

    return {
      init: init,
      register: register,
    }
  }
} 
