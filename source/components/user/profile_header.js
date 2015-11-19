export default function profileHeaderFactory (ngComponent) {
  ngComponent.directive('profileHeader', profileHeader)

  var directive = {
    templateUrl: 'user/profile_header.html',
    retrict: 'E',
    scope: {
      user: '=',
    },
    link(scope, element, attrs) {
      scope.isOwner = (attrs.owner  === 'true') ? true : false
    },
  }

  function profileHeader() {
    return directive
  }  
}
