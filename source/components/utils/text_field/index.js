export default function textPlusFieldFactory (ngComponent) {
  ngComponent.directive('textPlusField', textPlusField)

  ngComponent.run(setTemplate)

  function setTemplate($templateCache) {
    $templateCache.put('form-for/templates/text-plus-field.html',`
                       <div class="form-for-field" ng-class="{ 'invalid': model.error, 'with-icon-after': iconAfter, 'with-icon-before': iconBefore }">
                       <field-label  ng-if="label"
                       input-uid="{{model.uid}}"
                       iud="{{model.uid}}-label"
                       label="{{label}}"
                       label-class="{{labelClass}}"
                       help="{{help}}"
                       required="{{model.required}}">
                       </field-label>

                       <field-error uid="{{model.uid}}-error" error="model.error"></field-error>

                       <!-- <input> and <textarea> rendered as partials to allow for easier overrides -->
                       <span ng-if="!multiline" ng-include src="'form-for/templates/text-field/_input_plus.html'"></span>
                       <span ng-if="multiline"  ng-include src="'form-for/templates/text-field/_textarea.html'"></span>

                       <i class="form-for-input-icon-left"
                       ng-class="iconBefore"
                       ng-click="onIconBeforeClick()"></i>

                       <i class="form-for-input-icon-right"
                       ng-class="iconAfter"
                       ng-click="onIconAfterClick()"></i>
                       </div>`)

    $templateCache.put('form-for/templates/text-field/_input_plus.html', `
                       <input  aria-manager
                       id="{{model.uid}}"
                       name="{{attribute}}"
                       type="{{type}}"
                       tabindex="{{tabIndex}}"
                       ng-attr-pattern="{{ validationRules.inputPattern }}"
                       placeholder="{{placeholder}}"
                       ng-model="model.bindable"
                       ng-disabled="disable || model.disabled"
                       form-for-debounce="{{debounce}}"
                       ng-click="onFocus()"
                       ng-blur="onBlur()"
                       min="{{validationRules.minimum}}"
                       max="{{validationRules.maximum}}"
                       step="{{validationRules.increment}}" />`)
  }

  function textPlusField ($log, $timeout, FieldHelper) {
    return {
      restrict: 'EA',
      require: '^formFor',
      templateUrl: function ($element, $attributes) {
        return $attributes['template'] || 'form-for/templates/text-plus-field.html';
      },
      scope: {
        attribute: '@',
        debounce: '@?',
        disable: '=',
        focused: '&?',
        blurred: '&?',
        help: '@?',
        iconAfterClicked: '&?',
        iconBeforeClicked: '&?',
        placeholder: '@?',
        rows: '=?',
        controller: '=?',
        type: '=?'
      },
      link: function($scope, $element, $attributes, formForController) {
        if (!$scope.attribute) {
          $log.error('Missing required field "attribute"');
          return;
        }
        // Expose textField attributes to textField template partials for easier customization (see issue #61)
        $scope.attributes = $attributes;
        $scope.rows = $scope.rows || 3;
        $scope.type = $attributes['type'] || 'text';
        $scope.multiline = $attributes.hasOwnProperty('multiline') && $attributes['multiline'] !== 'false';
        $scope.tabIndex = $attributes['tabIndex'] || 0;
        $timeout(function () {
          $scope.controller = $element.find($scope.multiline ? 'textarea' : 'input').controller('ngModel');
        });
        if ($attributes.hasOwnProperty('autofocus')) {
          $timeout(function () {
            $element.find($scope.multiline ? 'textarea' : 'input')[0].focus();
          });
        }
        FieldHelper.manageLabel($scope, $attributes, false);
        FieldHelper.manageFieldRegistration($scope, $attributes, formForController);
        // Expose certain validation rules (such as min/max) so that the view layer can pass them along
        var validationRules = formForController.getValidationRulesForAttribute($scope.attribute);
        if (validationRules) {
          $scope.validationRules = {
            increment: validationRules.increment,
            maximum: validationRules.maximum,
            minimum: validationRules.minimum,
            inputPattern: validationRules.inputPattern
          };
        }
        // Update $scope.iconAfter based on the field state (see class-level documentation for more)
        if ($attributes['iconAfter']) {
          var updateIconAfter = function () {
            if (!$scope.model) {
              return;
            }
            var iconAfter = $attributes['iconAfter'].charAt(0) === '{' ?
              $scope.$eval($attributes['iconAfter']) :
                $attributes['iconAfter'];
                if (angular.isObject(iconAfter)) {
                  if ($scope.model.error) {
                    $scope.iconAfter = iconAfter['invalid'];
                  }
                  else if ($scope.model.pristine) {
                    $scope.iconAfter = iconAfter['pristine'];
                  }
                  else {
                    $scope.iconAfter = iconAfter['valid'];
                  }
                }
                else {
                  $scope.iconAfter = iconAfter;
                }
          };
          $attributes.$observe('iconAfter', updateIconAfter);
          $scope.$watch('model.error', updateIconAfter);
          $scope.$watch('model.pristine', updateIconAfter);
        }
        // Update $scope.iconBefore based on the field state (see class-level documentation for more)
        if ($attributes['iconBefore']) {
          var updateIconBefore = function () {
            if (!$scope.model) {
              return;
            }
            var iconBefore = $attributes['iconBefore'].charAt(0) === '{' ?
              $scope.$eval($attributes['iconBefore']) :
                $attributes['iconBefore'];
                if (angular.isObject(iconBefore)) {
                  if ($scope.model.error) {
                    $scope.iconBefore = iconBefore['invalid'];
                  }
                  else if ($scope.model.pristine) {
                    $scope.iconBefore = iconBefore['pristine'];
                  }
                  else {
                    $scope.iconBefore = iconBefore['valid'];
                  }
                }
                else {
                  $scope.iconBefore = iconBefore;
                }
          };
          $attributes.$observe('iconBefore', updateIconBefore);
          $scope.$watch('model.error', updateIconBefore);
          $scope.$watch('model.pristine', updateIconBefore);
        }
        $scope.onIconAfterClick = function () {
          if ($scope.hasOwnProperty('iconAfterClicked')) {
            $scope.iconAfterClicked();
          }
        };
        $scope.onIconBeforeClick = function () {
          if ($scope.hasOwnProperty('iconBeforeClicked')) {
            $scope.iconBeforeClicked();
          }
        };
        $scope.onFocus = function () {
          if ($scope.hasOwnProperty('focused')) {
            $scope.focused();
          }
        };
        $scope.onBlur = function () {
          if ($scope.hasOwnProperty('blurred')) {
            $scope.blurred();
          }
        };
      }
    }
  }
}
