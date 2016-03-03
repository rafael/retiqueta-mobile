import { extractErrorByField, validationFactory, baseErrorObj } from '../../libs/merge_validations'

const baseErrorsObject = {
  username: Object.assign({}, baseErrorObj),
  password: Object.assign({}, baseErrorObj)
}

export default function loginCtrlFactory (ngComponent) {
  ngComponent.controller('loginCtrl', loginCtrl)

  function loginCtrl ($scope, $state, FormForConfiguration, Auth, Utils, $translate, $q) {
    var _ = this

    FormForConfiguration.disableAutoLabels()
    _.user = {}
    _.errors = baseErrorsObject
    _.sendingInfo = false
    _.formController = {}
    _.validationRules = {
      username: {
        inputType: 'text',
        placeholder: 'Username or email',
        required: true,
        custom: validationFactory('username', $q).bind(_)
      },
      password: {
        inputType: 'password',
        placeholder: 'Password',
        minlength: 8,
        required: true,
        custom: validationFactory('password', $q).bind(_)
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
        _.errors = extractErrorByField(error, user, Object.keys(_.errors))
        _.formController.validateForm()
      })
      .finally(() => {
        _.sendingInfo = false
      })
    }
  }
}
