export default function (ngComponent) {

  ngComponent.config(configIonic)
  ngComponent.run(onRunningConfiguration)

  function onRunningConfiguration($ionicPlatform, $ionicAnalytics, ENV, AppPush, Auth) {
    $ionicPlatform.ready(function() {
      AppPush.init()

      if (ENV.isProduction()) {
        $ionicAnalytics.register()
        $ionicAnalytics.setGlobalProperties({
          platform: $ionicPlatform.device()
        });
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

  function configIonic ($ionicConfigProvider, $ionicAutoTrackProvider) {
    // $ionicAutoTrackProvider.disableTracking('Click')
    $ionicAutoTrackProvider.disableTracking('Load')
    $ionicAutoTrackProvider.disableTracking('Tap')
    $ionicConfigProvider.views.forwardCache(true)
    $ionicConfigProvider.tabs.style('standard')
    $ionicConfigProvider.tabs.position('bottom')
    $ionicConfigProvider.scrolling.jsScrolling(true)
    $ionicConfigProvider.backButton.previousTitleText(false).text('').icon('ion-ios-arrow-back')
  }
}
