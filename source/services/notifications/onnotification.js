import routes from './routes'

export default function onNotification (ENV, Utils, $state, $rootScope, $ionicPlatform, $cordovaLocalNotification) {
  return function onNotification (notification) {
    Utils.logger.info("A new notification recived")
    Utils.logger.log(notification)

    try {
      const urlVars = routes(notification.payload)
      if (notification._raw.additionalData.foreground === false) {
        $state.go(...urlVars)
      } else {
        scheduleNotification(notification, urlVars)
      }
    } catch (e) {
      console.log(e)
    }
  }

  function scheduleNotification (notification, go) {
    const notificationObj = {
      title: notification.title,
      text: notification.text,
      data: { changeState: go }    
    }
    $cordovaLocalNotification.schedule(notificationObj)
  }
}


function randomId () {
  return Math.random().toString(36).substring(4) + Math.floor(new Date().getTime()).toString(36)
}
