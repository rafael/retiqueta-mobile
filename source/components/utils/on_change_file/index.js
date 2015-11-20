export default function(ngComponent) {
  ngComponent.directive('onFileChange', OnFileChange)
  
  function OnFileChange() {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var onChangeHandler = scope.$eval(attrs.onFileChange);
        element.bind('change', onChangeHandler);
      }
    };
  }
}
