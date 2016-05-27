export default function (ngComponent) {

  ngComponent.config(configIonic)
  ngComponent.run(onRunningConfiguration)

  function onRunningConfiguration($ionicPlatform, $ionicAnalytics, ENV, AppPush, Auth) {
    $ionicPlatform.ready(function() {
      AppPush.init()

      if (ENV.isProduction()) {
        $ionicAnalytics.register()
      }

      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false)
        cordova.plugins.Keyboard.disableScroll(false)
      }
      if (window.StatusBar) {
        StatusBar.styleLightContent()
      }
    })
  }

  function configIonic ($ionicConfigProvider) {
    $ionicConfigProvider.views.forwardCache(true)
    $ionicConfigProvider.tabs.style('standard')
    $ionicConfigProvider.tabs.position('bottom')
    $ionicConfigProvider.scrolling.jsScrolling(false)
    $ionicConfigProvider.backButton.previousTitleText(false).text('').icon('ion-ios-arrow-back')
  }
}
