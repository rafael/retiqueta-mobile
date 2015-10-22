export default function(ngComponent) {
  ngComponent.directive('pictureInput', pictureInput);

  function pictureInput() {
    return {
      templateUrl: 'utils/picture-input.html',
      restrict: 'E',
      scope: {
        uploadText: "=text",
        onChangeHandler: "=onChange",
      },
      link: function(scope, element, attrs, controllers) {
        var fileInput = element.find('input')[0]
        scope.changePic = function() {
          fileInput.click()
        }
      }
    };
  }
}
