export default function(ngComponent) {
  ngComponent.controller('loginCtrl', loginCtrl)

  function loginCtrl($state, FormForConfiguration, Auth, Utils, $translate, $ionicPush) {
    var _ =  this

    FormForConfiguration.enableAutoLabels();
    _.user = {};
    _.sendingInfo = false;

    _.validationRules = {
      username: {
        inputType: 'text',
        placeholder: 'vendedor5000',
        required: true
      },
      password: {
        inputType: 'password',
        minlength: 8,
        required: true
      }
    };

    _.submit = function(user) {
      _.sendingInfo = true;
      user.username = user.username.toLowerCase();
      Auth.login(user)
        .then(function(token) {
          // Set user ionic user
          var ionicUser = Ionic.User.current();

          if (!ionicUser.id) {
            ionicUser.id = token.user_id;
          }

          var pushNotificationCallback = function(pushToken) {
            console.log('Registered token:', pushToken.token);
            ionicUser.addPushToken(pushToken);
            ionicUser.save();
          }

          $ionicPush.register(pushNotificationCallback);

          Utils.swalSuccess($translate.instant('WELCOME_MESSAGE'));
          $state.go('users.dashboard');
          _.sendingInfo = false;
        })
        .catch(function(error) {
          _.sendingInfo = false;
          console.log(error)
          Utils.swalError(error);
        });
    };
  }
}
