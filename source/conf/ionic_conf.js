export default function(ngComponent) {

  ngComponent.run(function($ionicPlatform, $ionicAnalytics, ENV, AppPush, Auth) {
    $ionicPlatform.ready(function() {
      AppPush = AppPush.init()

      console.log( AppPush )
      var production = ENV.type !== 'development';

      if(production) {
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
