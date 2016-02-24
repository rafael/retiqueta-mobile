export default function(ngComponent) {

  ngComponent.config(configIonic)
  ngComponent.run(onRunningConfiguration)

  function onRunningConfiguration ($ionicConfig, $ionicPlatform, $ionicAnalytics, ENV, AppPush, Auth) {
    $ionicConfig.views.maxCache(0);

    $ionicPlatform.ready(function() {
      AppPush.init()

      if (ENV.isProduction()) {
        $ionicAnalytics.register()
      }

      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleLightContent();
      }
    })
  }

  function configIonic ($ionicConfigProvider) {
    $ionicConfigProvider.tabs.style('standard')
    $ionicConfigProvider.tabs.position('bottom')
    $ionicConfigProvider.scrolling.jsScrolling(false)
  }

}
