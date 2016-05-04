import profileForm from './profile_form_fields'

export default function profileEditFactory (ngComponent) {
  ngComponent.controller('profileEditCtrl', profileEditCtrl)

  function profileEditCtrl (currentUser, User, FormForConfiguration, Utils, $translate, Auth, $state) {
    var _ = this

    var defaultAttibutes = {
      first_name: '',
      last_name: '',
      website: '',
      bio: ''
    }
    _.user = currentUser

    FormForConfiguration.enableAutoLabels()

    _.sendingInfo = false

    _.schema = profileForm

    _.submit = (attrs) => {
      _.sendingInfo = true
      User.update(_.user.id, attrs)
      .then(result => {
        Utils.swalSuccess($translate.instant('UPDATE_PROFILE_SUCCESS'))
        Auth.user.attributes = Object.assign({}, attrs)
        $state.go($state.current, {}, { reload: true, inherit: false, notify: true })
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
