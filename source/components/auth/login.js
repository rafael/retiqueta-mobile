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
    _.hasErrors = false
    _.formController = {}
    _.validationRules = {
      username: {
        inputType: 'email',
        placeholder: 'Escriba su correo',
        required: true,
        type: 'email',
        pattern: {
          rule: /\w+@\w+\.\w+/,
          message: 'Invalid email format'
        },
        custom: validationFactory('username', $q).bind(_)
      },
      password: {
        inputType: 'password',
        placeholder: 'Clave',
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
        // Utils.swalSuccess($translate.instant('WELCOME_MESSAGE'))
        $state.go('users.dashboard')
      })
      .catch(error => {
        _.errors = extractErrorByField(error, user, Object.keys(_.errors))
        $scope.$evalAsync(() => {
          _.formController.validateForm().then(afterValidateForm).catch(afterValidateForm)
        })
      })
      .finally(() => {
        _.sendingInfo = false
      })
    }

    function afterValidateForm (errors, values) {
      _.hasErrors = Object.keys(errors[1]).length > 0 
    }
    /*
    $scope.$watchCollection(function() {
      return _.user
    }, function (value) {
      _.formController.validateForm().then(afterValidateForm).catch(afterValidateForm)
    })
    */
  }
}
