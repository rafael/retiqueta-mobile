export default function UserTabsCtrlFactory (ngComponent) {
  ngComponent.controller('UserTabsCtrl', UserTabsCtrl)

  function UserTabsCtrl ($scope, $state) {
    this.go = (where, conf = { reload: true, location: true }) => {
      $state.go(where, conf)
    }
  }
} 
