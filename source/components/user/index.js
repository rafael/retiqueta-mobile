export default function UserTabsCtrlFactory (ngComponent) {
  ngComponent.controller('UserTabsCtrl', UserTabsCtrl)

  function UserTabsCtrl ($scope, $state) {
    this.go = (where, vars = {}, conf = { reload: true, location: true }) => {
      $state.go(where, vars, conf)
    }
  }
} 
