import profileForm from './profile_form_fields'

const defaultAttibutes = {
  bank_name: '',
  account_number: '',
  document_type: '',
  document_id: '',
  account_type: '',
}

export default function profileEditFactory (ngComponent) {
  ngComponent.controller('profileEditCtrl', profileEditCtrl)

  function profileEditCtrl (identificationTypes, currentUser, User, FormForConfiguration, Utils, $translate, Auth, $state, $ionicHistory) {
    FormForConfiguration.disableAutoLabels()
    
    var _ = this
    _.user = currentUser
    _.sendingInfo = false
    _.schema = profileForm
    _.submit = saveUser
    _.identificationTypes = identificationTypes

    function saveUser (attrs) {
      if (attrs.bank_account !== null) {
        attrs.bank_account.owner_name = _.user.attributes.first_name
      }
      _.sendingInfo = true
      User.update(_.user.id, attrs)
      .then(result => {
        // Utils.swalSuccess($translate.instant('UPDATE_PROFILE_SUCCESS'))
        Auth.user.attributes = Object.assign({}, attrs)
        return $ionicHistory.clearCache()
      })
      .then(() => {
        $state.go('users.me', {}, { reload: true, inherit: false, notify: true })
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
