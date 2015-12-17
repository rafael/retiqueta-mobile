export default function(ngComponent) {
  ngComponent.factory('User', UserFactory)

  function UserFactory(ENV, $http, $q) {
    let dependecies = [ENV, $http, $q]
    let Model = {}

    Object.assign(
      Model,
      require('./user/get')(...dependecies),
      require('./user/create')(...dependecies),
      require('./user/update')(...dependecies),
      require('./user/upload_pic')(...dependecies),
      require('./user/create_token')(...dependecies)
     )

    if(ENV.type === 'development') {
      window.User = Model;
    }

    return Model
  }
}
