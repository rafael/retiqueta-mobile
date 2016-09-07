export default function DeepLinksFactory (ngComponent) {
  ngComponent.run(DeepLinksConf)

  function DeepLinksConf ($state, $ionicPlatform, $timeout, Utils) {
    const Routes = {
      '/products/:productID': {
        target: 'users.productDetails',
        parent: 'users.dashboard'
      },
      '/users/:userID': {
        target: 'users.profile',
        parent: 'users.dashboard'
      }
    }

    const onMatch = (match) => {
      Utils.logger.info('Deep link match with:')
      Utils.logger.log(match)
      $timeout(function() {
        $state.go(match.$route.parent, match.$args)
        $timeout(function() {
          $state.go(match.$route.target, match.$args)
        }, 400)
      }, 100)
    } 

    const onNotMatch = (noMatch) => {
      Utils.logger.info('Deep link didn\'t match with:')
      Utils.logger.log(noMatch)
      $state.go('users.dashboard')
    }

    const RoutesMatcher = () => {
      IonicDeeplink.route(Routes, onMatch, onNotMatch) 
    }

    $ionicPlatform.ready(RoutesMatcher)
  }
}
