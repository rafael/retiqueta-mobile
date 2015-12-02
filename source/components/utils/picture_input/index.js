export default function(ngComponent) {
  ngComponent.directive('pictureInput', pictureInput);

  function pictureInput(CameraService) {
    return {
      templateUrl: 'utils/picture_input/picture-input.html',
      restrict: 'E',
      scope: {
        uploadText: "=",
        takeText: "=",
        onChangeHandler: "=onChange",
      },
      link: function(scope, element, attrs, controllers) {
        var fileInput = element.find('input')[0]
        var reader = new FileReader();   
       
        reader.onload = function(e) {
          scope.onChangeHandler(e.target.result)
        }

        scope.loadPicture = function(e) {
          reader.readAsDataURL(scope.picture)
        } 

        scope.uploadPic = function() {
          fileInput.click()
        }

        scope.takePic = function() {
          CameraService.take()
          .then(result => {
            scope.onChangeHandler("data:image/jpeg;base64," + result)
          })
        }
      }
    };
  }
}
