export default {
  username: {
    inputType: 'text',
    placeholder: 'vendedor5000',
    required: true
  },
  email: {
    inputType: 'text',
    type: 'email',
    pattern: /\w+@\w+\.\w+/,
    placeholder: 'juan@martinez.com',
    required: true
  },
  password: {
    inputType: 'password',
    minlength: 8,
    required: true
  }
};
