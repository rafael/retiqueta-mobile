import permission from 'angular-permission'

angular.module('App.routes', ['ui.router', 'permission'])

let routes = angular.module('App.routes')

routes.run(function (Permission, Auth) {
  Permission
  .defineRole('anonymous', function () {
    return Auth.isAnonymous()
  })
  .defineRole('client', function () {
    return Auth.isClient()
  })
})

routes.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    controller: 'homeCtrl as home',
    templateUrl: 'home/home.html',
    data: {
      permissions: {
        only: ['anonymous'],
        redirectTo: 'users.dashboard'
      }
    }
  })
  .state('auth', {
    url: '/auth',
    abstract: true,
    templateUrl: 'auth/index.html'
  })
  .state('auth.login', {
    url: '/login',
    views: {
      'login-tab': {
        controller: 'loginCtrl as login',
        templateUrl: 'auth/login.html',
      }
    },
    data: {
      permissions: {
        only: ['anonymous']
      }
    }
  })
  .state('auth.signup', {
    url: '/signup',
    views: {
      'signup-tab': {
        controller: 'signupCtrl as signup',
        templateUrl: 'auth/signup.html',

      }
    },
    data: {
      permissions: {
        only: ['anonymous']
      }
    }
  })
  .state('logout', {
    url: '/logout',
    controller: 'logoutCtrl',
    data: {
      permissions: {
        only: ['client']
      }
    }
  })

  .state('update-token', {
    url: '/update-token',
    controller: 'updateTokenCtrl'
  })
  .state('users', {
    abstract: true,
    url: '/users',
    templateUrl: 'user/index.html',
    data: {
      permissions: {
        only: ['client'],
        redirectTo: 'auth.login'
      }
    },
    resolve: {
        currentUser: function (Auth) {
          return Auth.getCurrentUser()
        },
        deviceToken: function ($ionicPush) {
          return $ionicPush.register()
        }
      },
  })
  .state('users.dashboard', {
    url: '/dashboard',
    views: {
      'dashboard-tab': {
        templateUrl: 'products/dashboard/index.html',
        controller: 'dashboardCtrl as dash'
      }
    }
  })
  .state('users.me', {
    url: '/me',
    views: {
      'me-tab': {
        templateUrl: 'wardrobe/index.html',
        controller: 'wardrobeCtrl as wardrobe'
      }
    },
    resolve: {
      user: function (currentUser) {
        return currentUser
      }
    }
  })
  .state('users.settings', {
    url: '/settings',
    views: {
      'me-tab': {
        templateUrl: 'settings/index.html',
        controller: 'settingsCtrl as settings'
      }
    }
  })
  .state('users.edit', {
    url: '/edit',
    views: {
      'me-tab': {
        templateUrl: 'profile/form.html',
        controller: 'profileEditCtrl as profile'
      }
    }
  })
  .state('users.profile', {
    url: '/profile/{userID}',
    views: {
      'profile-tab': {
        templateUrl: 'wardrobe/index.html',
        controller: 'wardrobeCtrl as wardrobe'
      }
    },
    resolve: {
      user: function (User, $stateParams, currentUser) {
        return ($stateParams.userID !== '') ? User.get($stateParams.userID) : currentUser
      }
    }
  })
  .state('users.productsNew', {
    url: '/products/new',
    views: {
      'newproduct-tab': {
        templateUrl: 'products/create/index.html',
        controller: 'productCreateCtrl as create'
      }
    }
  })
  .state('users.productsSearch', {
    url: '/search/products/:word?',
    views: {
      'search-tab': {
        templateUrl: 'search/index.html',
        controller: 'SearchProductCtrl as search'
      }
    }
  })
  .state('productDetails', {
    url: '/products/{productID}',
    templateUrl: 'products/details/index.html',
    controller: 'productDetail as detail',
    resolve: {
      ProductData: function (Product, $stateParams) {
        return Product.get($stateParams.productID,  {
          include: 'user,product_pictures'
        })
      }
    }
  })

  $urlRouterProvider.otherwise('/')
})

export default routes
