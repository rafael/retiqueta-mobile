import permission from 'angular-permission'

angular.module('App.routes', ['ui.router', 'permission'])

let routes = angular.module('App.routes')

routes.run(function (Permission, Auth) {
  Permission
    .defineRole('anonymous', function () {
      return Auth.isAnonymous();
    })
    .defineRole('client', function() {
      return Auth.isClient();
    });
})

routes.config(function($stateProvider, $urlRouterProvider) {
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
      },
    })
    .state('login', {
      url: '/login',
      controller: 'loginCtrl as login',
      templateUrl: 'auth/login.html',
      data: {
        permissions: {
          only: ['anonymous']
        }
      },
    })
    .state('logout', {
      url: '/logout',
      controller: 'logoutCtrl',
      data: {
        permissions: {
          only: ['client']
        }
      },
    })
    .state('signup', {
      url: '/signup',
      controller: 'signupCtrl as signup',
      templateUrl: 'auth/signup.html',
      data: {
        permissions: {
          only: ['anonymous']
        }
      },
    })
    .state('update-token', {
      url: '/update-token',
      controller: 'updateTokenCtrl',
    })
    .state('users', {
      abstract: true,
      url: '/users',
      templateUrl: 'user/index.html',
      data: {
        permissions: {
          only: ['client'],
          redirectTo: 'login',
        },
      },
      resolve: {
        currentUser: function(Auth) {
          return Auth.getCurrentUser()
        },
      },
    })
    .state('users.dashboard', {
      url: '/dashboard',
      views: {
        'dashboard-tab': {
          templateUrl: 'products/dashboard/index.html',
          controller: 'dashboardCtrl as dash',
        }
      }
    })
    .state('users.profile', {
      url: '/profile',
      views: {
        'profile-tab': {
          templateUrl: 'profile/profile.html',
          controller: 'profileCtrl as profile',
        }
      }
    })
    .state('users.wardrobe', {
      url: '/wardrobe',
      templateUrl: 'products/wardrobe/index.html',
      controller: 'wardrobeCtrl as wardrobe',
    })
    .state('users.wardrobeNew', {
      url: '/wardrobe/new',
      views: {
        'newproduct-tab': {
          templateUrl: 'products/create/index.html',
          controller: 'productCreateCtrl as create',
        } 
      }
    })
    .state('users.productsSearch', {
      url: '/search/product',
      views: {
        'search-tab': {
          templateUrl: 'search/index.html',
          controller: 'SearchProductCtrl as search'
        }
      }
    })

  $urlRouterProvider.otherwise("/")
})

export default routes
