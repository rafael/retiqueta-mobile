
let routes = angular.module('App.routes', ['ui.router'])

routes.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      controller: 'homeCtrl as home',
      templateUrl: "home/home.html"
    })
  $urlRouterProvider.otherwise("/")
})

export default routes
