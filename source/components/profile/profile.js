export default function(ngComponent) {
  ngComponent.controller('profileCtrl', profileCtrl)

  function profileCtrl(currentUser, User, FormForConfiguration) {
    var _ = this    
    var defaultAttibutes = {
      first_name: '',
      last_name: '',
      website: '',
      bio: '',
    }
    _.user = currentUser
    
    _.userAttributes = Object.assign({}, defaultAttibutes, _.user.attributes)
    
    FormForConfiguration.enableAutoLabels();

    _.sendingInfo = false

    _.schema = {
      'first_name': {
        inputType: 'text',
        placeholder: 'Juan',
        required: true,
      },
      'last_name': {
        inputType: 'text',        
        placaeholder: 'Perez',
        required: true,
      },
      'website': {
        inputType: 'text',
        placeholder: 'http://yourwebsite.com',
        require: false,
      },
      'bio': {
        inputType: 'text',
        placeholder: 'Something about you',
        require: false,
        //multiline: true,
      },
    }
   
    _.submit = (attrs) => {
      _.sendingInfo = true
      console.log(attrs)
      User.update(_.user.id, attrs)
      .then(result => {
        console.info('success')
        console.log(result)
      })
      .catch(error => {
        console.info('error')
        console.log(error)
      })
      .finally(() => {
        _.sendingInfo = false
      })
    }

  }
}
