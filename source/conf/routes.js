import permission from 'angular-permission'

let routes = angular.module('App.routes', ['ui.router', 'permission'])

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
          only: ['anonymous']
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
  $urlRouterProvider.otherwise("/")
})

export default routes
