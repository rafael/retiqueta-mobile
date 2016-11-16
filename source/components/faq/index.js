export default function faqCtrlFactory (ngComponent) {
  ngComponent.controller('faqCtrl', faqCtrl)

  function faqCtrl (Faqs, $cordovaAppVersion) {
    const _ = this
    _.shownGroup = null
    _.faqs = Faqs
    _.toggleGroup = toggleGroup
    _.isGroupShown = isGroupShown
    _.info = info

    function toggleGroup (group) {
      if (isGroupShown(group)) {
        _.shownGroup = null
      } else {
        _.shownGroup = group
      }
    }

    function isGroupShown (group) {
      return _.shownGroup === group;
    };

    function info(item) {
      var reVersion = /app_version/gi;
      var rgCode = /app_code/gi;
      var updatedItem = item
      $cordovaAppVersion.getVersionCode().then(function (code) {
        updatedItem = item.replace(reVersion, code);
      });
      $cordovaAppVersion.getVersionNumber().then(function (version) {
        updatedItem = updatedItem.replace(rgCode, version);
      });
      return updatedItem
    }

  }
}
