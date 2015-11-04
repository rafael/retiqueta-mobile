export default function(ngComponent) {
  ngComponent.controller('signupCtrl', signupCtrl)

  function signupCtrl($state, User, FormForConfiguration, Auth, Utils, $translate) {
    var _ = this
    FormForConfiguration.enableAutoLabels();
    _.user = {};
    _.sendingInfo = false;
    _.validationRules = {
      username: {
        inputType: 'text',
        placeholder: 'vendedor5000',
        required: true
      },
      email: {
        inputType: 'text',
        type: 'email',
        pattern: /\w+@\w+\.\w+/,
        placeholder: 'juan@martinez.com',
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
      user.email = user.email.toLowerCase();
      user.username = user.username.toLowerCase();
      User.create(user)
      .then((result) => {
          return Auth.login(user)
      })
      .then((user) => {
        Utils.swalSuccess($translate.instant('SIGNUP_SUCCESS'));
        $state.go('users.dashboard');
      })
      .catch((error) => {
        Utils.swalError(error);
      })
      .finally(() => {
        _.sendingInfo = false;
      });
    };
  }
}
