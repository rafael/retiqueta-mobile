export default function FacebookAuthFactory (ngComponent) {
  ngComponent.factory('FacebookAuth', FacebookAuth)

  function FacebookAuth (ENV, $q, $http) {
    var Model = Object.assign({},
      require('./facebook_auth/sdk')(...arguments),
      require('./facebook_auth/create')(...arguments),
      require('./facebook_auth/login_with')(...arguments)
    )

    return Model
  }
}
