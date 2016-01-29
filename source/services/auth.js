export default function AuthFactory (ngComponent) {
  ngComponent.service('Auth', AuthFactory)

  function AuthFactory ($rootScope, ENV, User, $q, $http) {
    if (ENV.type === 'development') {
      window.Auth = this
    }

    this.user = {}
    this.updateTokenIntent = 0

    $rootScope.$on('session:start', () => {
      this.getUser()
    })

    $rootScope.$on('session:finish', () => {
      this.user = {}
    })

    // Login user
    this.login = (user) => {
      var deferred = $q.defer()
      $http({
        method: 'POST',
        url: ENV.api.url + '/v1/authenticate',
        data: {
          grant_type: 'password',
          client_id: 'ret-mobile-ios',
          login: user.username.toLowerCase(),
          password: user.password
        }
      })
      .success((result) => {
        this.loginToken(result)
        deferred.resolve(result)
      })
      .error((err) => {
        this.logout()
        $rootScope.$broadcast('session:finish')
        deferred.reject(err)
      })

      return deferred.promise
    }

    this.refreshToken = () => {
      let deferred = $q.defer()
      if (this.updateTokenIntent === 0) {
        this.updateTokenIntent += 1
        $http({
          method: 'POST',
          url: `${ENV.api.url}/v1/authenticate/token`,
          data: {
            refresh_token: this.getToken().refresh_token,
            client_id: 'ret-mobile-ios'
          }
        })
        .then((result) => {
          this.updateToken(result.data)
          deferred.resolve(result)
        })
        .catch((e) => {
          deferred.reject(e)
        })
      } else {
        this.logout()
        deferred.reject({ data: { code: 100, detail: "refresh token dont work", status: 400, title: "failed-validation" }})
      }
      return deferred.promise
    }

    // Login token
    this.loginToken = (token) => {
      this.updateToken(token)
      $rootScope.$broadcast('session:start')
    }

    // Logout user
    this.logout = () => {
      window.localStorage.clear()
      $rootScope.$broadcast('session:finish')
    }

    // Is anonymous
    this.isAnonymous = () => {
      var deferred = $q.defer()
      if (!this.isLogin()) {
        deferred.resolve()
      } else {
        deferred.reject()
      }
      return deferred.promise
    }

    this.isClient = () => {
      var deferred = $q.defer()
      if (this.isLogin()) {
        deferred.resolve()
      } else {
        deferred.reject()
      }
      return deferred.promise
    }

    // Is login
    this.isLogin = () => {
      var token = window.localStorage.getItem('token')
      return (typeof token !== 'undefined' && token !== 'null' && token !== null)
    }

    // Get user data
    this.getUser = () => {
      var deferred = $q.defer()
      if (this.isLogin()) {
        User.get(this.getToken().user_id)
        .then((result) => {
          this.user = result
          deferred.resolve(this.user)
        })
        .catch((error) => {
          this.user = {}
          this.logout()
          deferred.reject(error)
        })
      } else {
        deferred.reject({
          data: 'your are not login'
        })
      }
      return deferred.promise
    }

    // get current_user
    this.current_user = (force = false) => {
      if (this.user.hasOwnProperty('id') && !force) {
        return this.user
      }
    }

    this.getCurrentUser = () => {
      var deferred = $q.defer()
      if (typeof this.current_user() === 'undefined') {
        return this.getUser()
      } else {
        deferred.resolve(this.current_user())
        return deferred.promise
      }
    }

    this.hasRole = (role) => {
      var deferred = $q.defer()
      if (this.current_user().hasOwnProperty('type') && this.current_user().type === role) {
        deferred.resolve()
      } else {
        deferred.reject()
      }
      return deferred.promise
    }

    this.hasValue = (value) => {
      this.current_user()
      if (this.isLogin()) {
        return (typeof this.user[value] !== 'undefined' && this.user[value] !== 'null' && this.user[value] !== null)
      } else {
        return false
      }
    }

    this.updateToken = (newtoken) => {
      var oldtoken = this.getToken()
      newtoken = Object.assign({}, oldtoken, newtoken)
      return window.localStorage.setItem('token', JSON.stringify(newtoken))
    }

    this.getToken = () => {
      if (this.isLogin()) {
        return JSON.parse(window.localStorage.getItem('token'))
      } else {
        return {}
      }
    }
  }
}
