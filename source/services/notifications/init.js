import onNotification from './onnotification'
import RegisterToken from './register_token'
import localEvents from './local_events'

export default function (ngComponent) {
  ngComponent.factory('InitPushFactory', InitPushFactory)
  
  localEvents(ngComponent)

  function InitPushFactory (Auth, User, $q, ENV, $ionicPush, $ionicPlatform, Utils, $state, $cordovaLocalNotification, $rootScope) {
    let saveTokenOnApi = RegisterToken(Auth, User, $q, ENV, $ionicPush, $ionicPlatform, Utils)

    function InitPush () {
      var push = $ionicPush.init({
        "debug": ENV.isDevelopment(),
        "onNotification": onNotification(ENV, Utils, $state, $rootScope, $ionicPlatform, $cordovaLocalNotification),
        "onRegister": onRegisterCallback
      });

      function onRegisterCallback (data) {
        Utils.logger.info('Device has been register on Ionic Platform Push');
        Utils.logger.log(data);
        // persist the token in the Ionic platforms
        if (ENV.isProduction()) {
          cordova.plugins.FacebookPushCampaign.register(data.token);
        }
        saveTokenOnApi(data.token);
      }
    }
    return function init () {
      $ionicPlatform.ready(InitPush);
    };
  }

  function isAlreadyInitPush () {
    var token = JSON.parse(window.localStorage.getItem('ionic_io_push_token') || '{}');
    return token.hasOwnProperty('token');
  }
}
