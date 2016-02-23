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
        placeholder: '@?'
      },
      link: function($scope, $element, $attributes, formForController) {
        $scope.label = $attributes['label'] || 'label'
        $scope.setOption = setOption
        $scope.showModal = false
        $scope.toggleModal = toggleModal

        console.log($scope.placeholder)

        FieldHelper.manageFieldRegistration($scope, $attributes, formForController);

        function toggleModal() {
          $scope.showModal = !$scope.showModal
          $ionicScrollDelegate.scrollTop()
        }

        function setOption (value) {
          $scope.model.bindable = value
          formForController.validateForm()
          toggleModal()
        }
      }
    }
  }
}
