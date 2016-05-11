export default {
  username: {
    inputType: 'text',
    placeholder: 'vendedor5000',
    required: true
  },
  email: {
    inputType: 'email',
    type: 'email',
    pattern: {
      rule: /\w+@\w+\.\w+/,
      message: 'Invalid email format'
    },
    placeholder: 'juan@martinez.com',
    type: 'email',
    required: true
  },
  password: {
    inputType: 'password',
    placeholder: 'Clave',
    minlength: 8,
    required: true
  }
}
