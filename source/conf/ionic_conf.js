export default function(ngComponent) {

  ngComponent.run(function($ionicPlatform, $ionicAnalytics, ENV, AppPush, Auth) {
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
    });
  })
}
