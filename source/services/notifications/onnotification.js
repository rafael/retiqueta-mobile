import routes from './routes'

export default function onNotification (ENV, Utils, $state, $rootScope, $ionicPlatform, $cordovaLocalNotification) {
  return function onNotification (notification) {
    Utils.logger.info("A new notification recived")
    Utils.logger.log(notification)

    try {
      if (notification.payload.type === 'url') {
        return redirectUrl(notification)
      } else if ( notification.payload.type === 'fulfillment_comment') {
        const newPayload = convertFulfillmentCommentOnUrlType(notification, `/v1/orders/${notification.payload.order_id}`)
        return redirectUrl(newPayload)
      } 
    } catch (e) {
      console.log(e)
    }
  }

  function convertFulfillmentCommentOnUrlType (notification, newUrl) {
    return Object.assign({}, notification, {
      payload: {
        type: 'url',
        url: newUrl
      }
    })
  }
  
  function redirectUrl (notification) {
    const urlVars = routes(notification.payload)
    if (notification._raw.additionalData.foreground === false) {
      return $state.go(...urlVars)
    } else {
      return scheduleNotification(notification, urlVars)
    }
  }

  function scheduleNotification (notification, go) {
    const notificationObj = {
      title: notification.title,
      text: notification.text,
      data: { changeState: go }    
    }
    return $cordovaLocalNotification.schedule(notificationObj)
  }
}


function randomId () {
  return Math.random().toString(36).substring(4) + Math.floor(new Date().getTime()).toString(36)
}
