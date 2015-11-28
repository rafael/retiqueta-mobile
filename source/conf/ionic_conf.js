export default function(ngComponent) {

  ngComponent.run(function($ionicPlatform, $ionicAnalytics, ENV, $ionicPush) {
    $ionicPlatform.ready(function() {
      var development = ENV.type !== 'development';

      if(development) {
        $ionicAnalytics.register()
      }

      $ionicPush.init({
        "debug": ENV.type,
        "onNotification": function(notification) {
          var payload = notification.payload;
          console.log(notification, payload);
        },
        "onRegister": function(data) {
          console.log(data.token);
        }
      });

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
