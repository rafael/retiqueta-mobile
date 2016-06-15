export default function faqCtrlFactory (ngComponent) {
  ngComponent.controller('faqCtrl', faqCtrl)

  function faqCtrl (Faqs) {
    const _ = this
    _.shownGroup = null
    _.faqs = Faqs
    _.toggleGroup = toggleGroup
    _.isGroupShown = isGroupShown
      
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
  }
}
