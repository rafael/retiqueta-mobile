export default function FileModelDirectiveFactory (ngComponent) {
  ngComponent.directive('fileModel', fileModel)

  function fileModel ($parse) {
    return {
      restrict: 'A',
      link (scope, element, attrs) {
        var model = $parse(attrs.fileModel)
        var modelSetter = model.assign

        element.bind('change', () => {
          scope.$apply(() => {
            modelSetter(scope, element[0].files[0])
          })
        })
      }
    }
  }
}
