export default {
  'first_name': {
    required: true
  },
  'last_name': {
    required: true
  },
  'website': {
    require: false
  },
  'bio': {
    inputType: 'text',
    require: false
  },
  'bank_account': {
    'bank_name': {
      require: false
    },
    'document_type': {
      require: false,
      options: []
    },
    'document_id': {
      require: false
    },
    'account_type': {
      require: false,
      options: [
        { value: 'checking', label: 'Corriente' }, 
        { value: 'savings', label: 'Ahorro' }
      ]
    },
    'account_number': {
      require: false
    },
  }
}
