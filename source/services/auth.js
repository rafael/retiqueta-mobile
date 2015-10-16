export default function(ngComponent) {

  ngComponent.service('Auth', AuthFactory)

  function AuthFactory($rootScope, ENV, User, $q, $http) {

    if(ENV.type === 'development') {
      window.Auth = this;
    }

    this.user = {};

    $rootScope.$on('session:start', () => {
      this.getUser();
    });

    $rootScope.$on('session:finish', () => {
      this.user = {};
    });

    // Login user
    this.login = (user) => {
      var deferred = $q.defer();
      $http.post(ENV.api.url + '/oauth/token.json', {
        grant_type: 'password',
        email: user.email.toLowerCase(),
        password: user.password
      })
      .success((data) => {
        this.loginToken(data);
        deferred.resolve(data);
      })
      .error((err) => {
        this.logout();
        $rootScope.$broadcast('session:finish')
        deferred.reject(err)
      });

      return deferred.promise
    };

    // Login token
    this.loginToken = (token) => {
      window.localStorage.setItem('token', JSON.stringify(token))
      $rootScope.$broadcast('session:start')
    };

    // Logout user
    this.logout = () => {
      window.localStorage.clear();
      $rootScope.$broadcast('session:finish');
    };

    // Is anonymous
    this.isAnonymous = () => {
      var deferred = $q.defer();
      if(!this.isLogin()) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
      return deferred.promise;
    };

    this.isClient = () => {
      var deferred = $q.defer();
      if(this.isLogin()) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
      return deferred.promise;
    };

    // Is login
    this.isLogin = () => {
      var token = window.localStorage.getItem('token');
      return (typeof token !== 'undefined' && token !== 'null' && token !== null);
    };

    // Get user data
    this.getUser = () => {
      var deferred = $q.defer();
      if(this.isLogin()) {
        User.get({id: 'me'}).$promise
          .then(function(user) {
            this.user = user;
            deferred.resolve(this.user);
          }.bind(this),
          function(error) {
            console.log(error);
            this.user = {};
            this.logout();
            deferred.reject(error);
          }.bind(this));
      } else {
        deferred.reject({data: 'your are not login'});
      }
      return deferred.promise;
    };

    // get current_user
    this.current_user = (force) => {
      force = (typeof force === 'undefined') ? false : force
      if(this.user.hasOwnProperty('_id') && !force) {
        return this.user
      } else {
        User.get({id: 'me'}, (user) => {
          return this.user = user
        })
      }
    };

    this.hasRole = (role) => {
      var deferred = $q.defer();
      if(this.current_user().hasOwnProperty('type') && this.current_user().type === role) {
        deferred.resolve()
      } else {
        deferred.reject()
      }
      return deferred.promise;
    };

    this.hasValue = (value) => {
      this.current_user()
      if(this.isLogin()) {
        return (typeof this.user[value] !== 'undefined' && this.user[value] !== 'null' && this.user[value] !== null)
      } else {
        return false
      }
    };

    this.getToken = () => {
      if(this.isLogin()) {
        return JSON.parse(window.localStorage.getItem('token'))
      }
    }
  }
}
