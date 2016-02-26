import permission from 'angular-permission'

angular.module('App.routes', ['ui.router', 'permission'])

let routes = angular.module('App.routes')

const ResolveUser = {
  currentUser: function(Auth) {
    return Auth.getCurrentUser()
  }
}


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
    // controller: 'homeCtrl as home',
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
    templateUrl: 'auth/index.html',
    data: {
      permissions: {
        only: ['anonymous'],
        redirectTo: 'users.dashboard'
      }
    }
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
    },
    resolve: ResolveUser
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
      currentUser: function (Auth) {
        return Auth.getCurrentUser()
      },
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
    },
    resolve: ResolveUser
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
      currentUser: function (Auth) {
        return Auth.getCurrentUser()
      },
      user: function (User, $stateParams, currentUser) {
        return ($stateParams.userID !== '') ? User.get($stateParams.userID) : currentUser
      }
    }
  })
  .state('productsNew', {
    url: '/products/new',
    templateUrl: 'products/create/index.html',
    controller: 'productCreateCtrl as create',
  })
  .state('productsNewSelectCategory', {
    url: '/product/new/select-category',
    templateUrl: 'products/create/select_category.html',
    controller: 'SelectCategoryCtrl as ctrl'
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
  .state('users.productDetails', {
    url: '/products/{productID}',
    views: {
      'productDetail-tab': {
        templateUrl: 'products/details/index.html',
        controller: 'productDetail as detail',
      }
    },
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
