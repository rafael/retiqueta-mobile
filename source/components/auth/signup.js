import { extractErrorByField, validationFactory, baseErrorObj } from '../../libs/merge_validations'
import userForm from './user_form_fields'

const baseErrorsObject = {
  // username: Object.assign({}, baseErrorObj),
  password: Object.assign({}, baseErrorObj),
  email: Object.assign({}, baseErrorObj)
}

export default function signupCtrlFactory (ngComponent) {
  ngComponent.controller('signupCtrl', signupCtrl)

  function signupCtrl ($scope, $state, User, FormForConfiguration, Auth, Utils, $translate, $q, FacebookAuth, ENV) {
    FormForConfiguration.disableAutoLabels()
    let _ = this
    let notFirstValidation = false
    _.user = {}
    _.hasErrors = false
    _.errors = baseErrorsObject
    _.formController = {}
    _.sendingInfo = false
    _.validationRules = userForm
    // _.validationRules.username.custom = validationFactory('username', $q).bind(_)
    _.validationRules.email.custom = validationFactory('email', $q).bind(_)
    _.validationRules.password.acustom = validationFactory('password', $q).bind(_)

    _.submit = submit
    _.validateRequired = () => {
      notFirstValidation = true
      $scope.$evalAsync(() => {
        _.formController.validateForm(true).then(afterValidateForm).catch(afterValidateForm)
      })
    }


    function redirectToDashboard () {
      $state.go('users.dashboard')
    }

    function submit (user) {
      _.sendingInfo = true
      user.email = user.email.toLowerCase()
      // user.username = user.username.toLowerCase()

      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('signup request');
      }
      User.create(user)
        .then(result => {
          return Auth.login(user)
        })
        .then(redirectToDashboard)
        .catch(error => {
          if (ENV.isProduction()) {
            facebookConnectPlugin.logEvent('signup request error')
          }
          _.errors = extractErrorByField(error.data, user, Object.keys(_.errors), ['usuario', 'correo', 'password'])
          _.formController.validateForm(true).then(afterValidateForm).catch(afterValidateForm)
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
                .reduce((acc, value) => {
                  return acc || typeof errors[value] !== 'undefined'
                }, false)
      } else {
        return false
      }
    }

    function validateRequired () {
      return _.hasErrors = isNotThere(_.user, 'password') ||
                           isNotThere(_.user, 'email')
    //isNotThere(_.user, 'username') ||
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
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('signup load')
      }
    })
  }
}
