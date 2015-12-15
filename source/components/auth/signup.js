import userForm from './user_form_fields'

export default function signupCtrlFactory (ngComponent) {
  ngComponent.controller('signupCtrl', signupCtrl)

  function signupCtrl ($state, User, FormForConfiguration, Auth, Utils, $translate) {
    var _ = this
    FormForConfiguration.enableAutoLabels()
    _.user = {}
    _.sendingInfo = false
    _.validationRules = userForm

    _.submit = (user) => {
      _.sendingInfo = true
      user.email = user.email.toLowerCase()
      user.username = user.username.toLowerCase()
      User.create(user)
        .then(result => {
          return Auth.login(user)
        })
        .then(user => {
          Utils.swalSuccess($translate.instant('SIGNUP_SUCCESS'))
          $state.go('users.dashboard')
        })
        .catch(error => {
          Utils.swalError(error)
        })
        .finally(() => {
          _.sendingInfo = false
        })
    }
  }
}
