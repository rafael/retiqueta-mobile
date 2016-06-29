export default function (ngComponent) {
  ngComponent.directive('modalActions', modalActions)

  function modalActions () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'utils/actions_modal/template.html',
      scope: {
        showIf: '='
      },
      link: LinkFunction
    }

    function LinkFunction (scope, element) {
      scope.closeModal = () => {
        scope.showIf = false
      }
    }
  }
}
