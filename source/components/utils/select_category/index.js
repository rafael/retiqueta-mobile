export default function SelectCateroryFactory (ngComponent) {
  ngComponent.directive('selectCategoryField', SelectCategory)

  function SelectCategory (FieldHelper, FormForConfiguration, $ionicScrollDelegate) {
    return {
      restrict: 'E',
      require: '^formFor',
      templateUrl: 'utils/select_category/template.html',
      scope: {
        attribute: '@',
        disable: '=',
        help: '@?',
        multiple: '=?',
        options: '=',
        placeholder: '@?',
        autoToggleModal: "@"
      },
      link: function($scope, $element, $attributes, formForController) {
        $scope.label = $attributes['label'] || 'label'
        $scope.setOption = setOption
        $scope.showModal = true
        $scope.toggleModal = toggleModal
        $scope.modelHasValue = modelHasValue

        FieldHelper.manageFieldRegistration($scope, $attributes, formForController);

        function toggleModal() {
          $scope.showModal = !$scope.showModal
          $ionicScrollDelegate.scrollTop()
        }

        function setOption (value) {
          $scope.model.bindable = value
          formForController.validateForm()
          if ($scope.autoToggleModal !== 'false') {
            toggleModal()
          }
        }

        function modelHasValue () {
          if ($scope.hasOwnProperty('model')) {
            return typeof $scope.model.bindable !== 'undefined' && $scope.model.bindable !== null && $scope.model.bindable !== ''
          } else {
            return false
          }
        }
      }
    }
  }
}
