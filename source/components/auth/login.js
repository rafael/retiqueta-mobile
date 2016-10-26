import { extractErrorByField, validationFactory, baseErrorObj } from '../../libs/merge_validations'

const baseErrorsObject = {
  email: Object.assign({}, baseErrorObj),
  password: Object.assign({}, baseErrorObj)
}

export default function loginCtrlFactory (ngComponent) {
  ngComponent.controller('loginCtrl', loginCtrl)

  function loginCtrl ($scope, $state, FormForConfiguration, Auth, Utils, $translate, $q, $ionicAnalytics) {
    FormForConfiguration.disableAutoLabels()
    let _ = this
    let notFirstValidation = false
    _.user = {}
    _.errors = baseErrorsObject
    _.sendingInfo = false
    _.hasErrors = false
    _.formController = {}
    _.validationRules = {
      email: {
        inputType: 'email',
        placeholder: 'Escriba su correo',
        required: true,
        type: 'email',
        pattern: {
          rule: /\w+@\w+\.\w+/,
          message: 'Invalid email format'
        },
        custom: validationFactory('email', $q).bind(_)
      },
      password: {
        inputType: 'password',
        placeholder: 'Clave',
        // minlength: 8,
        required: true,
        custom: validationFactory('password', $q).bind(_)
      }
    }

    _.submit = submit
    _.validateRequired = () => {
      notFirstValidation = true
      $scope.$evalAsync(() => {
        _.formController.validateForm(true).then(afterValidateForm).catch(afterValidateForm)
      })
    }

    function submit (user) {
      _.sendingInfo = true
      user.email = user.email.toLowerCase()
      facebookConnectPlugin.logEvent('login.request')
      Auth.login(user)
      .then(token => {
        // Utils.swalSuccess($translate.instant('WELCOME_MESSAGE'))
        $state.go('users.dashboard')
      })
      .catch(error => {
        facebookConnectPlugin.logEvent('login.request.error')
        _.errors = extractErrorByField(error, user, Object.keys(_.errors), ['usuario', 'contraseña'])
        $scope.$evalAsync(() => {
          _.formController.validateForm(true).then(afterValidateForm).catch(afterValidateForm)
        })
      })
      .finally(() => {
        _.sendingInfo = false
      })
    }

    function afterValidateForm (errors, values) {
      _.hasErrors = formHasErrors(errors[1]) || (validateRequired() && notFirstValidation)
      notFirstValidation = true
    }

    function formHasErrors (errors) {
      if (Object.keys(errors).length > 0) {
        return Object.keys(errors)
        .reduce((acc, value) => { typeof errors[value] === 'undefined' })
      } else {
        return false
      }
    }

    function validateRequired () {
      return isNotThere(_.user, 'email') ||
        isNotThere(_.user, 'password')
    }

    function isNotThere (obj, key) {
      return !obj.hasOwnProperty(key) ||
        obj[key] === null ||
          typeof obj[key] === 'undefined' ||
            obj[key] === ''
    }

    $scope.$watchCollection(function() {
      return _.user
    }, function (value) {
      $scope.$evalAsync(() => {
        _.formController.validateForm(true).then(afterValidateForm).catch(afterValidateForm)
      })
    })

    $scope.$on('$ionicView.enter', () => {
      facebookConnectPlugin.logEvent('login.load')
    })
  }
}
