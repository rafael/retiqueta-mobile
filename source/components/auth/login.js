export default function(ngComponent) {
  ngComponent.controller('loginCtrl', loginCtrl)

  function loginCtrl($state, FormForConfiguration, Auth, Utils, $translate) {
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
