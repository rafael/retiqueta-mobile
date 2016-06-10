export default function (ngComponent) {
  ngComponent.run(InterceptLocalNotification)

  function InterceptLocalNotification ($rootScope, Utils, $ionicPlatform, $state) {
    $ionicPlatform.ready(function(){
      $rootScope.$on('$cordovaLocalNotification:schedule', function(event, notification, state) {
        Utils.logger.log(new Date(notification.at))      
      })

      $rootScope.$on('$cordovaLocalNotification:click', function (event, notification, state) {
        try {
          const data = JSON.parse(notification.data)
          if (data.changeState !== null && typeof data.changeState !== 'undefined') {
            $state.go(...data.changeState)
          }         
        } catch (e) {
          console.log(e)
        }
      })
      $rootScope.$on('$cordovaLocalNotification:cancel', function(event, notification, state) {
        Utils.logger.log('cancelled: ' + notification.id)
      })
    })
  }
}
