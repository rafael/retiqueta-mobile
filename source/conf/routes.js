import permission from 'angular-permission'

angular.module('App.routes', ['ui.router', 'permission'])

let routes = angular.module('App.routes')

const ResolveUser = {
  currentUser: function(Auth) {
    return Auth.getCurrentUser()
  }
}

const ResolveMerge = (base, extend) => {
  return Object.assign({}, base, extend)
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
  // .state('update-token', {
  //   url: '/update-token/:token/:userID',
  //   controller: 'updateTokenCtrl'
  // })
  .state('users', {
    abstract: true,
    url: '/users',
    templateUrl: 'user/index.html',
    controller: 'UserTabsCtrl as ctrl',
    data: {
      permissions: {
        only: ['client'],
        redirectTo: 'auth.login'
      }
    },
    resolve: ResolveMerge(ResolveUser, {
      deviceToken: function ($ionicPush) {
        return $ionicPush.register()
      }
    })
  })
  .state('users.dashboard', {
    url: '/dashboard',
    views: {
      'dashboard-tab': {
        templateUrl: 'dashboard/index.html',
        controller: 'dashboardCtrl as dashboard'
      }
    }
  })
  .state('users.me', {
    url: '/me',
    views: {
      'profile-tab': {
        templateUrl: 'wardrobe/index.html',
        controller: 'wardrobeCtrl as wardrobe'
      }
    },
    resolve: {
      user: function(currentUser) {
        return currentUser
      }
    }
  })
  .state('users.settings', {
    url: '/settings',
    views: {
      'profile-tab': {
        templateUrl: 'settings/index.html',
        controller: 'settingsCtrl as settings'
      }
    }
  })
  .state('users.edit', {
    url: '/edit',
    views: {
      'profile-tab': {
        templateUrl: 'profile/form.html',
        controller: 'profileEditCtrl as profile'
      }
    },
    resolve: {
      identificationTypes: function (MercadopagoFactory, $q) {
        let defered = $q.defer()
        MercadopagoFactory.getIdentificationTypes((status, result) => {
          if (status === 200) {
            let options = result.map((value) => {
              return { value: value.id, label: value.name }
            })
            defered.resolve(options)
          } else {
            defered.reject(result)
          }
        })
        return defered.promise
      }
    }
  })
  .state('users.favorites', {
    url: '/favorites',
    views: {
      'profile-tab': {
        templateUrl: 'favorites/template.html',
        controller: 'favoritesCtrl as ctrl'
      }
    },
  })
  .state('users.orders', {
    url: '/orders',
    views: {
      'profile-tab': {
        templateUrl: 'orders/list/template.html',
        controller: 'ordersCtrl as ctrl'
      }
    },
  })
  .state('users.ordersChat', {
    url: '/orders/{id}?type',
    views: {
      'order-detail-tab': {
        templateUrl: 'orders/chat/template.html',
        controller: 'orderChatCtrl as ctrl'
      }
    },
    params: { order: null }
  })
  .state('users.ordersDetail', {
    url: '/orders/{id}/detail',
    views: {
      'order-detail-tab': {
        templateUrl: 'orders/detail/template.html',
        controller: 'orderCtrl as ctrl'
      }
    },
  })
  .state('users.sales', {
    url: '/sales',
    views: {
      'profile-tab': {
        templateUrl: 'sales/template.html',
        controller: 'salesCtrl as ctrl'
      }
    },
  })
  .state('users.balance', {
    url: '/balance',
    views: {
      'profile-tab': {
        templateUrl: 'balance/template.html',
        controller: 'balanceCtrl as ctrl'
      }
    },
  })
  .state('users.faq', {
    url: '/faq',
    views: {
      'profile-tab': {
        templateUrl: 'faq/template.html',
        controller: 'faqCtrl as ctrl'
      }
    },
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
  .state('users.profileFollowers', {
    url: '/followers/{userID}',
    views: {
      'profile-tab': {
        templateUrl: 'fellowship/template.html',
        controller: 'fellowshipCtrl as ctrl'
      }
    },
    resolve: {
      user: function (User, $stateParams, currentUser) {
        return ($stateParams.userID !== '') ? User.get($stateParams.userID) : currentUser
      },
      geter: function (User) {
        return User.getFollowers
      },
      viewTitle: function () {
        return 'USER_FRIENDSHIP_FOLLOWERS'
      }
    }
  })
  .state('users.profileFollowing', {
    url: '/following/{userID}',
    views: {
      'profile-tab': {
        templateUrl: 'fellowship/template.html',
        controller: 'fellowshipCtrl as ctrl'
      }
    },
    resolve: {
      user: function (User, $stateParams, currentUser) {
        return ($stateParams.userID !== '') ? User.get($stateParams.userID) : currentUser
      },
      geter: function (User) {
        return User.getFollowing
      },
      viewTitle: function () {
        return 'USER_FRIENDSHIP_FOLLOWING'
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
  .state('users.checkout', {
    url: '/products/{productID}/checkout',
    views: {
      'productDetail-tab': {
        templateUrl: 'checkout/create/template.html',
        controller: 'productCheckout as ctrl'
      }
    }
  })
  .state('users.productDetails', {
    url: '/products/{productID}?onComment',
    views: {
      'productDetail-tab': {
        templateUrl: 'products/details/index.html',
        controller: 'productDetail as detail'
      }
    }
  })
  .state('users.productDetails.edit', {
      url: '/edit',
      views: {
        'productDetail-tab@users': {
          templateUrl: 'products/edit/index.html',
          controller: 'productEditCtrl as edit'
        }
      },
      resolve: ResolveUser
  })
  .state('users.productDetails.edit.select_category', {
    url: '/edit_select_category',
    views: {
      'productDetail-tab@users': {
        templateUrl: 'products/edit/select_category.html',
        controller: 'productSelectEditCategoryCtrl as psecCtrl'
      }
    }
  })
  .state('users.productDetails.checkout', {
    url: '/checkout',
    views: {
      'productDetail-tab@users': {
        templateUrl: 'checkout/create/template.html',
        controller: 'productCheckout as ctrl'
      }
    }
  })
  .state('users.activities', {
    abstract: true,
    url: '/activities',
    views: {
      'activities-tab': {
        templateUrl: 'activities/template.html'
      }
    }
  })
  .state('users.activities.orders', {
    url: '/orders',
    views: {
      'orders-tab': {
        templateUrl: 'orders/list/template.html',
        controller: 'ordersCtrl as ctrl'
      }
    }
  })
  .state('users.activities.sales', {
    url: '/sales',
    views: {
      'sales-tab': {
        templateUrl: 'sales/template.html',
        controller: 'salesCtrl as ctrl'
      }
    }
  })
  .state('productsNew', {
    url: '/products/new',
    templateUrl: 'products/create/index.html',
    controller: 'productCreateCtrl as create',
    resolve: ResolveUser
  })
  .state('productsNewSelectCategory', {
    url: '/product/new/select-category',
    templateUrl: 'products/create/select_category.html',
    controller: 'SelectCategoryCtrl as ctrl'
  })


  $urlRouterProvider.otherwise('/')
})

export default routes
