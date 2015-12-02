export default function(ngComponent) {
  ngComponent.directive('onFileChange', OnFileChange)
  
  function OnFileChange() {
    return {
      restrict: 'A',
      scope: {
        handler: '=onFileChangeHandler'
      },
      link(scope, element, attrs) {
        scope.$watch('handler', function(value) {
          element.bind('change', scope.handler)
        })
      }
    };
  }
}
