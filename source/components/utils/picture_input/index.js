export default function pictureInputDirectiveFactory (ngComponent) {
  ngComponent.directive('pictureInput', pictureInput)

  function pictureInput (CameraService) {
    return {
      templateUrl: 'utils/picture_input/picture-input.html',
      restrict: 'E',
      scope: {
        uploadText: '=',
        takeText: '=',
        onChangeHandler: '=onChange'
      },
      link (scope, element, attrs, controllers) {
        var fileInput = element.find('input')[0]

        scope.reader = new window.FileReader()

        scope.reader.onload = (e) => {
          scope.onChangeHandler(e.target.result)
        }

        scope.extractPicture = (e) => {
          scope.reader.readAsDataURL(e.target.files[0])
        }

        scope.uploadPic = () => {
          fileInput.click()
        }

        scope.takePic = () => {
          CameraService.take()
            .then(result => {
              scope.onChangeHandler('data:image/jpeg;base64,' + result)
            })
        }
      }
    }
  }
}
