import profileForm from './profile_form_fields'

export default function profileEditFactory (ngComponent) {
  ngComponent.controller('profileEditCtrl', profileEditCtrl)

  function profileEditCtrl (currentUser, User, FormForConfiguration, Utils, $translate) {
    var _ = this

    var defaultAttibutes = {
      first_name: '',
      last_name: '',
      website: '',
      bio: ''
    }
    _.user = currentUser

    _.userAttributes = Object.assign({}, defaultAttibutes, _.user.attributes)

    FormForConfiguration.enableAutoLabels()

    _.sendingInfo = false

    _.schema = profileForm

    _.submit = (attrs) => {
      _.sendingInfo = true
      User.update(_.user.id, attrs)
        .then(result => {
          console.log('Profile save')
          console.log(result)
          Utils.swalSuccess($translate.instant('UPDATE_PROFILE_SUCCESS'))
        })
        .catch(error => {
          console.info('error')
          console.log(error)
          Utils.swalError(error)
        })
        .finally(() => {
          _.sendingInfo = false
        })
    }
  }
}
