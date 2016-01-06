export default function loginCtrlFactory (ngComponent) {
  ngComponent.controller('loginCtrl', loginCtrl)

  function loginCtrl ($state, FormForConfiguration, Auth, Utils, $translate) {
    var _ = this

    FormForConfiguration.enableAutoLabels()
    _.user = {}
    _.sendingInfo = false

    _.validationRules = {
      username: {
        inputType: 'text',
        placeholder: 'Username or email',
        required: true
      },
      password: {
        inputType: 'password',
        placeholder: 'Password',
        minlength: 8,
        required: true
      }
    }

    _.submit = (user) => {
      _.sendingInfo = true
      user.username = user.username.toLowerCase()
      Auth.login(user)
        .then(token => {
          Utils.swalSuccess($translate.instant('WELCOME_MESSAGE'))
          $state.go('users.dashboard')
        })
        .catch(error => {
          console.log(error)
          Utils.swalError(error)
        })
        .finally(() => {
          _.sendingInfo = false
        })
    }
  }
}
