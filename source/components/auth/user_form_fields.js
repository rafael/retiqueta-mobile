export default {
  email: {
    inputType: 'email',
    type: 'email',
    pattern: /\w+@\w+\.\w+/,
    placeholder: 'juan@martinez.com',
    required: true
  },
  password: {
    inputType: 'password',
    placeholder: 'Clave',
    // minlength: 8,
    required: true
  }
}
