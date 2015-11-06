
export default function(ngComponent) {
  ngComponent.factory('User', UserFactory)

  function UserFactory(ENV, $http, $q) {

    let Model = {}
    
    Object.assign(
      Model,
      require('./user/get')(ENV, $http, $q),
      require('./user/create')(ENV, $http, $q),
      require('./user/update')(ENV, $http, $q),
      require('./user/upload_pic')(ENV, $http, $q)
    )

    if(ENV.type === 'development') {
      window.User = Model;
    }

    return Model
  }
}
