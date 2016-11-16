export default function faqCtrlFactory (ngComponent) {
  ngComponent.controller('faqCtrl', faqCtrl)

  function faqCtrl (Faqs, $cordovaAppVersion) {
    const _ = this
    _.shownGroup = null
    _.faqs = Faqs
    _.toggleGroup = toggleGroup
    _.isGroupShown = isGroupShown
    _.info = info
    _.updatedItem = null;

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
      var reVersion = /APP_VERSION/gi;
      var rgCode = /APP_CODE/gi;
      $cordovaAppVersion.getVersionCode().then(function (code) {
        _.updatedItem = item.replace(reVersion, code);
      });
      $cordovaAppVersion.getVersionNumber().then(function (version) {
        _.updatedItem = _.updatedItem.replace(rgCode, version);
      });
      return _.updatedItem;
    }

  }
}
