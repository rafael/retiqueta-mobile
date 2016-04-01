import { extractErrorByField, validationFactory, baseErrorObj } from '../../libs/merge_validations'
import userForm from './user_form_fields'

const baseErrorsObject = {
  username: Object.assign({}, baseErrorObj),
  password: Object.assign({}, baseErrorObj),
  email: Object.assign({}, baseErrorObj)
}

export default function signupCtrlFactory (ngComponent) {
  ngComponent.controller('signupCtrl', signupCtrl)

  function signupCtrl ($state, User, FormForConfiguration, Auth, Utils, $translate, $q, FacebookAuth) {
    FormForConfiguration.disableAutoLabels()
    var _ = this
    _.user = {}
    _.errors = baseErrorsObject
    _.formController = {}
    _.sendingInfo = false
    _.validationRules = userForm
    _.validationRules.username.custom = validationFactory('username', $q).bind(_)
    _.validationRules.email.custom = validationFactory('email', $q).bind(_)
    _.validationRules.password.acustom = validationFactory('password', $q).bind(_)

    _.submit = submit

    function redirectToDashboard() {
      $state.go('users.dashboard')
    }

    function submit (user) {
      _.sendingInfo = true
      user.email = user.email.toLowerCase()
      user.username = user.username.toLowerCase()
      User.create(user)
        .then(result => {
          return Auth.login(user)
        })
        .then(redirectToDashboard)
        .catch(error => {
          _.errors = extractErrorByField(error.data, user, Object.keys(_.errors))
          _.formController.validateForm()
        })
        .finally(() => {
          _.sendingInfo = false
        })
    }
  }
}


