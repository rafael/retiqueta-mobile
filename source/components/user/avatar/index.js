export default function userAvatarFactory (ngComponent) {
  ngComponent.directive('userAvatar', userAvatar)

  function userAvatar (User, Auth, Utils, CameraService) {
    return {
      templateUrl: 'user/avatar/index.html',
      restrict: 'E',
      scope: {
        src: '='
      },
      link: preLink    
    }

    function preLink(scope, iElement, iAttrs, controller) { 
      scope.image = () => {
        return (hasPicture(scope.src)) ? scope.src : 'images/guess_user.png'
      }

      function hasPicture (source) {
        return  typeof source !== 'undefined'
        && source !== ''
        && source !== '/pics/original/missing.png'
        && source !== '/pics/small/missing.png'
      }
    }
  }
}

