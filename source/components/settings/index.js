export default function SettingsFactory (ngComponent) {
  ngComponent.controller('settingsCtrl', settingsCtrl)

  function settingsCtrl (Utils, ENV) {
    var _ = this
    var deploy = new Ionic.Deploy()

    _.hasUpdate = false
    _.updateable = ENV.deploy.updateable
    _.doUpdate = doUpdate
    _.checkForUpdates = checkForUpdates
      
    function doUpdate () {
      deploy.update().then(function(res) {
        Utils.swalSuccess('Ionic Deploy: Update Success!')
        Utils.logger.log('Ionic Deploy: Update Success!', res)
      }, function(err) {
        Utils.logger.log('Ionic Deploy: Update error! ', err)
      }, function(prog) {
        Utils.logger.log('Ionic Deploy: Progress... ', prog)
      })
    }

    function checkForUpdates () {
      Utils.logger.log('Ionic Deploy: Checking for updates')
      deploy.check().then(function(hasUpdate) {
        Utils.logger.log('Ionic Deploy: Update available: ' + hasUpdate)
        _.hasUpdate = hasUpdate
      }, function(err) {
        Utils.logger.error('Ionic Deploy: Unable to check for updates', err)
      });
    }
  }
}
