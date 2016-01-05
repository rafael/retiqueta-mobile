export default function onNotification (ENV) {
  return function onNotification (payload) {
    console.info("A new notification recived")
    console.log(payload)
  }
}
