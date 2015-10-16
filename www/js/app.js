(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module("formFor.defaultTemplates", []).run(["$templateCache", function($templateCache) {$templateCache.put("form-for/templates/checkbox-field.html","<div class=\"form-for-field\" ng-class=\"{\'invalid\': model.error}\">\n  <field-error  error=\"model.error\"\n                left-aligned=\"true\"\n                uid=\"{{model.uid}}-error\">\n  </field-error>\n\n  <input  aria-manager\n          id=\"{{model.uid}}\"\n          name=\"{{attribute}}\"\n          type=\"checkbox\"\n          tabindex=\"{{tabIndex}}\"\n          ng-model=\"model.bindable\"\n          ng-checked=\"checked\"\n          ng-disabled=\"disable || model.disabled\"\n          ng-change=\"changed()\">\n\n  <field-label  ng-if=\"label\"\n                input-uid=\"{{model.uid}}\"\n                uid=\"{{model.uid}}-label\"\n                label=\"{{label}}\"\n                label-class=\"{{labelClass}}\"\n                help=\"{{help}}\">\n  </field-label>\n</div>\n");
$templateCache.put("form-for/templates/collection-label.html","<div class=\"collection-label\">\n  <field-label  ng-if=\"label\"\n                label=\"{{label}}\"\n                help=\"{{help}}\"\n                required=\"{{model.required}}\">\n  </field-label>\n\n  <small field-error error=\"model.error\" left-aligned=\"true\"></small>\n</div>\n");
$templateCache.put("form-for/templates/field-error.html","<p  ng-if=\"error\"\n    id=\"{{uid}}\"\n    class=\"field-error\" ng-class=\"{\'left-aligned\': leftAligned}\"\n    ng-bind=\"error\">\n</p>\n");
$templateCache.put("form-for/templates/field-label.html","<label id=\"{{uid}}\" for=\"{{inputUid}}\" class=\"field-label\" ng-class=\"[labelClass]\">\n  <span ng-bind-html=\"bindableLabel\"></span>\n\n  <span ng-if=\"help\">\n     <span ng-if=\"helpIcon\" class=\"{{helpIcon}}\"\n           popover=\"{{help}}\"\n           popover-trigger=\"mouseenter\"\n           popover-placement=\"right\"></span>\n\n     <span ng-if=\"!helpIcon\" class=\"form-for-tooltip\">\n       <div class=\"form-for-tooltip-icon\">?</div>\n       <div class=\"form-for-tooltip-popover\" ng-bind=\"help\"></div>\n     </span>\n   </span>\n\n  <span ng-if=\"requiredLabel\" class=\"field-label-required-label\" ng-bind=\"requiredLabel\"></span>\n</label>\n");
$templateCache.put("form-for/templates/radio-field.html","<div class=\"form-for-field\" ng-class=\"{\'invalid\': model.error}\">\n  <field-label  ng-if=\"label\"\n                input-uid=\"{{uid}}\"\n                label=\"{{label}}\"\n                label-class=\"{{labelClass}}\"\n                help=\"{{help}}\">\n  </field-label>\n\n  <field-error  error=\"model.error\"\n                left-aligned=\"true\"\n                uid=\"{{uid}}-error\">\n  </field-error>\n\n  <label ng-repeat=\"option in options track by $index\">\n    <input  aria-manager\n            id=\"{{uid}}-{{$index}}\"\n            type=\"radio\"\n            name=\"{{attribute}}\"\n            tabindex=\"{{tabIndex}}\"\n            ng-model=\"model.bindable\"\n            ng-value=\"option[valueAttribute]\"\n            ng-disabled=\"disable || model.disabled\">\n\n    <span ng-bind-html=\"option[labelAttribute]\"></span>\n  </label>\n</div>");
$templateCache.put("form-for/templates/select-field.html","<div class=\"form-for-field with-icon-after\" ng-class=\"{\'invalid\': model.error}\">\n  <field-label  ng-if=\"label\"\n                input-uid=\"{{model.uid}}\"\n                iud=\"{{model.uid}}-label\"\n                label=\"{{label}}\"\n                label-class=\"{{labelClass}}\"\n                help=\"{{help}}\"\n                required=\"{{model.required}}\">\n  </field-label>\n\n  <field-error uid=\"{{model.uid}}-error\" error=\"model.error\"></field-error>\n\n  <!-- Binding to the \'multiple\' attribute is not supported, even with ng-attr-multiple.\n       This means that single and multiple select menus need to be defined separately.\n       For ease of customization, they\'re also separated into their own partials. -->\n\n  <span ng-if=\"multiple\"\n        ng-include\n        src=\"\'form-for/templates/select-field/_multi-select.html\'\"></span>\n\n  <span ng-if=\"!multiple\"\n        ng-include\n        src=\"\'form-for/templates/select-field/_select.html\'\"></span>\n</div>\n");
$templateCache.put("form-for/templates/submit-button.html","<button class=\"submit-button\" ng-class=\"buttonClass\"\n        ng-disabled=\"disable || model.disabled\"\n        role=\"button\"\n        aria-label=\"bindableLabel\"\n        tabindex=\"{{tabIndex}}\">\n\n  <i ng-if=\"icon\" class=\"submit-button-icon\" ng-class=\"icon\"></i>\n\n  <span ng-bind-html=\"bindableLabel\"></span>\n</button>\n");
$templateCache.put("form-for/templates/text-field.html","<div class=\"form-for-field\" ng-class=\"{ \'invalid\': model.error, \'with-icon-after\': iconAfter, \'with-icon-before\': iconBefore }\">\n  <field-label  ng-if=\"label\"\n                input-uid=\"{{model.uid}}\"\n                iud=\"{{model.uid}}-label\"\n                label=\"{{label}}\"\n                label-class=\"{{labelClass}}\"\n                help=\"{{help}}\"\n                required=\"{{model.required}}\">\n  </field-label>\n\n  <field-error uid=\"{{model.uid}}-error\" error=\"model.error\"></field-error>\n\n  <!-- <input> and <textarea> rendered as partials to allow for easier overrides -->\n  <span ng-if=\"!multiline\" ng-include src=\"\'form-for/templates/text-field/_input.html\'\"></span>\n  <span ng-if=\"multiline\"  ng-include src=\"\'form-for/templates/text-field/_textarea.html\'\"></span>\n\n  <i class=\"form-for-input-icon-left\"\n     ng-class=\"iconBefore\"\n     ng-click=\"onIconBeforeClick()\"></i>\n\n  <i class=\"form-for-input-icon-right\"\n     ng-class=\"iconAfter\"\n     ng-click=\"onIconAfterClick()\"></i>\n</div>\n");
$templateCache.put("form-for/templates/type-ahead-field.html","<div class=\"form-for-field with-icon-after\" ng-class=\"{\'invalid\': model.error}\">\n  <field-label  ng-if=\"label\"\n                input-uid=\"{{model.uid + \'-filter\'}}\"\n                iud=\"{{model.uid}}-label\"\n                label=\"{{label}}\"\n                label-class=\"{{labelClass}}\"\n                help=\"{{help}}\"\n                required=\"{{model.required}}\">\n  </field-label>\n\n  <field-error uid=\"{{model.uid}}-error\" error=\"model.error\"></field-error>\n\n  <!-- Filtered dropdowns use a type-ahead style component -->\n  <input  aria-manager\n          id=\"{{model.uid}}-filter\"\n          name=\"{{attribute}}\"\n          type=\"search\"\n          tabindex=\"{{tabIndex}}\"\n          placeholder=\"{{placeholder}}\"\n          form-for-debounce=\"{{debounce}}\"\n          ng-disabled=\"disable || model.disabled\"\n          ng-model=\"scopeBuster.filter\"\n          ng-click=\"filterTextClick($event)\"\n          ng-focus=\"open()\"\n          ng-keydown=\"keyDown($event)\">\n\n  <ul ng-if=\"options.length\">\n    <li ng-repeat=\"option in filteredOptions\"\n        ng-class=\"{ \'form-for-typeahead-list-item-active\': option === selectedOption,\n                    \'form-for-typeahead-list-item-hover\':  $index === mouseOverIndex}\"\n        ng-bind=\"option[labelAttribute]\"\n        ng-mousedown=\"selectOption(option)\"\n        ng-mouseenter=\"mouseOver($index)\">\n    </li>\n  </ul>\n\n  <i class=\"form-for-input-icon-right fa fa-search\"\n     ng-click=\"setFilterFocus()\"></i>\n</div>\n");
$templateCache.put("form-for/templates/select-field/_multi-select.html","<select aria-manager multiple\n        id=\"{{model.uid}}\"\n        name=\"{{attribute}}\"\n        class=\"select-field-select\"\n        tabindex=\"{{tabIndex}}\"\n        ng-disabled=\"disable || model.disabled\"\n        ng-model=\"model.bindable\"\n        ng-options=\"option[valueAttribute] as option[labelAttribute] for option in bindableOptions\">\n</select>\n\n<i class=\"form-for-select-arrows\"></i>");
$templateCache.put("form-for/templates/select-field/_select.html","<select aria-manager\n        id=\"{{model.uid}}\"\n        name=\"{{attribute}}\"\n        class=\"select-field-select\"\n        tabindex=\"{{tabIndex}}\"\n        ng-disabled=\"disable || model.disabled\"\n        ng-model=\"model.bindable\"\n        ng-options=\"option[valueAttribute] as option[labelAttribute] for option in bindableOptions\">\n</select>\n\n<i class=\"form-for-select-arrows\"></i>");
$templateCache.put("form-for/templates/text-field/_input.html","<input  aria-manager\n        id=\"{{model.uid}}\"\n        name=\"{{attribute}}\"\n        type=\"{{type}}\"\n        tabindex=\"{{tabIndex}}\"\n        placeholder=\"{{placeholder}}\"\n        ng-model=\"model.bindable\"\n        ng-disabled=\"disable || model.disabled\"\n        form-for-debounce=\"{{debounce}}\"\n        ng-click=\"onFocus()\"\n        ng-blur=\"onBlur()\" />\n");
$templateCache.put("form-for/templates/text-field/_textarea.html","<textarea aria-manager\n          id=\"{{model.uid}}\"\n          name=\"{{attribute}}\"\n          tabindex=\"{{tabIndex}}\"\n          ng-attr-placeholder=\"{{placeholder}}\"\n          rows=\"{{rows}}\"\n          ng-model=\"model.bindable\"\n          ng-disabled=\"disable || model.disabled\"\n          form-for-debounce=\"{{debounce}}\"\n          ng-click=\"onFocus()\"\n          ng-blur=\"onBlur()\">\n</textarea>\n");}]);
},{}],2:[function(require,module,exports){
/// <reference path="../definitions/angular.d.ts" />
angular.module('formFor', []);
var formFor;
(function (formFor) {
    /**
     * Helper directive for input elements.
     * Observes the $scope :model attribute and updates aria-* elements accordingly.
     */
    var AriaManager = (function () {
        function AriaManager() {
            this.restrict = 'A';
        }
        /* @ngInject */
        AriaManager.prototype.link = function ($scope, $element, $attributes) {
            $scope.$watch('model.uid', function (uid) {
                $attributes.$set('ariaDescribedby', uid + '-error');
                $attributes.$set('ariaLabelledby', uid + '-label');
            });
            $scope.$watch('model.error', function (error) {
                $attributes.$set('ariaInvalid', !!error);
            });
        };
        AriaManager.prototype.link.$inject = ["$scope", "$element", "$attributes"];
        return AriaManager;
    })();
    formFor.AriaManager = AriaManager;
    angular.module('formFor').directive('ariaManager', function () {
        return new AriaManager();
    });
})(formFor || (formFor = {}));
/// <reference path="../../definitions/angular.d.ts" />
var formFor;
(function (formFor) {
    /**
     * This service can be used to configure default behavior for all instances of formFor within a project.
     * Note that it is a service accessible to during the run loop and not a provider accessible during config.
     */
    var FormForConfiguration = (function () {
        function FormForConfiguration() {
            this.autoGenerateLabels = false;
            this.autoTrimValues = false;
            this.defaultDebounceDuration = 500;
            this.defaultSubmitComplete = angular.noop;
            this.defaultSubmitError = angular.noop;
            this.defaultValidationFailed = angular.noop;
            this.defaultSelectEmptyOptionValue = undefined;
            this.helpIcon = null;
            this.labelClass = null;
            this.requiredLabel = null;
            this.validationFailedForCustomMessage_ = "Failed custom validation";
            this.validationFailedForEmailTypeMessage_ = "Invalid email format";
            this.validationFailedForIntegerTypeMessage_ = "Must be an integer";
            this.validationFailedForMaxCollectionSizeMessage_ = "Must be fewer than {{num}} items";
            this.validationFailedForMaximumMessage_ = "Must be no more than {{num}}";
            this.validationFailedForMaxLengthMessage_ = "Must be fewer than {{num}} characters";
            this.validationFailedForMinimumMessage_ = "Must be at least {{num}}";
            this.validationFailedForMinCollectionSizeMessage_ = "Must at least {{num}} items";
            this.validationFailedForMinLengthMessage_ = "Must be at least {{num}} characters";
            this.validationFailedForNegativeTypeMessage_ = "Must be negative";
            this.validationFailedForNonNegativeTypeMessage_ = "Must be non-negative";
            this.validationFailedForNumericTypeMessage_ = "Must be numeric";
            this.validationFailedForPatternMessage_ = "Invalid format";
            this.validationFailedForPositiveTypeMessage_ = "Must be positive";
            this.validationFailedForRequiredMessage_ = "Required field";
        }
        // Public methods ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Use this method to disable auto-generated labels for formFor input fields.
         */
        FormForConfiguration.prototype.disableAutoLabels = function () {
            this.autoGenerateLabels = false;
        };
        /**
         * Use this method to enable auto-generated labels for formFor input fields.
         * Labels will be generated based on attribute-name for fields without a label attribute present.
         * Radio fields are an exception to this rule.
         * Their names are generated from their values.
         */
        FormForConfiguration.prototype.enableAutoLabels = function () {
            this.autoGenerateLabels = true;
        };
        /**
         * Disable auto-trim.
         */
        FormForConfiguration.prototype.disableAutoTrimValues = function () {
            this.autoTrimValues = false;
        };
        /**
         * Auto-trim leading and trailing whitespace from values before syncing back to the formData object.
         */
        FormForConfiguration.prototype.enableAutoTrimValues = function () {
            this.autoTrimValues = true;
        };
        /**
         * Returns the appropriate error message for the validation failure type.
         */
        FormForConfiguration.prototype.getFailedValidationMessage = function (failureType) {
            switch (failureType) {
                case formFor.ValidationFailureType.CUSTOM:
                    return this.validationFailedForCustomMessage_;
                case formFor.ValidationFailureType.COLLECTION_MAX_SIZE:
                    return this.validationFailedForMaxCollectionSizeMessage_;
                case formFor.ValidationFailureType.COLLECTION_MIN_SIZE:
                    return this.validationFailedForMinCollectionSizeMessage_;
                case formFor.ValidationFailureType.MINIMUM:
                    return this.validationFailedForMinimumMessage_;
                case formFor.ValidationFailureType.MAX_LENGTH:
                    return this.validationFailedForMaxLengthMessage_;
                case formFor.ValidationFailureType.MAXIMUM:
                    return this.validationFailedForMaximumMessage_;
                case formFor.ValidationFailureType.MIN_LENGTH:
                    return this.validationFailedForMinLengthMessage_;
                case formFor.ValidationFailureType.PATTERN:
                    return this.validationFailedForPatternMessage_;
                case formFor.ValidationFailureType.REQUIRED:
                    return this.validationFailedForRequiredMessage_;
                case formFor.ValidationFailureType.TYPE_EMAIL:
                    return this.validationFailedForEmailTypeMessage_;
                case formFor.ValidationFailureType.TYPE_INTEGER:
                    return this.validationFailedForIntegerTypeMessage_;
                case formFor.ValidationFailureType.TYPE_NEGATIVE:
                    return this.validationFailedForNegativeTypeMessage_;
                case formFor.ValidationFailureType.TYPE_NON_NEGATIVE:
                    return this.validationFailedForNonNegativeTypeMessage_;
                case formFor.ValidationFailureType.TYPE_NUMERIC:
                    return this.validationFailedForNumericTypeMessage_;
                case formFor.ValidationFailureType.TYPE_POSITIVE:
                    return this.validationFailedForPositiveTypeMessage_;
            }
        };
        /**
         * Sets the default debounce interval (in ms) for all textField inputs.
         * This setting can be overridden on a per-input basis (see textField).
         * Defaults to 500ms.
         * To disable debounce (update only on blur) pass false.
         */
        FormForConfiguration.prototype.setDefaultDebounceDuration = function (value) {
            this.defaultDebounceDuration = value;
        };
        /**
         * Sets the default submit-complete behavior for all formFor directives.
         * This setting can be overridden on a per-form basis (see formFor).
         *
         * Default handler function accepting a data parameter representing the server-response returned by the submitted form.
         * This function should accept a single parameter, the response data from the form-submit method.
         */
        FormForConfiguration.prototype.setDefaultSubmitComplete = function (value) {
            this.defaultSubmitComplete = value;
        };
        /**
         * Sets the default submit-error behavior for all formFor directives.
         * This setting can be overridden on a per-form basis (see formFor).
         * @memberof FormForConfiguration
         * @param {Function} method Default handler function accepting an error parameter representing the data passed to the rejected submit promise.
         * This function should accept a single parameter, the error returned by the form-submit method.
         */
        FormForConfiguration.prototype.setDefaultSubmitError = function (value) {
            this.defaultSubmitError = value;
        };
        /**
         * Sets the default validation-failed behavior for all formFor directives.
         * This setting can be overridden on a per-form basis (see formFor).
         * @memberof FormForConfiguration
         * @param {Function} method Default function invoked when local form validation fails.
         */
        FormForConfiguration.prototype.setDefaultValidationFailed = function (value) {
            this.defaultValidationFailed = value;
        };
        /**
         * Sets the default value of empty option for selectField inputs.
         * Defaults to undefined.
         */
        FormForConfiguration.prototype.setDefaultSelectEmptyOptionValue = function (value) {
            this.defaultSelectEmptyOptionValue = value;
        };
        /**
         * Sets the class(es) to be used as the help icon in supported templates.
         * Each template specifies its own default help icon that can be overridden with this method.
         * @memberof FormForConfiguration
         * @param {string} class(es) for the desired icon, multiple classes are space separated
         */
        FormForConfiguration.prototype.setHelpIcon = function (value) {
            this.helpIcon = value;
        };
        /**
         * Global class-name for field <label>s.
         */
        FormForConfiguration.prototype.setLabelClass = function (value) {
            this.labelClass = value;
        };
        /**
         * Sets a default label to be displayed beside each text and select input for required attributes only.
         */
        FormForConfiguration.prototype.setRequiredLabel = function (value) {
            this.requiredLabel = value;
        };
        /**
         * Override the default error message for failed custom validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForCustomMessage = function (value) {
            this.validationFailedForCustomMessage_ = value;
        };
        /**
         * Override the default error message for failed max collection size validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForMaxCollectionSizeMessage = function (value) {
            this.validationFailedForMaxCollectionSizeMessage_ = value;
        };
        /**
         * Override the default error message for failed maximum validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForMaximumMessage = function (value) {
            this.validationFailedForMaximumMessage_ = value;
        };
        /**
         * Override the default error message for failed maxlength validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForMaxLengthMessage = function (value) {
            this.validationFailedForMaxLengthMessage_ = value;
        };
        /**
         * Override the default error message for failed min collection size validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForMinCollectionSizeMessage = function (value) {
            this.validationFailedForMaxCollectionSizeMessage_ = value;
        };
        /**
         * Override the default error message for failed minimum validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForMinimumMessage = function (value) {
            this.validationFailedForMinimumMessage_ = value;
        };
        /**
         * Override the default error message for failed minlength validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForMinLengthMessage = function (value) {
            this.validationFailedForMinLengthMessage_ = value;
        };
        /**
         * Override the default error message for failed pattern validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForPatternMessage = function (value) {
            this.validationFailedForPatternMessage_ = value;
        };
        /**
         * Override the default error message for failed required validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForRequiredMessage = function (value) {
            this.validationFailedForRequiredMessage_ = value;
        };
        /**
         * Override the default error message for failed type = 'email' validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForEmailTypeMessage = function (value) {
            this.validationFailedForEmailTypeMessage_ = value;
        };
        /**
         * Override the default error message for failed type = 'integer' validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForIntegerTypeMessage = function (value) {
            this.validationFailedForIntegerTypeMessage_ = value;
        };
        /**
         * Override the default error message for failed type = 'negative' validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForNegativeTypeMessage = function (value) {
            this.validationFailedForNegativeTypeMessage_ = value;
        };
        /**
         * Override the default error message for failed type = 'nonNegative' validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForNonNegativeTypeMessage = function (value) {
            this.validationFailedForNonNegativeTypeMessage_ = value;
        };
        /**
         * Override the default error message for failed type = 'numeric' validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForNumericTypeMessage = function (value) {
            this.validationFailedForNumericTypeMessage_ = value;
        };
        /**
         * Override the default error message for failed type = 'positive' validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForPositiveTypeMessage = function (value) {
            this.validationFailedForPositiveTypeMessage_ = value;
        };
        return FormForConfiguration;
    })();
    formFor.FormForConfiguration = FormForConfiguration;
    ;
    angular.module('formFor').service('FormForConfiguration', function () { return new FormForConfiguration(); });
})(formFor || (formFor = {}));
;
/// <reference path="form-for-configuration.ts" />
var formFor;
(function (formFor) {
    /**
     * Various helper methods for functionality shared between formFor field directives.
     */
    var FieldHelper = (function () {
        function FieldHelper(FormForConfiguration) {
            this.formForConfiguration_ = FormForConfiguration;
        }
        /**
         * Determines the field's label based on its current attributes and the FormForConfiguration configuration settings.
         * Also watches for changes in the (attributes) label and updates $scope accordingly.
         *
         * @param $scope Directive link $scope
         * @param $attributes Directive link $attributes
         * @param humanizeValueAttribute Fall back to a humanized version of the :value attribute if no label is provided;
         *                               This can be useful for radio options where the label should represent the value.
         *                               By default, a humanized version of the :attribute attribute will be used.
         */
        FieldHelper.prototype.manageLabel = function ($scope, $attributes, humanizeValueAttribute) {
            if (this.formForConfiguration_.autoGenerateLabels) {
                $scope['label'] = humanizeValueAttribute ? formFor.StringUtil.humanize($scope['value']) : formFor.StringUtil.humanize($scope['attribute']);
            }
            if (this.formForConfiguration_.labelClass) {
                $scope['labelClass'] = this.formForConfiguration_.labelClass;
            }
            if ($attributes.hasOwnProperty('label')) {
                $attributes.$observe('label', function (label) {
                    $scope['label'] = label;
                });
            }
            if ($attributes.hasOwnProperty('labelClass')) {
                $attributes.$observe('labelClass', function (labelClass) {
                    $scope['labelClass'] = labelClass;
                });
            }
        };
        /**
         * Helper method that registers a form field and stores the bindable object returned on the $scope.
         * This method also unregisters the field on $scope $destroy.
         *
         * @param $scope Input field $scope
         * @param $attributes Input field $attributes element
         * @param formForController Controller object for parent formFor
         */
        FieldHelper.prototype.manageFieldRegistration = function ($scope, $attributes, formForController) {
            $scope.$watch('attribute', function (newValue, oldValue) {
                if ($scope['model']) {
                    formForController.unregisterFormField(oldValue);
                }
                $scope['model'] = formForController.registerFormField($scope['attribute']);
                if ($attributes['uid']) {
                    $scope['model']['uid'] = $attributes['uid'];
                }
            });
            $scope.$on('$destroy', function () {
                formForController.unregisterFormField($scope['attribute']);
            });
        };
        return FieldHelper;
    })();
    formFor.FieldHelper = FieldHelper;
    angular.module('formFor').service('FieldHelper', ["FormForConfiguration", function (FormForConfiguration) { return new FieldHelper(FormForConfiguration); }]);
})(formFor || (formFor = {}));
/// <reference path="../services/field-helper.ts" />
/// <reference path="../services/form-for-configuration.ts" />
var formFor;
(function (formFor) {
    var $log_;
    var fieldHelper_;
    /**
     * Renders a checkbox <code>input</code> with optional label.
     * This type of component is well-suited for boolean attributes.
     *
     * @example
     * // To display a simple TOS checkbox you might use the following markup:
     * <checkbox-field label="I agree with the TOS"
     *                 attribute="accepted">
     * </checkbox-field>
     */
    var CheckboxFieldDirective = (function () {
        /* @ngInject */
        function CheckboxFieldDirective($log, fieldHelper) {
            this.require = '^formFor';
            this.restrict = 'EA';
            this.templateUrl = 'form-for/templates/checkbox-field.html';
            this.scope = {
                attribute: '@',
                disable: '=',
                help: '@?',
                changed: '@?'
            };
            $log_ = $log;
            fieldHelper_ = fieldHelper;
        }
        CheckboxFieldDirective.$inject = ["$log", "fieldHelper"];
        /* @ngInject */
        CheckboxFieldDirective.prototype.link = function ($scope, $element, $attributes, formForController) {
            if (!$scope['attribute']) {
                $log_.error('Missing required field "attribute"');
                return;
            }
            $scope.attributes = $attributes;
            $scope.tabIndex = $attributes['tabIndex'] || 0;
            $scope.toggle = function toggle() {
                if (!$scope.disable && !$scope.model.disabled) {
                    $scope.model.bindable = !$scope.model.bindable;
                }
            };
            $scope.$watch('model.bindable', function (value) {
                if (!$scope.model)
                    return;
                $scope.model.bindable = !$scope.model.required ? !!value : (value || undefined);
            });
            fieldHelper_.manageLabel($scope, $attributes, false);
            fieldHelper_.manageFieldRegistration($scope, $attributes, formForController);
        };
        CheckboxFieldDirective.prototype.link.$inject = ["$scope", "$element", "$attributes", "formForController"];
        return CheckboxFieldDirective;
    })();
    formFor.CheckboxFieldDirective = CheckboxFieldDirective;
    angular.module('formFor').directive('checkboxField', ["$log", "FieldHelper", function ($log, FieldHelper) {
        return new CheckboxFieldDirective($log, FieldHelper);
    }]);
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    var $sce_;
    /**
     * Header label for collections.
     * This component displays header text as well as collection validation errors.
     *
     * @example
     * // To display a simple collection header:
     * <collection-label  label="Hobbies" attribute="hobbies">
     * </collection-label>
     *
     * @param $sce $injector-supplied $sce service
     */
    var CollectionLabelDirective = (function () {
        /* @ngInject */
        function CollectionLabelDirective($sce) {
            this.require = '^formFor';
            this.restrict = 'EA';
            this.templateUrl = 'form-for/templates/collection-label.html';
            this.scope = {
                attribute: '@',
                help: '@?',
                label: '@'
            };
            $sce_ = $sce;
        }
        CollectionLabelDirective.$inject = ["$sce"];
        /* @ngInject */
        CollectionLabelDirective.prototype.link = function ($scope, $element, $attributes, formForController) {
            $scope.$watch('label', function (value) {
                $scope.bindableLabel = $sce_.trustAsHtml(value);
            });
            $scope.model = formForController.registerCollectionLabel($scope.attribute);
        };
        CollectionLabelDirective.prototype.link.$inject = ["$scope", "$element", "$attributes", "formForController"];
        return CollectionLabelDirective;
    })();
    formFor.CollectionLabelDirective = CollectionLabelDirective;
    angular.module('formFor').directive('collectionLabel', ["$sce", function ($sce) {
        return new CollectionLabelDirective($sce);
    }]);
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    /**
     * Displays a standard formFor field validation error message.
     *
     * @example
     * // To display a field error:
     * <field-error error="This is an error message">
     * </field-error>
     */
    var FieldErrorDirective = (function () {
        function FieldErrorDirective() {
            this.restrict = 'EA';
            this.templateUrl = 'form-for/templates/field-error.html';
            this.scope = {
                error: '=',
                leftAligned: '@?',
                uid: '@'
            };
        }
        /* @ngInject */
        FieldErrorDirective.prototype.link = function ($scope) {
        };
        FieldErrorDirective.prototype.link.$inject = ["$scope"];
        return FieldErrorDirective;
    })();
    formFor.FieldErrorDirective = FieldErrorDirective;
    angular.module('formFor').directive('fieldError', function () {
        return new FieldErrorDirective();
    });
})(formFor || (formFor = {}));
/// <reference path="../services/form-for-configuration.ts" />
var formFor;
(function (formFor) {
    var $sce_;
    var formForConfiguration_;
    /**
     * This component is only intended for internal use by the formFor module.
     *
     * @example
     * // To display a simple label with a help tooltip:
     * <field-label label="Username"
     *              help="This will be visible to other users">
     * </field-label>
     *
     * @param $sce $injector-supplied $sce service
     * @param formForConfiguration
     */
    var FieldLabelDirective = (function () {
        /* @ngInject */
        function FieldLabelDirective($sce, formForConfiguration) {
            this.replace = true; // Necessary for CSS sibling selectors
            this.restrict = 'EA';
            this.templateUrl = 'form-for/templates/field-label.html';
            this.scope = {
                inputUid: '@',
                help: '@?',
                label: '@',
                labelClass: '@?',
                required: '@?',
                uid: '@'
            };
            $sce_ = $sce;
            formForConfiguration_ = formForConfiguration;
        }
        FieldLabelDirective.$inject = ["$sce", "formForConfiguration"];
        /* @ngInject */
        FieldLabelDirective.prototype.link = function ($scope, $element, $attributes) {
            $scope.attributes = $attributes;
            $scope.helpIcon = formForConfiguration_.helpIcon;
            $scope.$watch('label', function (value) {
                $scope.bindableLabel = $sce_.trustAsHtml(value);
            });
            $scope.$watch('required', function (required) {
                $scope.requiredLabel = $scope.$eval(required) ? formForConfiguration_.requiredLabel : null;
            });
        };
        FieldLabelDirective.prototype.link.$inject = ["$scope", "$element", "$attributes"];
        return FieldLabelDirective;
    })();
    formFor.FieldLabelDirective = FieldLabelDirective;
    angular.module('formFor').directive('fieldLabel', ["$sce", "FormForConfiguration", function ($sce, FormForConfiguration) {
        return new FieldLabelDirective($sce, FormForConfiguration);
    }]);
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    var $compile_;
    var nestedObjectHelper_;
    /**
     * Automatically creates and compiles form input elements based on a {@link ViewSchema}.
     */
    var FormForBuilderDirective = (function () {
        /* @ngInject */
        function FormForBuilderDirective($compile, $parse) {
            this.require = 'formFor';
            this.restrict = 'A';
            $compile_ = $compile;
            nestedObjectHelper_ = new formFor.NestedObjectHelper($parse);
        }
        FormForBuilderDirective.$inject = ["$compile", "$parse"];
        /* @ngInject */
        FormForBuilderDirective.prototype.link = function ($scope, $element, $attributes, formForController) {
            // View schema may be explicitly passed in as a separate model,
            // Or it may be combined with the validation rules used by formFor.
            var viewSchema;
            if ($attributes.formForBuilder) {
                viewSchema = $scope.$eval($attributes.formForBuilder);
            }
            else if ($attributes.validationRules) {
                viewSchema = $scope.$eval($attributes.validationRules);
            }
            else if ($attributes.$service) {
                viewSchema = $scope.$eval($attributes.$service.validationRules);
            }
            // View schema may contain nested properties.
            // We will differentiate between form-fields and other properties using the 'inputType' field.
            var viewSchemaKeys = nestedObjectHelper_.flattenObjectKeys(viewSchema);
            var htmlString = "";
            for (var i = 0, length = viewSchemaKeys.length; i < length; i++) {
                var fieldName = viewSchemaKeys[i];
                var viewField = nestedObjectHelper_.readAttribute(viewSchema, fieldName);
                var html;
                if (viewField && viewField.hasOwnProperty('inputType')) {
                    var help = viewField.help || '';
                    var label = viewField.label || '';
                    var placeholderAttribute = '';
                    var uid = viewField.uid || '';
                    var values;
                    var labelAttribute = label ? "label=\"" + label + "\"" : '';
                    if (viewField.hasOwnProperty('placeholder')) {
                        placeholderAttribute = "placeholder=\"" + viewField.placeholder + "\"";
                    }
                    switch (viewField.inputType) {
                        case formFor.BuilderFieldType.CHECKBOX:
                            htmlString += "<checkbox-field attribute=\"" + fieldName + "\"\n                                             help=\"" + help + "\"\n                                             " + labelAttribute + "\n                                             uid=\"" + uid + "\">\n                             </checkbox-field>";
                            break;
                        case formFor.BuilderFieldType.RADIO:
                            values = JSON.stringify(viewField.values).replace(/"/g, '&quot;');
                            htmlString += "<radio-field attribute=\"" + fieldName + "\"\n                                          " + labelAttribute + "\n                                          options=\"" + values + "\"\n                                          uid=\"" + uid + "\">\n                             </radio-field>";
                            break;
                        case formFor.BuilderFieldType.SELECT:
                            values = JSON.stringify(viewField.values).replace(/"/g, '&quot;');
                            htmlString += "<select-field attribute=\"" + fieldName + "\"\n                                           " + (viewField.allowBlank ? 'allow-blank' : '') + "\n                                           " + (viewField.enableFiltering ? 'enable-filtering' : '') + "\n                                           help=\"" + help + "\"\n                                           " + labelAttribute + "\n                                           multiple=\"" + !!viewField.multipleSelection + "\"\n                                           options=\"" + values + "\"\n                                           " + placeholderAttribute + "\n                                           uid=\"" + uid + "\"\n                                           value-attribute=\"" + (viewField.valueAttribute || '') + "\">\n                             </select-field>";
                            break;
                        case formFor.BuilderFieldType.NUMBER:
                        case formFor.BuilderFieldType.PASSWORD:
                        case formFor.BuilderFieldType.TEXT:
                            var placeholderAttribute;
                            if (viewField.hasOwnProperty('placeholder')) {
                                placeholderAttribute = "placeholder=\"" + viewField.placeholder + "\"";
                            }
                            htmlString += "<text-field attribute=\"" + fieldName + "\"\n                                         " + labelAttribute + "\n                                         help=\"" + help + "\"\n                                         ng-attr-multiline=\"" + !!viewField.multiline + "\"\n                                         " + placeholderAttribute + "\n                                         rows=\"" + (viewField.rows || '') + "\"\n                                         type=\"" + viewField.inputType + "\"\n                                         uid=\"" + uid + "\">\n                             </text-field>";
                            break;
                    }
                }
            }
            // Append a submit button if one isn't already present inside of $element.
            if ($element.find('input[type=button], button, submit-button').length === 0) {
                htmlString += "<submit-button label=\"Submit\"></submit-button>";
            }
            var linkingFunction = $compile_(htmlString);
            var compiled = linkingFunction($scope, undefined, { transcludeControllers: formForController });
            // Prepend in case the user has specified their own custom submit button(s).
            $element.prepend(compiled);
        };
        FormForBuilderDirective.prototype.link.$inject = ["$scope", "$element", "$attributes", "formForController"];
        return FormForBuilderDirective;
    })();
    formFor.FormForBuilderDirective = FormForBuilderDirective;
    ;
    angular.module('formFor').directive('formForBuilder', ["$compile", "$parse", function ($compile, $parse) {
        return new FormForBuilderDirective($compile, $parse);
    }]);
})(formFor || (formFor = {}));
/// <reference path="../services/form-for-configuration.ts" />
var formFor;
(function (formFor) {
    var $log_;
    var $sniffer_;
    var $timeout_;
    var formForConfiguration_;
    /**
     * Angular introduced debouncing (via ngModelOptions) in version 1.3.
     * As of the time of this writing, that version is still in beta.
     * This component adds debouncing behavior for Angular 1.2.x.
     * It is primarily intended for use with &lt;input type=text&gt; and &lt;textarea&gt; elements.
     *
     * @example
     * // To configure this component to debounce with a 2 second delay:
     * <input type="text"
     *        ng-model="username"
     *        form-for-debounce="2000" />
     *
     * // To disable the debounce interval and configure an input to update only on blur:
     * <input type="text"
     *        ng-model="username"
     *        form-for-debounce="false" />
     */
    var FormForDebounceDirective = (function () {
        /* @ngInject */
        function FormForDebounceDirective($log, $sniffer, $timeout, formForConfiguration) {
            this.priority = 99;
            this.require = 'ngModel';
            this.restrict = 'A';
            /**
             * Scope.
             *
             * @param formForDebounce Debounce duration in milliseconds.
             *                        By default this value is 1000ms.
             *                        To disable the debounce interval (to update on blur) a value of false should be specified.
             */
            this.scope = {
                formForDebounce: '@'
            };
            $log_ = $log;
            $sniffer_ = $sniffer;
            $timeout_ = $timeout;
            formForConfiguration_ = formForConfiguration;
        }
        FormForDebounceDirective.$inject = ["$log", "$sniffer", "$timeout", "formForConfiguration"];
        /* @ngInject */
        FormForDebounceDirective.prototype.link = function ($scope, $element, $attributes, ngModelController) {
            if ($attributes['type'] === 'radio' || $attributes['type'] === 'checkbox') {
                $log_.warn("formForDebounce should only be used with <input type=text> and <textarea> elements");
                return;
            }
            var durationAttributeValue = $attributes['formForDebounce'];
            var duration = formForConfiguration_.defaultDebounceDuration;
            // Debounce can be configured for blur-only by passing a value of 'false'.
            if (durationAttributeValue !== undefined) {
                if (durationAttributeValue.toString() === 'false') {
                    duration = false;
                }
                else {
                    durationAttributeValue = parseInt(durationAttributeValue);
                    if (angular.isNumber(durationAttributeValue) && !isNaN(durationAttributeValue)) {
                        duration = durationAttributeValue;
                    }
                }
            }
            // Older IEs do not have 'input' events - and trying to access them can cause TypeErrors.
            // Angular's ngModel falls back to 'keydown' and 'paste' events in this case, so we must also.
            if ($sniffer_.hasEvent('input')) {
                $element.off('input');
            }
            else {
                $element.off('keydown');
                if ($sniffer_.hasEvent('paste')) {
                    $element.off('paste');
                }
            }
            var debounceTimeoutId;
            if (duration !== false) {
                var inputChangeHandler = function () {
                    $timeout_.cancel(debounceTimeoutId);
                    debounceTimeoutId = $timeout_(function () {
                        $scope.$apply(function () {
                            ngModelController.$setViewValue($element.val());
                        });
                    }, duration);
                };
                if ($sniffer_.hasEvent('input')) {
                    $element.on('input', inputChangeHandler);
                }
                else {
                    $element.on('keydown', inputChangeHandler);
                    if ($sniffer_.hasEvent('paste')) {
                        $element.on('paste', inputChangeHandler);
                    }
                }
            }
            $element.on('blur', function () {
                $scope.$apply(function () {
                    ngModelController.$setViewValue($element.val());
                });
            });
            $scope.$on('$destroy', function () {
                if (debounceTimeoutId) {
                    $timeout_.cancel(debounceTimeoutId);
                }
            });
        };
        FormForDebounceDirective.prototype.link.$inject = ["$scope", "$element", "$attributes", "ngModelController"];
        return FormForDebounceDirective;
    })();
    formFor.FormForDebounceDirective = FormForDebounceDirective;
    angular.module('formFor').directive('formForDebounce', ["$log", "$sniffer", "$timeout", "FormForConfiguration", function ($log, $sniffer, $timeout, FormForConfiguration) {
        return new FormForDebounceDirective($log, $sniffer, $timeout, FormForConfiguration);
    }]);
})(formFor || (formFor = {}));
/// <reference path="../../definitions/angular.d.ts" />
var formFor;
(function (formFor) {
    /**
     * Helper utility to simplify working with nested objects.
     *
     * <p>Intended for use only by formFor directive; this class is not exposed to the $injector.
     */
    var NestedObjectHelper = (function () {
        /**
         * Constructor.
         *
         * @param $parse Injector-supplied $parse service
         */
        function NestedObjectHelper($parse) {
            this.$parse_ = $parse;
        }
        /**
         * Converts a field name (which may contain dots or array indices) into a string that can be used to key an object.
         * e.g. a field name like 'items[0].name' would be converted into 'items___0______name'
         *
         * @param fieldName Attribute (or dot-notation path) to read
         * @returns Modified field name safe to use as an object key
         */
        NestedObjectHelper.prototype.flattenAttribute = function (fieldName) {
            return fieldName.replace(/\[([^\]]+)\]\.{0,1}/g, '___$1___').replace(/\./g, '___');
        };
        /**
         * Crawls an object and returns a flattened set of all attributes using dot notation.
         * This converts an Object like: {foo: {bar: true}, baz: true} into an Array like ['foo', 'foo.bar', 'baz'].
         *
         * @param object Object to be flattened
         * @returns Array of flattened keys (perhaps containing dot notation)
         */
        NestedObjectHelper.prototype.flattenObjectKeys = function (object) {
            var keys = [];
            var queue = [{
                object: object,
                prefix: null
            }];
            while (true) {
                if (queue.length === 0) {
                    break;
                }
                var data = queue.pop();
                var objectIsArray = Array.isArray(data.object);
                var prefix = data.prefix ? data.prefix + (objectIsArray ? '[' : '.') : '';
                var suffix = objectIsArray ? ']' : '';
                if (typeof data.object === 'object') {
                    for (var prop in data.object) {
                        var path = prefix + prop + suffix;
                        var value = data.object[prop];
                        keys.push(path);
                        queue.push({
                            object: value,
                            prefix: path
                        });
                    }
                }
            }
            return keys;
        };
        /**
         * Returns the value defined by the specified attribute.
         * This function guards against dot notation for nested references (ex. 'foo.bar').
         *
         * @param object Object ot be read
         * @param fieldName Attribute (or dot-notation path) to read
         * @returns Value defined at the specified key
         */
        NestedObjectHelper.prototype.readAttribute = function (object, fieldName) {
            return this.$parse_(fieldName)(object);
        };
        /**
         * Writes the specified value to the specified attribute.
         * This function guards against dot notation for nested references (ex. 'foo.bar').
         *
         * @param object Object ot be updated
         * @param fieldName Attribute (or dot-notation path) to update
         * @param value Value to be written
         */
        NestedObjectHelper.prototype.writeAttribute = function (object, fieldName, value) {
            this.initializeArraysAndObjectsForParse_(object, fieldName);
            this.$parse_(fieldName).assign(object, value);
        };
        // Helper methods ////////////////////////////////////////////////////////////////////////////////////////////////////
        // For Angular 1.2.21 and below, $parse does not handle array brackets gracefully.
        // Essentially we need to create Arrays that don't exist yet or objects within array indices that don't yet exist.
        // @see https://github.com/angular/angular.js/issues/2845
        NestedObjectHelper.prototype.initializeArraysAndObjectsForParse_ = function (object, attribute) {
            var startOfArray = 0;
            while (true) {
                startOfArray = attribute.indexOf('[', startOfArray);
                if (startOfArray < 0) {
                    break;
                }
                var arrayAttribute = attribute.substr(0, startOfArray);
                var possibleArray = this.readAttribute(object, arrayAttribute);
                // Create the Array if it doesn't yet exist
                if (!possibleArray) {
                    possibleArray = [];
                    this.writeAttribute(object, arrayAttribute, possibleArray);
                }
                // Create an empty Object in the Array if the user is about to write to one (and one does not yet exist)
                var match = attribute.substr(startOfArray).match(/([0-9]+)\]\./);
                if (match) {
                    var targetIndex = parseInt(match[1]);
                    if (!possibleArray[targetIndex]) {
                        possibleArray[targetIndex] = {};
                    }
                }
                // Increment and keep scanning
                startOfArray++;
            }
        };
        return NestedObjectHelper;
    })();
    formFor.NestedObjectHelper = NestedObjectHelper;
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    /**
     * Supplies $q service with additional methods.
     *
     * <p>Intended for use only by formFor directive; this class is not exposed to the $injector.
     */
    var PromiseUtils = (function () {
        /**
         * Constructor.
         *
         * @param $q Injector-supplied $q service
         */
        function PromiseUtils($q) {
            this.$q_ = $q;
        }
        /**
         * @inheritDoc
         */
        PromiseUtils.prototype.all = function (promises) {
            return this.$q_.all(promises);
        };
        /**
         * @inheritDoc
         */
        PromiseUtils.prototype.defer = function () {
            return this.$q_.defer();
        };
        /**
         * Similar to $q.reject, this is a convenience method to create and resolve a Promise.
         *
         * @param data Value to resolve the promise with
         * @returns A resolved promise
         */
        PromiseUtils.prototype.resolve = function (data) {
            var deferred = this.$q_.defer();
            deferred.resolve(data);
            return deferred.promise;
        };
        /**
         * @inheritDoc
         */
        PromiseUtils.prototype.reject = function (reason) {
            return this.$q_.reject(reason);
        };
        /**
         * Similar to $q.all but waits for all promises to resolve/reject before resolving/rejecting.
         *
         * @param promises Array of Promises
         * @returns A promise to be resolved or rejected once all of the observed promises complete
         */
        PromiseUtils.prototype.waitForAll = function (promises) {
            var deferred = this.$q_.defer();
            var results = {};
            var counter = 0;
            var errored = false;
            function updateResult(key, data) {
                if (!results.hasOwnProperty(key)) {
                    results[key] = data;
                    counter--;
                }
                checkForDone();
            }
            function checkForDone() {
                if (counter === 0) {
                    if (errored) {
                        deferred.reject(results);
                    }
                    else {
                        deferred.resolve(results);
                    }
                }
            }
            angular.forEach(promises, function (promise, key) {
                counter++;
                promise.then(function (data) {
                    updateResult(key, data);
                }, function (data) {
                    errored = true;
                    updateResult(key, data);
                });
            });
            checkForDone(); // Handle empty Array
            return deferred.promise;
        };
        /**
         * @inheritDoc
         */
        PromiseUtils.prototype.when = function (value) {
            return this.$q_.when(value);
        };
        return PromiseUtils;
    })();
    formFor.PromiseUtils = PromiseUtils;
})(formFor || (formFor = {}));
/// <reference path="../utils/nested-object-helper.ts" />
/// <reference path="../utils/promise-utils.ts" />
var formFor;
(function (formFor) {
    /**
     * Controller exposed via the FormFor directive's scope.
     *
     * <p>Intended for use only by formFor directive and fields (children); this class is not exposed to the $injector.
     *
     * @param target Object to attach controller methods to
     * @param $parse Injector-supplied $parse service
     * @param $q Injector-supplied $q service
     * @param $scope formFor directive $scope
     * @param modelValidator ModelValidator service
     * @param formForConfiguration
     */
    function createFormForController(target, $parse, $q, $scope, modelValidator, formForConfiguration) {
        var nestedObjectHelper = new formFor.NestedObjectHelper($parse);
        var promiseUtils = new formFor.PromiseUtils($q);
        /**
         * @inheritDocs
         */
        target.registerCollectionLabel = function (fieldName) {
            var bindableFieldName = nestedObjectHelper.flattenAttribute(fieldName);
            var bindableWrapper = {
                error: null,
                required: modelValidator.isCollectionRequired(fieldName, $scope.$validationRuleset)
            };
            $scope.collectionLabels[bindableFieldName] = bindableWrapper;
            var watcherInitialized = false;
            $scope.$watch('formFor.' + fieldName + '.length', function () {
                // The initial $watch should not trigger a visible validation...
                if (!watcherInitialized) {
                    watcherInitialized = true;
                }
                else if (!$scope.validateOn || $scope.validateOn === 'change') {
                    modelValidator.validateCollection($scope.formFor, fieldName, $scope.$validationRuleset).then(function () {
                        $scope.formForStateHelper.setFieldError(bindableFieldName, null);
                    }, function (error) {
                        $scope.formForStateHelper.setFieldError(bindableFieldName, error);
                    });
                }
            });
            return bindableWrapper;
        };
        /**
         * @inheritDocs
         */
        target.registerFormField = function (fieldName) {
            if (!fieldName) {
                throw Error('Invalid field name "' + fieldName + '" provided.');
            }
            var bindableFieldName = nestedObjectHelper.flattenAttribute(fieldName);
            if ($scope['fields'].hasOwnProperty(bindableFieldName)) {
                throw Error('Field "' + fieldName + '" has already been registered. Field names must be unique.');
            }
            var bindableFieldWrapper = {
                bindable: null,
                disabled: $scope.disable,
                error: null,
                pristine: true,
                required: modelValidator.isFieldRequired(fieldName, $scope.$validationRuleset),
                uid: formFor.FormForGUID.create()
            };
            // Store information about this field that we'll need for validation and binding purposes.
            // @see Above documentation for $scope.fields
            var fieldDatum = {
                bindableWrapper: bindableFieldWrapper,
                fieldName: fieldName,
                formForStateHelper: $scope.formForStateHelper,
                unwatchers: []
            };
            $scope.fields[bindableFieldName] = fieldDatum;
            var getter = $parse(fieldName);
            var setter = getter.assign;
            // Changes made by our field should be synced back to the form-data model.
            fieldDatum.unwatchers.push($scope.$watch('fields.' + bindableFieldName + '.bindableWrapper.bindable', function (newValue, oldValue) {
                // Don't update the value unless it changes; (this prevents us from wiping out the default model value).
                if (newValue || newValue != oldValue) {
                    if (formForConfiguration.autoTrimValues && typeof newValue == 'string') {
                        newValue = newValue.trim();
                    }
                    // Keep the form data object and our bindable wrapper in-sync
                    setter($scope.formFor, newValue);
                }
            }));
            var formDataWatcherInitialized;
            // Changes made to the form-data model should likewise be synced to the field's bindable model.
            // (This is necessary for data that is loaded asynchronously after a form has already been displayed.)
            fieldDatum.unwatchers.push($scope.$watch('formFor.' + fieldName, function (newValue, oldValue) {
                // An asynchronous formFor data source should reset any dirty flags.
                // A user tabbing in and out of a field also shouldn't be counted as dirty.
                // Easiest way to guard against this is to reset the initialization flag.
                if (newValue !== fieldDatum.bindableWrapper.bindable || oldValue === undefined && newValue === '' || newValue === undefined) {
                    formDataWatcherInitialized = false;
                }
                fieldDatum.bindableWrapper.bindable = newValue;
                if (!$scope.validateOn || $scope.validateOn === 'change') {
                    target.validateField(fieldName);
                }
                // Changes in form-data should also trigger validations.
                // Validation failures will not be displayed unless the form-field has been marked dirty (changed by user).
                // We shouldn't mark our field as dirty when Angular auto-invokes the initial watcher though,
                // So we ignore the first invocation...
                if (!formDataWatcherInitialized) {
                    formDataWatcherInitialized = true;
                    $scope.formForStateHelper.setFieldHasBeenModified(bindableFieldName, false);
                }
                fieldDatum.bindableWrapper.pristine = !$scope.formForStateHelper.hasFieldBeenModified(bindableFieldName);
            }));
            return bindableFieldWrapper;
        };
        /**
         * @inheritDocs
         */
        target.registerSubmitButton = function (submitButtonScope) {
            var bindableWrapper = {
                disabled: false
            };
            $scope.buttons.push(bindableWrapper);
            return bindableWrapper;
        };
        /**
         * @inheritDocs
         */
        target.resetErrors = function () {
            for (var bindableFieldName in $scope.fields) {
                // If the field is invalid, we don't want it to appear valid- just pristing.
                if ($scope.formForStateHelper.getFieldError(bindableFieldName)) {
                    $scope.formForStateHelper.setFieldHasBeenModified(bindableFieldName, false);
                    $scope.fields[bindableFieldName].bindableWrapper.pristine = true;
                }
            }
            $scope.formForStateHelper.setFormSubmitted(false);
            $scope.formForStateHelper.resetFieldErrors();
        };
        /**
         * @inheritDocs
         */
        target.resetField = function (fieldName) {
            var bindableFieldName = nestedObjectHelper.flattenAttribute(fieldName);
            // If the field is invalid, we don't want it to appear valid- just pristing.
            if ($scope.formForStateHelper.getFieldError(bindableFieldName)) {
                $scope.formForStateHelper.setFieldHasBeenModified(bindableFieldName, false);
                $scope.fields[bindableFieldName].bindableWrapper.pristine = true;
            }
            $scope.formForStateHelper.setFieldError(bindableFieldName, null);
        };
        /**
         * @inheritDocs
         */
        target.resetFields = function () {
            target.resetErrors();
        };
        /**
         * @inheritDocs
         */
        target.setFieldError = function (fieldName, error) {
            var bindableFieldName = nestedObjectHelper.flattenAttribute(fieldName);
            $scope.formForStateHelper.setFieldHasBeenModified(bindableFieldName, true);
            $scope.formForStateHelper.setFieldError(bindableFieldName, error);
        };
        /**
         * @inheritDocs
         */
        target.unregisterFormField = function (fieldName) {
            var bindableFieldName = nestedObjectHelper.flattenAttribute(fieldName);
            angular.forEach($scope.fields[bindableFieldName].unwatchers, function (unwatch) {
                unwatch();
            });
            delete $scope.fields[bindableFieldName];
        };
        /**
         * @inheritDocs
         */
        target.updateCollectionErrors = function (fieldNameToErrorMap) {
            angular.forEach($scope.collectionLabels, function (bindableWrapper, bindableFieldName) {
                var error = nestedObjectHelper.readAttribute(fieldNameToErrorMap, bindableFieldName);
                $scope.formForStateHelper.setFieldError(bindableFieldName, error);
            });
        };
        /**
         * @inheritDocs
         */
        target.updateFieldErrors = function (fieldNameToErrorMap) {
            angular.forEach($scope.fields, function (scope, bindableFieldName) {
                var error = nestedObjectHelper.readAttribute(fieldNameToErrorMap, scope.fieldName);
                $scope.formForStateHelper.setFieldError(bindableFieldName, error);
            });
        };
        /**
         * @inheritDocs
         */
        target.validateField = function (fieldName) {
            var bindableFieldName = nestedObjectHelper.flattenAttribute(fieldName);
            $scope.formForStateHelper.setFieldHasBeenModified(bindableFieldName, true);
            // Run validations and store the result keyed by our bindableFieldName for easier subsequent lookup.
            if ($scope.$validationRuleset) {
                modelValidator.validateField($scope.formFor, fieldName, $scope.$validationRuleset).then(function () {
                    $scope.formForStateHelper.setFieldError(bindableFieldName, null);
                }, function (error) {
                    $scope.formForStateHelper.setFieldError(bindableFieldName, error);
                });
            }
        };
        /**
         * @inheritDocs
         */
        target.validateForm = function (showErrors) {
            // Reset errors before starting new validation.
            target.updateCollectionErrors({});
            target.updateFieldErrors({});
            var validateCollectionsPromise;
            var validateFieldsPromise;
            if ($scope.$validationRuleset) {
                var validationKeys = [];
                angular.forEach($scope.fields, function (fieldDatum) {
                    validationKeys.push(fieldDatum.fieldName);
                });
                validateFieldsPromise = modelValidator.validateFields($scope.formFor, validationKeys, $scope.$validationRuleset);
                validateFieldsPromise.then(angular.noop, target.updateFieldErrors);
                validationKeys = []; // Reset for below re-use
                angular.forEach($scope.collectionLabels, function (bindableWrapper, bindableFieldName) {
                    validationKeys.push(bindableFieldName);
                });
                validateCollectionsPromise = modelValidator.validateFields($scope.formFor, validationKeys, $scope.$validationRuleset);
                validateCollectionsPromise.then(angular.noop, target.updateCollectionErrors);
            }
            else {
                validateCollectionsPromise = promiseUtils.resolve();
                validateFieldsPromise = promiseUtils.resolve();
            }
            var deferred = promiseUtils.defer();
            promiseUtils.waitForAll([validateCollectionsPromise, validateFieldsPromise]).then(deferred.resolve, function (errors) {
                // If all collections are valid (or no collections exist) this will be an empty array.
                if (angular.isArray(errors[0]) && errors[0].length === 0) {
                    errors.splice(0, 1);
                }
                // Errors won't be shown for clean fields, so mark errored fields as dirty.
                if (showErrors) {
                    angular.forEach(errors, function (errorObjectOrArray) {
                        var flattenedFields = nestedObjectHelper.flattenObjectKeys(errorObjectOrArray);
                        angular.forEach(flattenedFields, function (fieldName) {
                            var error = nestedObjectHelper.readAttribute(errorObjectOrArray, fieldName);
                            if (error) {
                                var bindableFieldName = nestedObjectHelper.flattenAttribute(fieldName);
                                $scope.formForStateHelper.setFieldHasBeenModified(bindableFieldName, true);
                            }
                        });
                    });
                }
                deferred.reject(errors);
            });
            return deferred.promise;
        };
        return target;
    }
    formFor.createFormForController = createFormForController;
})(formFor || (formFor = {}));
/// <reference path="../utils/form-for-controller.ts" />
/// <reference path="../utils/promise-utils.ts" />
var formFor;
(function (formFor) {
    var $injector_;
    var $log_;
    var $parse_;
    var $sce_;
    var formForConfiguration_;
    var modelValidator_;
    var promiseUtils_;
    /**
     * This directive should be paired with an Angular ngForm object,
     * and should contain at least one of the formFor field types described below.
     * At a high level, it operates on a bindable form-data object and runs validations each time a change is detected.
     */
    var FormForDirective = (function () {
        /* @ngInject */
        function FormForDirective($injector) {
            // We don't need the ngForm controller, but we do rely on the form-submit hook
            this.require = 'form';
            this.restrict = 'A';
            this.scope = {
                controller: '=?',
                disable: '=?',
                formFor: '=',
                service: '@',
                submitComplete: '&?',
                submitError: '&?',
                submitWith: '&?',
                valid: '=?',
                validateOn: '=?',
                validationFailed: '&?',
                validationRules: '=?'
            };
            $injector_ = $injector;
            $log_ = $injector.get('$log');
            $parse_ = $injector.get('$parse');
            $sce_ = $injector.get('$sce');
            formForConfiguration_ = $injector.get('FormForConfiguration');
            modelValidator_ = $injector.get('ModelValidator');
            promiseUtils_ = new formFor.PromiseUtils($injector.get('$q'));
        }
        FormForDirective.$inject = ["$injector"];
        /* @ngInject */
        FormForDirective.prototype.controller = function ($scope) {
            if (!$scope.formFor) {
                $log_.error('The form data object specified by <form form-for=""> is null or undefined.');
            }
            $scope.fields = {};
            $scope.collectionLabels = {};
            $scope.buttons = [];
            $scope.controller = $scope.controller || {};
            if ($scope.service) {
                $scope.$service = $injector_.get($scope.service);
            }
            // Validation rules can come through 2 ways:
            // As part of the validation service or as a direct binding (specified via an HTML attribute binding).
            if ($scope.validationRules) {
                $scope.$validationRuleset = $scope.validationRules;
            }
            else if ($scope.$service) {
                $scope.$validationRuleset = $scope.$service.validationRules;
            }
            // Attach FormForController (interface) methods to the directive's controller (this).
            formFor.createFormForController(this, $parse_, promiseUtils_, $scope, modelValidator_, formForConfiguration_);
            // Expose controller methods to the shared, bindable $scope.controller
            if ($scope.controller) {
                angular.copy(this, $scope.controller);
            }
            // Disable all child inputs if the form becomes disabled.
            $scope.$watch('disable', function (value) {
                angular.forEach($scope.fields, function (fieldDatum) {
                    fieldDatum.bindableWrapper.disabled = value;
                });
                angular.forEach($scope.buttons, function (buttonWrapper) {
                    buttonWrapper.disabled = value;
                });
            });
            // Track field validity and dirty state.
            $scope.formForStateHelper = new formFor.FormForStateHelper($parse_, $scope);
            // Watch for any validation changes or changes in form-state that require us to notify the user.
            // Rather than using a deep-watch, FormForStateHelper exposes a bindable attribute 'watchable'.
            // This attribute is guaranteed to change whenever validation criteria change (but its value is meaningless).
            $scope.$watch('formForStateHelper.watchable', function () {
                var hasFormBeenSubmitted = $scope.formForStateHelper.hasFormBeenSubmitted();
                // Mark invalid fields
                angular.forEach($scope.fields, function (fieldDatum, bindableFieldName) {
                    if (hasFormBeenSubmitted || $scope.formForStateHelper.hasFieldBeenModified(bindableFieldName)) {
                        var error = $scope.formForStateHelper.getFieldError(bindableFieldName);
                        fieldDatum.bindableWrapper.error = error ? $sce_.trustAsHtml(error) : null;
                    }
                    else {
                        fieldDatum.bindableWrapper.error = null; // Clear out field errors in the event that the form has been reset
                    }
                });
                // Mark invalid collections
                angular.forEach($scope.collectionLabels, function (bindableWrapper, bindableFieldName) {
                    var error = $scope.formForStateHelper.getFieldError(bindableFieldName);
                    bindableWrapper.error = error ? $sce_.trustAsHtml(error) : null;
                });
            });
        };
        FormForDirective.prototype.controller.$inject = ["$scope"];
        /* @ngInject */
        FormForDirective.prototype.link = function ($scope, $element, $attributes) {
            $element.on('submit', function () {
                $scope.formForStateHelper.setFormSubmitted(true);
                $scope.disable = true;
                var validationPromise;
                // By default formFor validates on-change,
                // But we need to [re-]validate on submit as well to handle pristine fields.
                // The only case we don't want to validate for is 'manual'.
                if ($scope.validateOn === 'manual') {
                    validationPromise = promiseUtils_.resolve();
                }
                else {
                    validationPromise = $scope.controller.validateForm();
                }
                validationPromise.then(function () {
                    var promise;
                    // $scope.submitWith is wrapped with a virtual function so we must check via attributes
                    if ($attributes['submitWith']) {
                        promise = $scope.submitWith({ data: $scope.formFor });
                    }
                    else if ($scope.$service && $scope.$service.submit) {
                        promise = $scope.$service.submit($scope.formFor);
                    }
                    else {
                        promise = promiseUtils_.reject('No submit function provided');
                    }
                    // Issue #18 Guard against submit functions that don't return a promise by warning rather than erroring.
                    if (!promise) {
                        promise = promiseUtils_.reject('Submit function did not return a promise');
                    }
                    promise.then(function (response) {
                        // $scope.submitComplete is wrapped with a virtual function so we must check via attributes
                        if ($attributes['submitComplete']) {
                            $scope.submitComplete({ data: response });
                        }
                        else {
                            formForConfiguration_.defaultSubmitComplete(response, $scope.controller);
                        }
                    }, function (errorMessageOrErrorMap) {
                        // If the remote response returned inline-errors update our error map.
                        // This is unecessary if a string was returned.
                        if (angular.isObject(errorMessageOrErrorMap)) {
                            if ($scope.validateOn !== 'manual') {
                                // TODO Questionable: Maybe server should be forced to return fields/collections constraints?
                                $scope.controller.updateCollectionErrors(errorMessageOrErrorMap);
                                $scope.controller.updateFieldErrors(errorMessageOrErrorMap);
                            }
                        }
                        // $scope.submitError is wrapped with a virtual function so we must check via attributes
                        if ($attributes['submitError']) {
                            $scope.submitError({ error: errorMessageOrErrorMap });
                        }
                        else {
                            formForConfiguration_.defaultSubmitError(errorMessageOrErrorMap, $scope.controller);
                        }
                    });
                    promise['finally'](function () {
                        $scope.disable = false;
                    });
                }, function (reason) {
                    $scope.disable = false;
                    // $scope.validationFailed is wrapped with a virtual function so we must check via attributes
                    if ($attributes['validationFailed']) {
                        $scope.validationFailed();
                    }
                    else {
                        formForConfiguration_.defaultValidationFailed(reason);
                    }
                });
                return false;
            });
        };
        FormForDirective.prototype.link.$inject = ["$scope", "$element", "$attributes"];
        return FormForDirective;
    })();
    formFor.FormForDirective = FormForDirective;
    angular.module('formFor').directive('formFor', ["$injector", function ($injector) {
        return new FormForDirective($injector);
    }]);
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    /**
     * UID generator for formFor input fields.
     * @see http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
     *
     * <p>Intended for use only by formFor directive; this class is not exposed to the $injector.
     */
    var FormForGUID = (function () {
        function FormForGUID() {
        }
        /**
         * Create a new GUID.
         */
        FormForGUID.create = function () {
            return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
        };
        return FormForGUID;
    })();
    formFor.FormForGUID = FormForGUID;
})(formFor || (formFor = {}));
/// <reference path="../services/field-helper.ts" />
/// <reference path="../services/form-for-configuration.ts" />
/// <reference path="../utils/form-for-guid.ts" />
var formFor;
(function (formFor) {
    var $sce_;
    var $log_;
    var fieldHelper_;
    /**
     * Renders a radio &lt;input&gt; with optional label.
     * This type of component is well-suited for small enumerations.
     *
     * @example
     * // To render a radio group for gender selection you might use the following markup:
     * <radio-field label="Female" attribute="gender" value="f"></radio-field>
     * <radio-field label="Male" attribute="gender" value="m"></radio-field>
     *
     * @param $sce $injector-supplied $sce service
     * @param $log $injector-supplied $log service
     * @param FormForConfiguration
     */
    var RadioFieldDirective = (function () {
        /* @ngInject */
        function RadioFieldDirective($sce, $log, FormForConfiguration) {
            this.require = '^formFor';
            this.restrict = 'EA';
            this.templateUrl = 'form-for/templates/radio-field.html';
            this.scope = {
                attribute: '@',
                disable: '=',
                help: '@?',
                options: '=',
                value: '@'
            };
            fieldHelper_ = new formFor.FieldHelper(FormForConfiguration);
            $sce_ = $sce;
            $log_ = $log;
        }
        RadioFieldDirective.$inject = ["$sce", "$log", "FormForConfiguration"];
        /* @ngInject */
        RadioFieldDirective.prototype.link = function ($scope, $element, $attributes, formForController) {
            if (!$scope.attribute) {
                $log_.error('Missing required field "attribute"');
                return;
            }
            // Read from $attributes to avoid getting any interference from $scope.
            $scope.labelAttribute = $attributes['labelAttribute'] || 'label';
            $scope.valueAttribute = $attributes['valueAttribute'] || 'value';
            fieldHelper_.manageFieldRegistration($scope, $attributes, formForController);
            // Everything inside of  $scope.model pertains to the first <input type="radio"> for this attribute/name.
            // In order for our view's aria-* and label-for tags to function properly, we need a unique uid for this instance.
            $scope.uid = $attributes['uid'] || formFor.FormForGUID.create();
            fieldHelper_.manageLabel($scope, $attributes, true);
            $scope.tabIndex = $attributes['tabIndex'] || 0;
            $scope.click = function () {
                if (!$scope.disable && !$scope.model.disabled) {
                }
            };
            $scope.$watch('options', function (options) {
                options.forEach(function (option) {
                    if (!angular.isObject(option[$scope.labelAttribute]))
                        option[$scope.labelAttribute] = $sce_.trustAsHtml(option[$scope.labelAttribute]);
                });
            }, true);
            $scope.$watch('model', function (value) {
                $scope.model = value;
            });
            $scope.$watch('disable', function (value) {
                $scope.disable = value;
            });
            $scope.$watch('model.disabled', function (value) {
                if ($scope.model) {
                    $scope.model.disabled = value;
                }
            });
            /**
             * Update this RadioField (UI) whenever the group's value changes.
             * This could be triggered by another RadioField in the group.
            $scope.$watch('model.bindable', function(newValue:any) {
              $scope.checked =
                newValue !== undefined &&
                newValue !== null &&
                newValue.toString() === $scope.value.toString();
            });
             */
        };
        RadioFieldDirective.prototype.link.$inject = ["$scope", "$element", "$attributes", "formForController"];
        return RadioFieldDirective;
    })();
    formFor.RadioFieldDirective = RadioFieldDirective;
    angular.module('formFor').directive('radioField', ["$sce", "$log", "FormForConfiguration", function ($sce, $log, FormForConfiguration) {
        return new RadioFieldDirective($sce, $log, FormForConfiguration);
    }]);
})(formFor || (formFor = {}));
/// <reference path="../services/field-helper.ts" />
var formFor;
(function (formFor) {
    var MIN_TIMEOUT_INTERVAL = 10;
    var $document_;
    var $log_;
    var $timeout_;
    var fieldHelper_;
    var formForConfiguration_;
    /**
     * Renders a drop-down &lt;select&gt; menu along with an input label.
     * This type of component works with large enumerations and can be configured to allow for a blank/empty selection
     * by way of an allow-blank attribute.
     *
     * The following HTML attributes are supported by this directive:
     * <ul>
     * <li>allow-blank: The presence of this attribute indicates that an empty/blank selection should be allowed.
     * <li>prevent-default-option: Optional attribute to override default selection of the first list option.
     *       Without this attribute, lists with `allow-blank` will default select the first option in the options array.
     *</ul>
     *
     * @example
     * // To use this component you'll first need to define a set of options. For instance:
     * $scope.genders = [
     *   { value: 'f', label: 'Female' },
     *   { value: 'm', label: 'Male' }
     * ];
     *
     * // To render a drop-down input using the above options:
     * <select-field attribute="gender"
     *               label="Gender"
     *               options="genders">
     * </select-field>
     *
     * // If you want to make this attribute optional you can use the allow-blank attribute as follows:
     * <select-field attribute="gender"
     *               label="Gender"
     *               options="genders"
     *               allow-blank>
     * </select-field>
     *
     * @param $document $injector-supplied $document service
     * @param $log $injector-supplied $log service
     * @param $timeout $injector-supplied $timeout service
     * @param fieldHelper
     * @param formForConfiguration
     */
    var SelectFieldDirective = (function () {
        /* @ngInject */
        function SelectFieldDirective($document, $log, $timeout, fieldHelper, formForConfiguration) {
            this.require = '^formFor';
            this.restrict = 'EA';
            this.templateUrl = 'form-for/templates/select-field.html';
            this.scope = {
                attribute: '@',
                disable: '=',
                help: '@?',
                multiple: '=?',
                options: '='
            };
            $document_ = $document;
            $log_ = $log;
            $timeout_ = $timeout;
            fieldHelper_ = fieldHelper;
            formForConfiguration_ = formForConfiguration;
        }
        SelectFieldDirective.$inject = ["$document", "$log", "$timeout", "fieldHelper", "formForConfiguration"];
        /* @ngInject */
        SelectFieldDirective.prototype.link = function ($scope, $element, $attributes, formForController) {
            if (!$scope.attribute) {
                $log_.error('Missing required field "attribute"');
                return;
            }
            $scope.allowBlank = $attributes.hasOwnProperty('allowBlank');
            $scope.preventDefaultOption = $attributes.hasOwnProperty('preventDefaultOption');
            // Read from $attributes to avoid getting any interference from $scope.
            $scope.labelAttribute = $attributes['labelAttribute'] || 'label';
            $scope.valueAttribute = $attributes['valueAttribute'] || 'value';
            $scope.placeholder = $attributes.hasOwnProperty('placeholder') ? $attributes['placeholder'] : 'Select';
            $scope.tabIndex = $attributes['tabIndex'] || 0;
            $scope.scopeBuster = {};
            fieldHelper_.manageLabel($scope, $attributes, false);
            fieldHelper_.manageFieldRegistration($scope, $attributes, formForController);
            $scope.close = function () {
                $timeout_(function () {
                    $scope.isOpen = false;
                });
            };
            $scope.open = function () {
                if ($scope.disable || $scope.model.disabled) {
                    return;
                }
                $timeout_(function () {
                    $scope.isOpen = true;
                });
            };
            $scope.bindableOptions = [];
            $scope.emptyOption = {};
            $scope.emptyOption[$scope.labelAttribute] = $scope.placeholder;
            $scope.emptyOption[$scope.valueAttribute] = formForConfiguration_.defaultSelectEmptyOptionValue;
            /*****************************************************************************************
             * The following code manages setting the correct default value based on bindable model.
             *****************************************************************************************/
            $scope.selectOption = function (option) {
                $scope.model.bindable = option && option[$scope.valueAttribute];
            };
            var updateDefaultOption = function () {
                var numOptions = $scope.options && $scope.options.length;
                // Default select the first item in the list
                // Do not do this if a blank option is allowed OR if the user has explicitly disabled this function
                if (!$scope.model.bindable && !$scope.allowBlank && !$scope.preventDefaultOption && numOptions) {
                    $scope.selectOption($scope.options[0]);
                }
                // Certain falsy values may indicate a non-selection.
                // In this case, the placeholder (empty) option needs to match the falsy selected value,
                // Otherwise the Angular select directive will generate an additional empty <option> ~ see #110
                // Angular 1.2.x-1.3.x may generate an empty <option> regardless, unless the non-selection is undefined.
                if ($scope.model.bindable === null || $scope.model.bindable === undefined || $scope.model.bindable === '') {
                    // Rather than sanitizing `$scope.model.bindable` to undefined, update the empty option's value.
                    // This way users are able to choose between undefined, null, and empty string ~ see #141
                    $scope.model.bindable = formForConfiguration_.defaultSelectEmptyOptionValue;
                    $scope.emptyOption[$scope.valueAttribute] = $scope.model.bindable;
                }
                $scope.bindableOptions.splice(0);
                if (!$scope.model.bindable || $scope.allowBlank) {
                    $scope.bindableOptions.push($scope.emptyOption);
                }
                $scope.bindableOptions.push.apply($scope.bindableOptions, $scope.options);
                // Once a value has been selected, clear the placeholder prompt.
                if ($scope.model.bindable) {
                    $scope.emptyOption[$scope.labelAttribute] = '';
                }
            };
            // Allow the current $digest cycle (if we're in one) to complete so that the FormForController has a chance to set
            // the bindable model attribute to that of the external formData field. This way we won't overwrite the default
            // value with one of our own.
            $timeout_(function () {
                $scope.$watch('model.bindable', updateDefaultOption);
                $scope.$watch('options.length', updateDefaultOption);
            });
            /*****************************************************************************************
             * The following code deals with toggling/collapsing the drop-down and selecting values.
             *****************************************************************************************/
            var documentClick = function (event) {
                $scope.close();
            };
            var pendingTimeoutId;
            $scope.$watch('isOpen', function () {
                if (pendingTimeoutId) {
                    $timeout_.cancel(pendingTimeoutId);
                }
                pendingTimeoutId = $timeout_(function () {
                    pendingTimeoutId = null;
                    if ($scope.isOpen) {
                        $document_.on('click', documentClick);
                    }
                    else {
                        $document_.off('click', documentClick);
                    }
                }, MIN_TIMEOUT_INTERVAL);
            });
            $scope.$on('$destroy', function () {
                $document_.off('click', documentClick);
            });
            /*****************************************************************************************
             * The following code responds to keyboard events when the drop-down is visible
             *****************************************************************************************/
            $scope.mouseOver = function (index) {
                $scope.mouseOverIndex = index;
                $scope.mouseOverOption = index >= 0 ? $scope.options[index] : null;
            };
            // Listen to key down, not up, because ENTER key sometimes gets converted into a click event.
            $scope.keyDown = function (event) {
                switch (event.keyCode) {
                    case 27:
                        $scope.close();
                        break;
                    case 13:
                        if ($scope.isOpen) {
                            $scope.selectOption($scope.mouseOverOption);
                            $scope.close();
                        }
                        else {
                            $scope.open();
                        }
                        event.preventDefault();
                        break;
                    case 38:
                        if ($scope.isOpen) {
                            $scope.mouseOver($scope.mouseOverIndex > 0 ? $scope.mouseOverIndex - 1 : $scope.options.length - 1);
                        }
                        else {
                            $scope.open();
                        }
                        break;
                    case 40:
                        if ($scope.isOpen) {
                            $scope.mouseOver($scope.mouseOverIndex < $scope.options.length - 1 ? $scope.mouseOverIndex + 1 : 0);
                        }
                        else {
                            $scope.open();
                        }
                        break;
                    case 9:
                    case 16:
                        $scope.close();
                        break;
                    default:
                        $scope.open();
                        break;
                }
            };
        };
        SelectFieldDirective.prototype.link.$inject = ["$scope", "$element", "$attributes", "formForController"];
        return SelectFieldDirective;
    })();
    formFor.SelectFieldDirective = SelectFieldDirective;
    angular.module('formFor').directive('selectField', ["$document", "$log", "$timeout", "FieldHelper", "FormForConfiguration", function ($document, $log, $timeout, FieldHelper, FormForConfiguration) {
        return new SelectFieldDirective($document, $log, $timeout, FieldHelper, FormForConfiguration);
    }]);
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    var $sce_;
    /**
     * Displays a submit &lt;button&gt; component that is automatically disabled when a form is invalid or in the process of submitting.
     *
     * @example
     * // Here is a simple submit button with an icon:
     * <submit-button label="Sign Up" icon="fa fa-user"></submit-button>
     *
     * // You can use your own <button> components within a formFor as well.
     * // If you choose to you must register your button with formFor's controller using registerSubmitButton().
     * // This method returns a model with a bindable 'disabled' attribute that your button should use like so:
     * <form form-for="formData">
     *   <button ng-disabled="model.disabled">Submit</button>
     * </form>
     *
     * @param $sce $injector-supplied $sce service
     */
    var SubmitButtonDirective = (function () {
        /* @ngInject */
        function SubmitButtonDirective($sce) {
            this.require = '^formFor';
            this.restrict = 'EA';
            this.templateUrl = 'form-for/templates/submit-button.html';
            this.scope = {
                disable: '=',
                buttonClass: '@',
                icon: '@',
                label: '@'
            };
            $sce_ = $sce;
        }
        SubmitButtonDirective.$inject = ["$sce"];
        /* @ngInject */
        SubmitButtonDirective.prototype.link = function ($scope, $element, $attributes, formForController) {
            $scope.tabIndex = $attributes['tabIndex'] || 0;
            $scope.$watch('label', function (value) {
                $scope.bindableLabel = $sce_.trustAsHtml(value);
            });
            $scope.model = formForController.registerSubmitButton($scope);
        };
        SubmitButtonDirective.prototype.link.$inject = ["$scope", "$element", "$attributes", "formForController"];
        return SubmitButtonDirective;
    })();
    formFor.SubmitButtonDirective = SubmitButtonDirective;
    angular.module('formFor').directive('submitButton', ["$sce", function ($sce) {
        return new SubmitButtonDirective($sce);
    }]);
})(formFor || (formFor = {}));
/// <reference path="../services/field-helper.ts" />
var formFor;
(function (formFor) {
    var $log_;
    var $timeout_;
    var fieldHelper_;
    /**
     * Displays an HTML &lt;input&gt; or &lt;textarea&gt; element along with an optional label.
     *
     * <p>The HTML &lt;input&gt; type can be configured to allow for passwords, numbers, etc.
     * This directive can also be configured to display an informational tooltip.
     * In the event of a validation error, this directive will also render an inline error message.
     *
     * <p>This directive supports the following HTML attributes in addition to its scope properties:
     *
     * <ul>
     *   <li>autofocus: The presence of this attribute will auto-focus the input field.
     *   <li>multiline: The presence of this attribute enables multi-line input.
     * </ul>
     *
     * @example
     * // To create a password input you might use the following markup:
     * <text-field attribute="password" label="Password" type="password"></text-field>
     *
     * // To create a more advanced input field, with placeholder text and help tooltip you might use the following markup:
     * <text-field attribute="username" label="Username"
     *             placeholder="Example brianvaughn"
     *             help="Your username will be visible to others!"></text-field>
     *
     * // To render a multiline text input (or <textarea>):
     * <text-field attribute="description" label="Description" multiline></text-field>
     *
     * // To render icons based on the status of the field (pristin, invalid, valid) pass an object:
     * <text-field attribute="username" label="Username"
     *             icon-after="{pristine: 'fa fa-user', invalid: 'fa fa-times', valid: 'fa fa-check'}">
     * </text-field>
     */
    var TextFieldDirective = (function () {
        /* @ngInject */
        function TextFieldDirective($log, $timeout, fieldHelper) {
            this.require = '^formFor';
            this.restrict = 'EA';
            this.templateUrl = 'form-for/templates/text-field.html';
            this.scope = {
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
                controller: '=?'
            };
            $log_ = $log;
            $timeout_ = $timeout;
            fieldHelper_ = fieldHelper;
        }
        TextFieldDirective.$inject = ["$log", "$timeout", "fieldHelper"];
        TextFieldDirective.prototype.link = function ($scope, $element, $attributes, formForController) {
            if (!$scope.attribute) {
                $log_.error('Missing required field "attribute"');
                return;
            }
            // Expose textField attributes to textField template partials for easier customization (see issue #61)
            $scope.attributes = $attributes;
            $scope.rows = $scope.rows || 3;
            $scope.type = $attributes['type'] || 'text';
            $scope.multiline = $attributes.hasOwnProperty('multiline') && $attributes['multiline'] !== 'false';
            $scope.tabIndex = $attributes['tabIndex'] || 0;
            $timeout_(function () {
                $scope.controller = $element.find($scope.multiline ? 'textarea' : 'input').controller('ngModel');
            });
            if ($attributes.hasOwnProperty('autofocus')) {
                $timeout_(function () {
                    $element.find($scope.multiline ? 'textarea' : 'input')[0].focus();
                });
            }
            fieldHelper_.manageLabel($scope, $attributes, false);
            fieldHelper_.manageFieldRegistration($scope, $attributes, formForController);
            // Update $scope.iconAfter based on the field state (see class-level documentation for more)
            if ($attributes['iconAfter']) {
                var updateIconAfter = function () {
                    if (!$scope.model) {
                        return;
                    }
                    var iconAfter = $attributes['iconAfter'].charAt(0) === '{' ? $scope.$eval($attributes['iconAfter']) : $attributes['iconAfter'];
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
                    var iconBefore = $attributes['iconBefore'].charAt(0) === '{' ? $scope.$eval($attributes['iconBefore']) : $attributes['iconBefore'];
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
        };
        return TextFieldDirective;
    })();
    formFor.TextFieldDirective = TextFieldDirective;
    angular.module('formFor').directive('textField', ["$log", "$timeout", "FieldHelper", function ($log, $timeout, FieldHelper) {
        return new TextFieldDirective($log, $timeout, FieldHelper);
    }]);
})(formFor || (formFor = {}));
/// <reference path="../services/field-helper.ts" />
var formFor;
(function (formFor) {
    var MIN_TIMEOUT_INTERVAL = 10;
    var $document_;
    var $log_;
    var $timeout_;
    var fieldHelper_;
    /**
     * Renders an &lt;input type="text"&gt; component with type-ahead functionality.
     * This type of component works with a large set of options that can be loaded asynchronously if needed.
     *
     * @example
     * // To use this component you'll first need to define a set of options. For instance:
     * $scope.genders = [
     *   { value: 'f', label: 'Female' },
     *   { value: 'm', label: 'Male' }
     * ];
     *
     * // To render a drop-down input using the above options:
     * <type-ahead-field attribute="gender"
     *                   label="Gender"
     *                   options="genders">
     * </type-ahead-field>
     *
     * @param $document $injector-supplied $document service
     * @param $log $injector-supplied $log service
     * @param $timeout $injector-supplied $timeout service
     * @param fieldHelper
     */
    var TypeAheadFieldDirective = (function () {
        /* @ngInject */
        function TypeAheadFieldDirective($document, $log, $timeout, fieldHelper) {
            this.require = '^formFor';
            this.restrict = 'EA';
            this.templateUrl = 'form-for/templates/type-ahead-field.html';
            this.scope = {
                attribute: '@',
                debounce: '@?',
                disable: '=',
                filterDebounce: '@?',
                filterTextChanged: '&?',
                help: '@?',
                options: '='
            };
            $document_ = $document;
            $log_ = $log;
            $timeout_ = $timeout;
            fieldHelper_ = fieldHelper;
        }
        TypeAheadFieldDirective.$inject = ["$document", "$log", "$timeout", "fieldHelper"];
        /* @ngInject */
        TypeAheadFieldDirective.prototype.link = function ($scope, $element, $attributes, formForController) {
            if (!$scope.attribute) {
                $log_.error('Missing required field "attribute"');
                return;
            }
            // Read from $attributes to avoid getting any interference from $scope.
            $scope.labelAttribute = $attributes['labelAttribute'] || 'label';
            $scope.valueAttribute = $attributes['valueAttribute'] || 'value';
            $scope.placeholder = $attributes.hasOwnProperty('placeholder') ? $attributes['placeholder'] : 'Select';
            $scope.tabIndex = $attributes['tabIndex'] || 0;
            $scope.scopeBuster = {
                filter: ''
            };
            fieldHelper_.manageLabel($scope, $attributes, false);
            fieldHelper_.manageFieldRegistration($scope, $attributes, formForController);
            /*****************************************************************************************
             * The following code pertains to opening and closing the filter.
             *****************************************************************************************/
            var filterText;
            // Helper method for setting focus on an item after a delay
            var setDelayedFilterTextFocus = function () {
                if (!filterText) {
                    var filterTextSelector = $element.find('input');
                    if (filterTextSelector.length) {
                        filterText = filterTextSelector[0];
                    }
                }
                if (filterText) {
                    $timeout_(filterText.focus.bind(filterText));
                }
            };
            $scope.close = function () {
                $timeout_(function () {
                    $scope.isOpen = false;
                });
            };
            $scope.open = function () {
                if ($scope.disable || $scope.model.disabled) {
                    return;
                }
                $timeout_(function () {
                    $scope.isOpen = true;
                });
            };
            /*****************************************************************************************
             * The following code pertains to filtering visible options.
             *****************************************************************************************/
            $scope.filteredOptions = [];
            // Sanitizes option and filter-text values for comparison
            var sanitize = function (value) {
                return typeof value === "string" ? value.toLowerCase() : '';
            };
            // Updates visible <option>s based on current filter text
            var calculateFilteredOptions = function () {
                var options = $scope.options || [];
                $scope.filteredOptions.splice(0);
                if (!$scope.scopeBuster.filter) {
                    angular.copy(options, $scope.filteredOptions);
                }
                else {
                    var filter = sanitize($scope.scopeBuster.filter);
                    angular.forEach(options, function (option) {
                        var index = sanitize(option[$scope.labelAttribute]).indexOf(filter);
                        if (index >= 0) {
                            $scope.filteredOptions.push(option);
                        }
                    });
                }
            };
            $scope.searchTextChange = function (text) {
                // No-op required by Angular Material
            };
            $scope.$watch('scopeBuster.filter', calculateFilteredOptions);
            $scope.$watch('options.length', calculateFilteredOptions);
            /*****************************************************************************************
             * The following code deals with toggling/collapsing the drop-down and selecting values.
             *****************************************************************************************/
            var documentClick = function (event) {
                // See filterTextClick() for why we check this property.
                if (event.ignoreFor === $scope.model.uid) {
                    return;
                }
                $scope.close();
            };
            $scope.filterTextClick = function (event) {
                // We can't stop the event from propagating or we might prevent other inputs from closing on blur.
                // But we can't let it proceed as normal or it may result in the $document click handler closing a newly-opened input.
                // Instead we tag it for this particular instance of <select-field> to ignore.
                if ($scope.isOpen) {
                    event.ignoreFor = $scope.model.uid;
                }
            };
            var pendingTimeoutId;
            $scope.$watch('isOpen', function () {
                if (pendingTimeoutId) {
                    $timeout_.cancel(pendingTimeoutId);
                }
                pendingTimeoutId = $timeout_(function () {
                    pendingTimeoutId = null;
                    if ($scope.isOpen) {
                        $document_.on('click', documentClick);
                    }
                    else {
                        $document_.off('click', documentClick);
                    }
                }, MIN_TIMEOUT_INTERVAL);
            });
            $scope.$on('$destroy', function () {
                $document_.off('click', documentClick);
            });
            /*****************************************************************************************
             * The following code responds to keyboard events when the drop-down is visible
             *****************************************************************************************/
            $scope.setFilterFocus = function () {
                setDelayedFilterTextFocus();
            };
            $scope.mouseOver = function (index) {
                $scope.mouseOverIndex = index;
                $scope.mouseOverOption = index >= 0 ? $scope.filteredOptions[index] : null;
            };
            $scope.selectOption = function (option) {
                $scope.model.bindable = option && option[$scope.valueAttribute];
                $scope.scopeBuster.filter = option && option[$scope.labelAttribute];
            };
            var syncFilterText = function () {
                if ($scope.model.bindable && $scope.options) {
                    $scope.options.forEach(function (option) {
                        if ($scope.model.bindable === option[$scope.valueAttribute]) {
                            $scope.scopeBuster.filter = option[$scope.labelAttribute];
                        }
                    });
                }
            };
            $scope.$watch('model.bindable', syncFilterText);
            $scope.$watch('options.length', syncFilterText);
            // Listen to key down, not up, because ENTER key sometimes gets converted into a click event.
            $scope.keyDown = function (event) {
                switch (event.keyCode) {
                    case 27:
                        $scope.close();
                        break;
                    case 13:
                        if ($scope.isOpen) {
                            $scope.selectOption($scope.mouseOverOption);
                            $scope.close();
                        }
                        else {
                            $scope.open();
                        }
                        event.preventDefault();
                        break;
                    case 38:
                        if ($scope.isOpen) {
                            $scope.mouseOver($scope.mouseOverIndex > 0 ? $scope.mouseOverIndex - 1 : $scope.filteredOptions.length - 1);
                        }
                        else {
                            $scope.open();
                        }
                        break;
                    case 40:
                        if ($scope.isOpen) {
                            $scope.mouseOver($scope.mouseOverIndex < $scope.filteredOptions.length - 1 ? $scope.mouseOverIndex + 1 : 0);
                        }
                        else {
                            $scope.open();
                        }
                        break;
                    case 9:
                    case 16:
                        $scope.close();
                        break;
                    default:
                        $scope.open();
                        break;
                }
            };
            $scope.$watchCollection('[isOpen, filteredOptions.length]', function () {
                // Reset hover anytime our list opens/closes or our collection is refreshed.
                $scope.mouseOver(-1);
                // Pass focus through to filter field when the type-ahead is opened
                if ($scope.isOpen) {
                    setDelayedFilterTextFocus();
                }
            });
            if ($scope.filterTextChanged instanceof Function) {
                $scope.$watch('scopeBuster.filter', function (text) {
                    $scope.filterTextChanged({ text: text });
                });
            }
        };
        TypeAheadFieldDirective.prototype.link.$inject = ["$scope", "$element", "$attributes", "formForController"];
        return TypeAheadFieldDirective;
    })();
    formFor.TypeAheadFieldDirective = TypeAheadFieldDirective;
    angular.module('formFor').directive('typeAheadField', ["$document", "$log", "$timeout", "FieldHelper", function ($document, $log, $timeout, FieldHelper) {
        return new TypeAheadFieldDirective($document, $log, $timeout, FieldHelper);
    }]);
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    /**
     * Input types available for auto-created forms; see {@link FieldView}.
     */
    (function (BuilderFieldType) {
        BuilderFieldType[BuilderFieldType["CHECKBOX"] = "checkbox"] = "CHECKBOX";
        BuilderFieldType[BuilderFieldType["NUMBER"] = "number"] = "NUMBER";
        BuilderFieldType[BuilderFieldType["PASSWORD"] = "password"] = "PASSWORD";
        BuilderFieldType[BuilderFieldType["RADIO"] = "radio"] = "RADIO";
        BuilderFieldType[BuilderFieldType["SELECT"] = "select"] = "SELECT";
        BuilderFieldType[BuilderFieldType["TEXT"] = "text"] = "TEXT";
    })(formFor.BuilderFieldType || (formFor.BuilderFieldType = {}));
    var BuilderFieldType = formFor.BuilderFieldType;
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    /**
     * Identifies a validation failure type.
     */
    (function (ValidationFailureType) {
        ValidationFailureType[ValidationFailureType["COLLECTION_MAX_SIZE"] = "COLLECTION_MAX_SIZE"] = "COLLECTION_MAX_SIZE";
        ValidationFailureType[ValidationFailureType["COLLECTION_MIN_SIZE"] = "COLLECTION_MIN_SIZE"] = "COLLECTION_MIN_SIZE";
        ValidationFailureType[ValidationFailureType["CUSTOM"] = "CUSTOM"] = "CUSTOM";
        ValidationFailureType[ValidationFailureType["MAXIMUM"] = "MAXIMUM"] = "MAXIMUM";
        ValidationFailureType[ValidationFailureType["MAX_LENGTH"] = "MAX_LENGTH"] = "MAX_LENGTH";
        ValidationFailureType[ValidationFailureType["MINIMUM"] = "MINIMUM"] = "MINIMUM";
        ValidationFailureType[ValidationFailureType["MIN_LENGTH"] = "MIN_LENGTH"] = "MIN_LENGTH";
        ValidationFailureType[ValidationFailureType["PATTERN"] = "PATTERN"] = "PATTERN";
        ValidationFailureType[ValidationFailureType["REQUIRED"] = "REQUIRED_FIELD"] = "REQUIRED";
        ValidationFailureType[ValidationFailureType["TYPE_EMAIL"] = "TYPE_EMAIL"] = "TYPE_EMAIL";
        ValidationFailureType[ValidationFailureType["TYPE_INTEGER"] = "TYPE_INTEGER"] = "TYPE_INTEGER";
        ValidationFailureType[ValidationFailureType["TYPE_NEGATIVE"] = "TYPE_NEGATIVE"] = "TYPE_NEGATIVE";
        ValidationFailureType[ValidationFailureType["TYPE_NON_NEGATIVE"] = "TYPE_NON_NEGATIVE"] = "TYPE_NON_NEGATIVE";
        ValidationFailureType[ValidationFailureType["TYPE_NUMERIC"] = "TYPE_NUMERIC"] = "TYPE_NUMERIC";
        ValidationFailureType[ValidationFailureType["TYPE_POSITIVE"] = "TYPE_POSITIVE"] = "TYPE_POSITIVE";
    })(formFor.ValidationFailureType || (formFor.ValidationFailureType = {}));
    var ValidationFailureType = formFor.ValidationFailureType;
    ;
})(formFor || (formFor = {}));
;
var formFor;
(function (formFor) {
    /**
     * Constraints that can be applied to a form field.
     * These constraints can be combined (e.g. "positive integer").
     */
    (function (ValidationFieldType) {
        ValidationFieldType[ValidationFieldType["EMAIL"] = "email"] = "EMAIL";
        ValidationFieldType[ValidationFieldType["INTEGER"] = "integer"] = "INTEGER";
        ValidationFieldType[ValidationFieldType["NEGATIVE"] = "negative"] = "NEGATIVE";
        ValidationFieldType[ValidationFieldType["NON_NEGATIVE"] = "nonNegative"] = "NON_NEGATIVE";
        ValidationFieldType[ValidationFieldType["NUMBER"] = "number"] = "NUMBER";
        ValidationFieldType[ValidationFieldType["POSITIVE"] = "positive"] = "POSITIVE";
    })(formFor.ValidationFieldType || (formFor.ValidationFieldType = {}));
    var ValidationFieldType = formFor.ValidationFieldType;
    ;
})(formFor || (formFor = {}));
;
var formFor;
(function (formFor) {
    /**
     * Wrapper object for a form-field attribute that exposes field-state to field directives.
     *
     * <p>Note that this interface exists for type-checking only; nothing actually implements this interface.
     */
    var BindableFieldWrapper = (function () {
        function BindableFieldWrapper() {
        }
        return BindableFieldWrapper;
    })();
    formFor.BindableFieldWrapper = BindableFieldWrapper;
    ;
})(formFor || (formFor = {}));
;
/// <reference path="../../definitions/angular.d.ts" />
/// <reference path="form-for-configuration.ts" />
/// <reference path="../utils/nested-object-helper.ts" />
/// <reference path="../utils/promise-utils.ts" />
var formFor;
(function (formFor) {
    /**
     * Model validation service.
     */
    var ModelValidator = (function () {
        /**
         * Constructor.
         *
         * @param $interpolate Injector-supplied $interpolate service
         * @param $parse Injecter-supplied $parse service
         * @param $q Injector-supplied $q service
         * @param formForConfiguration
         */
        function ModelValidator($interpolate, $parse, $q, formForConfiguration) {
            this.$interpolate_ = $interpolate;
            this.formForConfiguration_ = formForConfiguration;
            this.nestedObjectHelper_ = new formFor.NestedObjectHelper($parse);
            this.promiseUtils_ = new formFor.PromiseUtils($q);
        }
        /**
         * Determines if the specified collection is required (requires a minimum number of items).
         *
         * @param fieldName Name of field containing the collection.
         * @param validationRuleSet Map of field names to validation rules
         */
        ModelValidator.prototype.isCollectionRequired = function (fieldName, validationRuleSet) {
            var validationRules = this.getRulesFor_(fieldName, validationRuleSet);
            if (validationRules && validationRules.collection && validationRules.collection.min) {
                if (angular.isObject(validationRules.collection.min)) {
                    return validationRules.collection.min.rule > 0;
                }
                else {
                    return validationRules.collection.min > 0;
                }
            }
            return false;
        };
        /**
         * Determines if the specified field is flagged as required.
         *
         * @param fieldName Name of field in question.
         * @param validationRuleSet Map of field names to validation rules
         */
        ModelValidator.prototype.isFieldRequired = function (fieldName, validationRuleSet) {
            var validationRules = this.getRulesFor_(fieldName, validationRuleSet);
            if (validationRules && validationRules.required) {
                if (angular.isObject(validationRules.required)) {
                    return validationRules.required.rule;
                }
                else {
                    return !!validationRules.required;
                }
            }
            return false;
        };
        /**
         * Validates the model against all rules in the validationRules.
         * This method returns a promise to be resolved on successful validation,
         * or rejected with a map of field-name to error-message.
         *
         * @param formData Form-data object model is contained within
         * @param validationRuleSet Map of field names to validation rules
         * @return Promise to be resolved or rejected based on validation success or failure.
         */
        ModelValidator.prototype.validateAll = function (formData, validationRuleSet) {
            var fieldNames = this.nestedObjectHelper_.flattenObjectKeys(formData);
            return this.validateFields(formData, fieldNames, validationRuleSet);
        };
        /**
         * Validate the properties of a collection (but not the items within the collection).
         * This method returns a promise to be resolved on successful validation or rejected with an error message.
         *
         * @param formData Form-data object model is contained within
         * @param fieldName Name of collection to validate
         * @param validationRuleSet Map of field names to validation rules
         * @return Promise to be resolved or rejected based on validation success or failure.
         */
        ModelValidator.prototype.validateCollection = function (formData, fieldName, validationRuleSet) {
            var validationRules = this.getRulesFor_(fieldName, validationRuleSet);
            var collection = this.nestedObjectHelper_.readAttribute(formData, fieldName);
            if (validationRules && validationRules.collection) {
                collection = collection || [];
                return this.validateCollectionMinLength_(collection, validationRules.collection) || this.validateCollectionMaxLength_(collection, validationRules.collection) || this.promiseUtils_.resolve();
            }
            return this.promiseUtils_.resolve();
        };
        /**
         * Validates a value against the related rule-set (within validationRules).
         * This method returns a promise to be resolved on successful validation.
         * If validation fails the promise will be rejected with an error message.
         *
         * @param formData Form-data object model is contained within.
         * @param fieldName Name of field used to associate the rule-set map with a given value.
         * @param validationRuleSet Map of field names to validation rules
         * @return Promise to be resolved or rejected based on validation success or failure.
         */
        ModelValidator.prototype.validateField = function (formData, fieldName, validationRuleSet) {
            var validationRules = this.getRulesFor_(fieldName, validationRuleSet);
            var value = this.nestedObjectHelper_.readAttribute(formData, fieldName);
            if (validationRules) {
                if (value === undefined || value === null) {
                    value = ""; // Escape falsy values liked null or undefined, but not ones like 0
                }
                return this.validateFieldRequired_(value, validationRules) || this.validateFieldMinimum_(value, validationRules) || this.validateFieldMinLength_(value, validationRules) || this.validateFieldMaximum_(value, validationRules) || this.validateFieldMaxLength_(value, validationRules) || this.validateFieldType_(value, validationRules) || this.validateFieldPattern_(value, validationRules) || this.validateFieldCustom_(value, formData, validationRules, fieldName) || this.promiseUtils_.resolve();
            }
            return this.promiseUtils_.resolve();
        };
        /**
         * Validates the values in model with the rules defined in the current validationRules.
         * This method returns a promise to be resolved on successful validation,
         * or rejected with a map of field-name to error-message.
         *
         * @param formData Form-data object model is contained within
         * @param fieldNames White-list set of fields to validate for the given model.
         *                   Values outside of this list will be ignored.
         * @param validationRuleSet Map of field names to validation rules
         * @return Promise to be resolved or rejected based on validation success or failure.
         */
        ModelValidator.prototype.validateFields = function (formData, fieldNames, validationRuleSet) {
            var _this = this;
            var deferred = this.promiseUtils_.defer();
            var promises = [];
            var errorMap = {};
            angular.forEach(fieldNames, function (fieldName) {
                var validationRules = _this.getRulesFor_(fieldName, validationRuleSet);
                if (validationRules) {
                    var promise;
                    if (validationRules.collection) {
                        promise = _this.validateCollection(formData, fieldName, validationRuleSet);
                    }
                    else {
                        promise = _this.validateField(formData, fieldName, validationRuleSet);
                    }
                    promise.then(angular.noop, function (error) {
                        _this.nestedObjectHelper_.writeAttribute(errorMap, fieldName, error);
                    });
                    promises.push(promise);
                }
            }, this);
            // Wait until all validations have finished before proceeding; bundle up the error messages if any failed.
            this.promiseUtils_.waitForAll(promises).then(deferred.resolve, function () {
                deferred.reject(errorMap);
            });
            return deferred.promise;
        };
        // Helper methods ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Strip array brackets from field names so that model values can be mapped to rules.
         * e.g. "foo[0].bar" should be validated against "foo.collection.fields.bar"
         *
         * @private
         */
        ModelValidator.prototype.getRulesFor_ = function (fieldName, validationRuleSet) {
            var expandedFieldName = fieldName.replace(/\[[^\]]+\]/g, '.collection.fields');
            return this.nestedObjectHelper_.readAttribute(validationRuleSet, expandedFieldName);
        };
        ModelValidator.prototype.getFieldTypeFailureMessage_ = function (validationRules, failureType) {
            return angular.isObject(validationRules.type) ? validationRules.type.message : this.formForConfiguration_.getFailedValidationMessage(failureType);
        };
        /**
         * Determining if numeric input has been provided.
         * This guards against the fact that `new Number('') == 0`.
         * @private
         */
        ModelValidator.isConsideredNumeric_ = function (stringValue, numericValue) {
            return stringValue && !isNaN(numericValue);
        };
        // Validation helper methods /////////////////////////////////////////////////////////////////////////////////////////
        ModelValidator.prototype.validateCollectionMinLength_ = function (collection, validationRuleCollection) {
            if (validationRuleCollection.min) {
                var min = angular.isObject(validationRuleCollection.min) ? validationRuleCollection.min.rule : validationRuleCollection.min;
                if (collection.length < min) {
                    var failureMessage;
                    if (angular.isObject(validationRuleCollection.min)) {
                        failureMessage = validationRuleCollection.min.message;
                    }
                    else {
                        failureMessage = this.$interpolate_(this.formForConfiguration_.getFailedValidationMessage(formFor.ValidationFailureType.COLLECTION_MIN_SIZE))({ num: min });
                    }
                    return this.promiseUtils_.reject(failureMessage);
                }
            }
            return null;
        };
        ModelValidator.prototype.validateCollectionMaxLength_ = function (collection, validationRuleCollection) {
            if (validationRuleCollection.max) {
                var max = angular.isObject(validationRuleCollection.max) ? validationRuleCollection.max.rule : validationRuleCollection.max;
                if (collection.length > max) {
                    var failureMessage;
                    if (angular.isObject(validationRuleCollection.max)) {
                        failureMessage = validationRuleCollection.max.message;
                    }
                    else {
                        failureMessage = this.$interpolate_(this.formForConfiguration_.getFailedValidationMessage(formFor.ValidationFailureType.COLLECTION_MAX_SIZE))({ num: max });
                    }
                    return this.promiseUtils_.reject(failureMessage);
                }
            }
            return null;
        };
        ModelValidator.prototype.validateFieldCustom_ = function (value, formData, validationRules, fieldName) {
            var _this = this;
            if (validationRules.custom) {
                var defaultErrorMessage;
                var validationFunction;
                if (angular.isFunction(validationRules.custom)) {
                    defaultErrorMessage = this.formForConfiguration_.getFailedValidationMessage(formFor.ValidationFailureType.CUSTOM);
                    validationFunction = validationRules.custom;
                }
                else {
                    defaultErrorMessage = validationRules.custom.message;
                    validationFunction = validationRules.custom.rule;
                }
                try {
                    var returnValue = validationFunction(value, formData, fieldName);
                }
                catch (error) {
                    return this.promiseUtils_.reject(error.message || defaultErrorMessage);
                }
                if (angular.isObject(returnValue) && angular.isFunction(returnValue.then)) {
                    return returnValue.then(function (reason) {
                        return _this.promiseUtils_.resolve(reason);
                    }, function (reason) {
                        return _this.promiseUtils_.reject(reason || defaultErrorMessage);
                    });
                }
                else if (returnValue) {
                    return this.promiseUtils_.resolve(returnValue);
                }
                else {
                    return this.promiseUtils_.reject(defaultErrorMessage);
                }
            }
            return null;
        };
        ModelValidator.prototype.validateFieldMaximum_ = function (value, validationRules) {
            if (validationRules.maximum) {
                var stringValue = value.toString();
                var numericValue = Number(value);
                var maximum = angular.isObject(validationRules.maximum) ? validationRules.maximum.rule : angular.isFunction(validationRules.maximum) ? validationRules.maximum.call(this, value) : validationRules.maximum;
                if (stringValue && !isNaN(numericValue) && numericValue > maximum) {
                    var failureMessage;
                    if (angular.isObject(validationRules.maximum)) {
                        failureMessage = validationRules.maximum.message;
                    }
                    else {
                        failureMessage = this.$interpolate_(this.formForConfiguration_.getFailedValidationMessage(formFor.ValidationFailureType.MAXIMUM))({ num: maximum });
                    }
                    return this.promiseUtils_.reject(failureMessage);
                }
            }
            return null;
        };
        ModelValidator.prototype.validateFieldMaxLength_ = function (value, validationRules) {
            if (validationRules.maxlength) {
                var maxlength = angular.isObject(validationRules.maxlength) ? validationRules.maxlength.rule : validationRules.maxlength;
                if (value.length > maxlength) {
                    var failureMessage;
                    if (angular.isObject(validationRules.maxlength)) {
                        failureMessage = validationRules.maxlength.message;
                    }
                    else {
                        failureMessage = this.$interpolate_(this.formForConfiguration_.getFailedValidationMessage(formFor.ValidationFailureType.MAX_LENGTH))({ num: maxlength });
                    }
                    return this.promiseUtils_.reject(failureMessage);
                }
            }
            return null;
        };
        ModelValidator.prototype.validateFieldMinimum_ = function (value, validationRules) {
            if (validationRules.minimum) {
                var stringValue = value.toString();
                var numericValue = Number(value);
                var minimum = angular.isObject(validationRules.minimum) ? validationRules.minimum.rule : angular.isFunction(validationRules.minimum) ? validationRules.minimum.call(this, value) : validationRules.minimum;
                if (stringValue && !isNaN(numericValue) && numericValue < minimum) {
                    var failureMessage;
                    if (angular.isObject(validationRules.minimum)) {
                        failureMessage = validationRules.minimum.message;
                    }
                    else {
                        failureMessage = this.$interpolate_(this.formForConfiguration_.getFailedValidationMessage(formFor.ValidationFailureType.MINIMUM))({ num: minimum });
                    }
                    return this.promiseUtils_.reject(failureMessage);
                }
            }
            return null;
        };
        ModelValidator.prototype.validateFieldMinLength_ = function (value, validationRules) {
            if (validationRules.minlength) {
                var minlength = angular.isObject(validationRules.minlength) ? validationRules.minlength.rule : validationRules.minlength;
                if (value && value.length < minlength) {
                    var failureMessage;
                    if (angular.isObject(validationRules.minlength)) {
                        failureMessage = validationRules.minlength.message;
                    }
                    else {
                        failureMessage = this.$interpolate_(this.formForConfiguration_.getFailedValidationMessage(formFor.ValidationFailureType.MIN_LENGTH))({ num: minlength });
                    }
                    return this.promiseUtils_.reject(failureMessage);
                }
            }
            return null;
        };
        ModelValidator.prototype.validateFieldRequired_ = function (value, validationRules) {
            if (validationRules.required) {
                var required = angular.isObject(validationRules.required) ? validationRules.required.rule : validationRules.required;
                // Compare both string and numeric values to avoid rejecting non-empty but falsy values (e.g. 0).
                var stringValue = value.toString().replace(/\s+$/, ''); // Disallow an all-whitespace string
                var numericValue = Number(value);
                if (required && !stringValue && !numericValue) {
                    var failureMessage;
                    if (angular.isObject(validationRules.required)) {
                        failureMessage = validationRules.required.message;
                    }
                    else {
                        failureMessage = this.formForConfiguration_.getFailedValidationMessage(formFor.ValidationFailureType.REQUIRED);
                    }
                    return this.promiseUtils_.reject(failureMessage);
                }
            }
            return null;
        };
        ModelValidator.prototype.validateFieldPattern_ = function (value, validationRules) {
            if (validationRules.pattern) {
                var isRegExp = validationRules.pattern instanceof RegExp;
                var regExp = isRegExp ? validationRules.pattern : validationRules.pattern.rule;
                if (value && !regExp.exec(value)) {
                    var failureMessage = isRegExp ? this.formForConfiguration_.getFailedValidationMessage(formFor.ValidationFailureType.PATTERN) : validationRules.pattern.message;
                    return this.promiseUtils_.reject(failureMessage);
                }
            }
            return null;
        };
        ModelValidator.prototype.validateFieldType_ = function (value, validationRules) {
            if (validationRules.type) {
                // String containing 0+ ValidationRuleFieldType enums
                var typesString = angular.isObject(validationRules.type) ? validationRules.type.rule : validationRules.type;
                var stringValue = value.toString();
                var numericValue = Number(value);
                if (typesString) {
                    var types = typesString.split(' ');
                    for (var i = 0, length = types.length; i < length; i++) {
                        var type = types[i];
                        switch (type) {
                            case formFor.ValidationFieldType.INTEGER:
                                if (stringValue && (isNaN(numericValue) || numericValue % 1 !== 0)) {
                                    return this.promiseUtils_.reject(this.getFieldTypeFailureMessage_(validationRules, formFor.ValidationFailureType.TYPE_INTEGER));
                                }
                                break;
                            case formFor.ValidationFieldType.NUMBER:
                                if (stringValue && isNaN(numericValue)) {
                                    return this.promiseUtils_.reject(this.getFieldTypeFailureMessage_(validationRules, formFor.ValidationFailureType.TYPE_NUMERIC));
                                }
                                break;
                            case formFor.ValidationFieldType.NEGATIVE:
                                if (ModelValidator.isConsideredNumeric_(stringValue, numericValue) && numericValue >= 0) {
                                    return this.promiseUtils_.reject(this.getFieldTypeFailureMessage_(validationRules, formFor.ValidationFailureType.TYPE_NEGATIVE));
                                }
                                break;
                            case formFor.ValidationFieldType.NON_NEGATIVE:
                                if (ModelValidator.isConsideredNumeric_(stringValue, numericValue) && numericValue < 0) {
                                    return this.promiseUtils_.reject(this.getFieldTypeFailureMessage_(validationRules, formFor.ValidationFailureType.TYPE_NON_NEGATIVE));
                                }
                                break;
                            case formFor.ValidationFieldType.POSITIVE:
                                if (ModelValidator.isConsideredNumeric_(stringValue, numericValue) && numericValue <= 0) {
                                    return this.promiseUtils_.reject(this.getFieldTypeFailureMessage_(validationRules, formFor.ValidationFailureType.TYPE_POSITIVE));
                                }
                                break;
                            case formFor.ValidationFieldType.EMAIL:
                                if (stringValue && !stringValue.match(/^.+@.+\..+$/)) {
                                    return this.promiseUtils_.reject(this.getFieldTypeFailureMessage_(validationRules, formFor.ValidationFailureType.TYPE_EMAIL));
                                }
                                break;
                        }
                    }
                }
            }
            return null;
        };
        return ModelValidator;
    })();
    formFor.ModelValidator = ModelValidator;
    angular.module('formFor').service('ModelValidator', ["$interpolate", "$parse", "$q", "FormForConfiguration", function ($interpolate, $parse, $q, FormForConfiguration) { return new ModelValidator($interpolate, $parse, $q, FormForConfiguration); }]);
})(formFor || (formFor = {}));
/// <reference path="nested-object-helper.ts" />
var formFor;
(function (formFor) {
    /*
     * Organizes state management for form-submission and field validity.
     *
     * <p>Intended for use only by formFor directive; this class is not exposed to the $injector.
     */
    var FormForStateHelper = (function () {
        // TODO Add some documentation
        function FormForStateHelper($parse, $scope) {
            this.formForScope_ = $scope;
            this.nestedObjectHelper_ = new formFor.NestedObjectHelper($parse);
            this.formForScope_.fieldNameToErrorMap = $scope.fieldNameToErrorMap || {};
            this.formForScope_.valid = true;
            this.fieldNameToModifiedStateMap_ = {};
            this.formSubmitted_ = false;
            this.fieldNameToErrorMap_ = {};
            this.watchable = 0;
        }
        FormForStateHelper.prototype.getFieldError = function (fieldName) {
            return this.nestedObjectHelper_.readAttribute(this.formForScope_.fieldNameToErrorMap, fieldName);
        };
        FormForStateHelper.prototype.hasFieldBeenModified = function (fieldName) {
            return this.nestedObjectHelper_.readAttribute(this.fieldNameToModifiedStateMap_, fieldName);
        };
        FormForStateHelper.prototype.hasFormBeenSubmitted = function () {
            return this.formSubmitted_;
        };
        FormForStateHelper.prototype.isFormInvalid = function () {
            return !this.isFormValid();
        };
        FormForStateHelper.prototype.isFormValid = function () {
            for (var prop in this.fieldNameToErrorMap_) {
                return false;
            }
            return true;
        };
        FormForStateHelper.prototype.resetFieldErrors = function () {
            this.formForScope_.fieldNameToErrorMap = {};
        };
        FormForStateHelper.prototype.setFieldError = function (fieldName, error) {
            var safeFieldName = this.nestedObjectHelper_.flattenAttribute(fieldName);
            this.nestedObjectHelper_.writeAttribute(this.formForScope_.fieldNameToErrorMap, fieldName, error);
            if (error) {
                this.fieldNameToErrorMap_[safeFieldName] = error;
            }
            else {
                delete this.fieldNameToErrorMap_[safeFieldName];
            }
            this.formForScope_.valid = this.isFormValid();
            this.watchable++;
        };
        FormForStateHelper.prototype.setFieldHasBeenModified = function (fieldName, hasBeenModified) {
            this.nestedObjectHelper_.writeAttribute(this.fieldNameToModifiedStateMap_, fieldName, hasBeenModified);
            this.watchable++;
        };
        FormForStateHelper.prototype.setFormSubmitted = function (submitted) {
            this.formSubmitted_ = submitted;
            this.watchable++;
        };
        return FormForStateHelper;
    })();
    formFor.FormForStateHelper = FormForStateHelper;
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    /**
     * Utility for working with strings.
     *
     * <p>Intended for use only by formFor directive; this class is not exposed to the $injector.
     */
    var StringUtil = (function () {
        function StringUtil() {
        }
        /**
         * Converts text in common variable formats to humanized form.
         *
         * @param text Name of variable to be humanized (ex. myVariable, my_variable)
         * @returns Humanized string (ex. 'My Variable')
         */
        StringUtil.humanize = function (text) {
            if (!text) {
                return '';
            }
            text = text.replace(/[A-Z]/g, function (match) {
                return ' ' + match;
            });
            text = text.replace(/_([a-z])/g, function (match, $1) {
                return ' ' + $1.toUpperCase();
            });
            text = text.replace(/\s+/g, ' ');
            text = text.trim();
            text = text.charAt(0).toUpperCase() + text.slice(1);
            return text;
        };
        return StringUtil;
    })();
    formFor.StringUtil = StringUtil;
})(formFor || (formFor = {}));
/// <reference path="../../../definitions/angular.d.ts" />

},{}],3:[function(require,module,exports){
/**
 * angular-permission
 * Route permission and access control as simple as it can get
 * @version v0.3.1 - 2015-07-07
 * @link http://www.rafaelvidaurre.com
 * @author Rafael Vidaurre <narzerus@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function () {
  'use strict';

  angular.module('permission', ['ui.router'])
    .run(['$rootScope', 'Permission', '$state', '$q',
    function ($rootScope, Permission, $state, $q) {
      $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
        if (toState.$$finishAuthorize) {
          return;
        }

        // If there are permissions set then prevent default and attempt to authorize
        var permissions;
        if (toState.data && toState.data.permissions) {
          permissions = toState.data.permissions;
        } else if (toState.permissions) {
          /**
          * This way of defining permissions will be depracated in v1. Should use
          * `data` key instead
          */
          console.log('Deprecation Warning: permissions should be set inside the `data` key ');
          console.log('Setting permissions for a state outside `data` will be depracated in' +
            ' version 1');
          permissions = toState.permissions;
        }

        if (permissions) {
          event.preventDefault();
          toState = angular.extend({'$$finishAuthorize': true}, toState);

          if ($rootScope.$broadcast('$stateChangePermissionStart', toState, toParams).defaultPrevented) {
            return;
          }

          Permission.authorize(permissions, toParams).then(function () {
            // If authorized, use call state.go without triggering the event.
            // Then trigger $stateChangeSuccess manually to resume the rest of the process
            // Note: This is a pseudo-hacky fix which should be fixed in future ui-router versions
            if (!$rootScope.$broadcast('$stateChangeStart', toState, toParams, fromState, fromParams).defaultPrevented) {
              $rootScope.$broadcast('$stateChangePermissionAccepted', toState, toParams);

              $state.go(toState.name, toParams, {notify: false}).then(function() {
                $rootScope
                  .$broadcast('$stateChangeSuccess', toState, toParams, fromState, fromParams);
              });
            }
          }, function () {
            if (!$rootScope.$broadcast('$stateChangeStart', toState, toParams, fromState, fromParams).defaultPrevented) {
              $rootScope.$broadcast('$stateChangePermissionDenied', toState, toParams);

              var redirectTo = permissions.redirectTo;
              var result;

              if (angular.isFunction(redirectTo)) {
                redirectTo = redirectTo();

                $q.when(redirectTo).then(function (newState) {
                  if (newState) {
                    $state.go(newState, toParams);
                  }
                });

              } else {
                if (redirectTo) {
                  $state.go(redirectTo, toParams);
                }
              }
            }
          });
        }
      });
    }]);
}());

(function () {
  'use strict';

  angular.module('permission')
    .provider('Permission', function () {
      var roleValidationConfig = {};
      var validateRoleDefinitionParams = function (roleName, validationFunction) {
        if (!angular.isString(roleName)) {
          throw new Error('Role name must be a string');
        }
        if (!angular.isFunction(validationFunction)) {
          throw new Error('Validation function not provided correctly');
        }
      };

      var validateManyRolesDefinitionParams = function(roles, validationFunction) {
        if (!angular.isArray(roles)) {
          throw new Error('Roles must be an array');
        } else {
          for(var i = 0; i < roles.length; i++) {
            validateRoleDefinitionParams(roles[i], validationFunction);
          }
        }
      };

      this.defineRole = function (roleName, validationFunction) {
        /**
          This method is only available in config-time, and cannot access services, as they are
          not yet injected anywere which makes this kinda useless.
          Should remove if we cannot find a use for it.
        **/
        validateRoleDefinitionParams(roleName, validationFunction);
        roleValidationConfig[roleName] = validationFunction;

        return this;
      };

      this.$get = ['$q', function ($q) {
        var Permission = {
          _promiseify: function (value) {
            /**
              Converts a value into a promise, if the value is truthy it resolves it, otherwise
              it rejects it
            **/
            if (value && angular.isFunction(value.then)) {
              return value;
            }

            var deferred = $q.defer();
            if (value) {
              deferred.resolve();
            } else {
              deferred.reject();
            }
            return deferred.promise;
          },
          _validateRoleMap: function (roleMap) {
            if (typeof(roleMap) !== 'object' || roleMap instanceof Array) {
              throw new Error('Role map has to be an object');
            }
            if (roleMap.only === undefined && roleMap.except === undefined) {
              throw new Error('Either "only" or "except" keys must me defined');
            }
            if (roleMap.only) {
              if (!(roleMap.only instanceof Array)) {
                throw new Error('Array of roles expected');
              }
            } else if (roleMap.except) {
              if (!(roleMap.except instanceof Array)) {
                throw new Error('Array of roles expected');
              }
            }
          },
          _findMatchingRole: function (rolesArray, toParams) {
            var roles = angular.copy(rolesArray);
            var deferred = $q.defer();
            var currentRole = roles.shift();

            // If no roles left to validate reject promise
            if (!currentRole) {
              deferred.reject();
              return deferred.promise;
            }
            // Validate role definition exists
            if (!angular.isFunction(Permission.roleValidations[currentRole])) {
              throw new Error('undefined role or invalid role validation');
            }

            var validatingRole = Permission.roleValidations[currentRole](toParams, currentRole);
            validatingRole = Permission._promiseify(validatingRole);

            validatingRole.then(function () {
              deferred.resolve();
            }, function () {
              Permission._findMatchingRole(roles, toParams).then(function () {
                deferred.resolve();
              }, function () {
                deferred.reject();
              });
            });

            return deferred.promise;
          },
          defineRole: function (roleName, validationFunction) {
            /**
              Service-available version of defineRole, the callback passed here lives in the
              scope where it is defined and therefore can interact with other modules
            **/
            validateRoleDefinitionParams(roleName, validationFunction);
            roleValidationConfig[roleName] = validationFunction;

            return Permission;
          },
          defineManyRoles: function(roles, validationFunction) {
            validateManyRolesDefinitionParams(roles, validationFunction);

            var definedPermissions = Permission;
            for(var i = 0; i < roles.length; i++) {
               definedPermissions = definedPermissions.defineRole(roles[i], validationFunction);
            }

            return definedPermissions;
          },
          resolveIfMatch: function (rolesArray, toParams) {
            var roles = angular.copy(rolesArray);
            var deferred = $q.defer();
            Permission._findMatchingRole(roles, toParams).then(function () {
              // Found role match
              deferred.resolve();
            }, function () {
              // No match
              deferred.reject();
            });
            return deferred.promise;
          },
          rejectIfMatch: function (roles, toParams) {
            var deferred = $q.defer();
            Permission._findMatchingRole(roles, toParams).then(function () {
              // Role found
              deferred.reject();
            }, function () {
              // Role not found
              deferred.resolve();
            });
            return deferred.promise;
          },
          roleValidations: roleValidationConfig,
          authorize: function (roleMap, toParams) {
            // Validate input
            Permission._validateRoleMap(roleMap);

            var authorizing;

            if (roleMap.only) {
              authorizing = Permission.resolveIfMatch(roleMap.only, toParams);
            } else {
              authorizing = Permission.rejectIfMatch(roleMap.except, toParams);
            }

            return authorizing;
          }
        };

        return Permission;
      }];
    });

}());

},{}],4:[function(require,module,exports){
/*!
 * angular-translate - v2.8.1 - 2015-10-01
 * 
 * Copyright (c) 2015 The angular-translate team, Pascal Precht; Licensed MIT
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    factory();
  }
}(this, function () {

/**
 * @ngdoc overview
 * @name pascalprecht.translate
 *
 * @description
 * The main module which holds everything together.
 */
angular.module('pascalprecht.translate', ['ng'])
  .run(runTranslate);

function runTranslate($translate) {

  'use strict';

  var key = $translate.storageKey(),
    storage = $translate.storage();

  var fallbackFromIncorrectStorageValue = function () {
    var preferred = $translate.preferredLanguage();
    if (angular.isString(preferred)) {
      $translate.use(preferred);
      // $translate.use() will also remember the language.
      // So, we don't need to call storage.put() here.
    } else {
      storage.put(key, $translate.use());
    }
  };

  fallbackFromIncorrectStorageValue.displayName = 'fallbackFromIncorrectStorageValue';

  if (storage) {
    if (!storage.get(key)) {
      fallbackFromIncorrectStorageValue();
    } else {
      $translate.use(storage.get(key))['catch'](fallbackFromIncorrectStorageValue);
    }
  } else if (angular.isString($translate.preferredLanguage())) {
    $translate.use($translate.preferredLanguage());
  }
}
runTranslate.$inject = ['$translate'];

runTranslate.displayName = 'runTranslate';

/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateSanitizationProvider
 *
 * @description
 *
 * Configurations for $translateSanitization
 */
angular.module('pascalprecht.translate').provider('$translateSanitization', $translateSanitizationProvider);

function $translateSanitizationProvider () {

  'use strict';

  var $sanitize,
      currentStrategy = null, // TODO change to either 'sanitize', 'escape' or ['sanitize', 'escapeParameters'] in 3.0.
      hasConfiguredStrategy = false,
      hasShownNoStrategyConfiguredWarning = false,
      strategies;

  /**
   * Definition of a sanitization strategy function
   * @callback StrategyFunction
   * @param {string|object} value - value to be sanitized (either a string or an interpolated value map)
   * @param {string} mode - either 'text' for a string (translation) or 'params' for the interpolated params
   * @return {string|object}
   */

  /**
   * @ngdoc property
   * @name strategies
   * @propertyOf pascalprecht.translate.$translateSanitizationProvider
   *
   * @description
   * Following strategies are built-in:
   * <dl>
   *   <dt>sanitize</dt>
   *   <dd>Sanitizes HTML in the translation text using $sanitize</dd>
   *   <dt>escape</dt>
   *   <dd>Escapes HTML in the translation</dd>
   *   <dt>sanitizeParameters</dt>
   *   <dd>Sanitizes HTML in the values of the interpolation parameters using $sanitize</dd>
   *   <dt>escapeParameters</dt>
   *   <dd>Escapes HTML in the values of the interpolation parameters</dd>
   *   <dt>escaped</dt>
   *   <dd>Support legacy strategy name 'escaped' for backwards compatibility (will be removed in 3.0)</dd>
   * </dl>
   *
   */

  strategies = {
    sanitize: function (value, mode) {
      if (mode === 'text') {
        value = htmlSanitizeValue(value);
      }
      return value;
    },
    escape: function (value, mode) {
      if (mode === 'text') {
        value = htmlEscapeValue(value);
      }
      return value;
    },
    sanitizeParameters: function (value, mode) {
      if (mode === 'params') {
        value = mapInterpolationParameters(value, htmlSanitizeValue);
      }
      return value;
    },
    escapeParameters: function (value, mode) {
      if (mode === 'params') {
        value = mapInterpolationParameters(value, htmlEscapeValue);
      }
      return value;
    }
  };
  // Support legacy strategy name 'escaped' for backwards compatibility.
  // TODO should be removed in 3.0
  strategies.escaped = strategies.escapeParameters;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateSanitizationProvider#addStrategy
   * @methodOf pascalprecht.translate.$translateSanitizationProvider
   *
   * @description
   * Adds a sanitization strategy to the list of known strategies.
   *
   * @param {string} strategyName - unique key for a strategy
   * @param {StrategyFunction} strategyFunction - strategy function
   * @returns {object} this
   */
  this.addStrategy = function (strategyName, strategyFunction) {
    strategies[strategyName] = strategyFunction;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateSanitizationProvider#removeStrategy
   * @methodOf pascalprecht.translate.$translateSanitizationProvider
   *
   * @description
   * Removes a sanitization strategy from the list of known strategies.
   *
   * @param {string} strategyName - unique key for a strategy
   * @returns {object} this
   */
  this.removeStrategy = function (strategyName) {
    delete strategies[strategyName];
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateSanitizationProvider#useStrategy
   * @methodOf pascalprecht.translate.$translateSanitizationProvider
   *
   * @description
   * Selects a sanitization strategy. When an array is provided the strategies will be executed in order.
   *
   * @param {string|StrategyFunction|array} strategy The sanitization strategy / strategies which should be used. Either a name of an existing strategy, a custom strategy function, or an array consisting of multiple names and / or custom functions.
   * @returns {object} this
   */
  this.useStrategy = function (strategy) {
    hasConfiguredStrategy = true;
    currentStrategy = strategy;
    return this;
  };

  /**
   * @ngdoc object
   * @name pascalprecht.translate.$translateSanitization
   * @requires $injector
   * @requires $log
   *
   * @description
   * Sanitizes interpolation parameters and translated texts.
   *
   */
  this.$get = ['$injector', '$log', function ($injector, $log) {

    var cachedStrategyMap = {};

    var applyStrategies = function (value, mode, selectedStrategies) {
      angular.forEach(selectedStrategies, function (selectedStrategy) {
        if (angular.isFunction(selectedStrategy)) {
          value = selectedStrategy(value, mode);
        } else if (angular.isFunction(strategies[selectedStrategy])) {
          value = strategies[selectedStrategy](value, mode);
        } else if (angular.isString(strategies[selectedStrategy])) {
          if (!cachedStrategyMap[strategies[selectedStrategy]]) {
            try {
              cachedStrategyMap[strategies[selectedStrategy]] = $injector.get(strategies[selectedStrategy]);
            } catch (e) {
              cachedStrategyMap[strategies[selectedStrategy]] = function() {};
              throw new Error('pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: \'' + selectedStrategy + '\'');
            }
          }
          value = cachedStrategyMap[strategies[selectedStrategy]](value, mode);
        } else {
          throw new Error('pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: \'' + selectedStrategy + '\'');
        }
      });
      return value;
    };

    // TODO: should be removed in 3.0
    var showNoStrategyConfiguredWarning = function () {
      if (!hasConfiguredStrategy && !hasShownNoStrategyConfiguredWarning) {
        $log.warn('pascalprecht.translate.$translateSanitization: No sanitization strategy has been configured. This can have serious security implications. See http://angular-translate.github.io/docs/#/guide/19_security for details.');
        hasShownNoStrategyConfiguredWarning = true;
      }
    };

    if ($injector.has('$sanitize')) {
      $sanitize = $injector.get('$sanitize');
    }

    return {
      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translateSanitization#useStrategy
       * @methodOf pascalprecht.translate.$translateSanitization
       *
       * @description
       * Selects a sanitization strategy. When an array is provided the strategies will be executed in order.
       *
       * @param {string|StrategyFunction|array} strategy The sanitization strategy / strategies which should be used. Either a name of an existing strategy, a custom strategy function, or an array consisting of multiple names and / or custom functions.
       */
      useStrategy: (function (self) {
        return function (strategy) {
          self.useStrategy(strategy);
        };
      })(this),

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translateSanitization#sanitize
       * @methodOf pascalprecht.translate.$translateSanitization
       *
       * @description
       * Sanitizes a value.
       *
       * @param {string|object} value The value which should be sanitized.
       * @param {string} mode The current sanitization mode, either 'params' or 'text'.
       * @param {string|StrategyFunction|array} [strategy] Optional custom strategy which should be used instead of the currently selected strategy.
       * @returns {string|object} sanitized value
       */
      sanitize: function (value, mode, strategy) {
        if (!currentStrategy) {
          showNoStrategyConfiguredWarning();
        }

        if (arguments.length < 3) {
          strategy = currentStrategy;
        }

        if (!strategy) {
          return value;
        }

        var selectedStrategies = angular.isArray(strategy) ? strategy : [strategy];
        return applyStrategies(value, mode, selectedStrategies);
      }
    };
  }];

  var htmlEscapeValue = function (value) {
    var element = angular.element('<div></div>');
    element.text(value); // not chainable, see #1044
    return element.html();
  };

  var htmlSanitizeValue = function (value) {
    if (!$sanitize) {
      throw new Error('pascalprecht.translate.$translateSanitization: Error cannot find $sanitize service. Either include the ngSanitize module (https://docs.angularjs.org/api/ngSanitize) or use a sanitization strategy which does not depend on $sanitize, such as \'escape\'.');
    }
    return $sanitize(value);
  };

  var mapInterpolationParameters = function (value, iteratee) {
    if (angular.isObject(value)) {
      var result = angular.isArray(value) ? [] : {};

      angular.forEach(value, function (propertyValue, propertyKey) {
        result[propertyKey] = mapInterpolationParameters(propertyValue, iteratee);
      });

      return result;
    } else if (angular.isNumber(value)) {
      return value;
    } else {
      return iteratee(value);
    }
  };
}

/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateProvider
 * @description
 *
 * $translateProvider allows developers to register translation-tables, asynchronous loaders
 * and similar to configure translation behavior directly inside of a module.
 *
 */
angular.module('pascalprecht.translate')
.constant('pascalprechtTranslateOverrider', {})
.provider('$translate', $translate);

function $translate($STORAGE_KEY, $windowProvider, $translateSanitizationProvider, pascalprechtTranslateOverrider) {

  'use strict';

  var $translationTable = {},
      $preferredLanguage,
      $availableLanguageKeys = [],
      $languageKeyAliases,
      $fallbackLanguage,
      $fallbackWasString,
      $uses,
      $nextLang,
      $storageFactory,
      $storageKey = $STORAGE_KEY,
      $storagePrefix,
      $missingTranslationHandlerFactory,
      $interpolationFactory,
      $interpolatorFactories = [],
      $loaderFactory,
      $cloakClassName = 'translate-cloak',
      $loaderOptions,
      $notFoundIndicatorLeft,
      $notFoundIndicatorRight,
      $postCompilingEnabled = false,
      $forceAsyncReloadEnabled = false,
      $nestedObjectDelimeter = '.',
      $isReady = false,
      loaderCache,
      directivePriority = 0,
      statefulFilter = true,
      uniformLanguageTagResolver = 'default',
      languageTagResolver = {
        'default': function (tag) {
          return (tag || '').split('-').join('_');
        },
        java: function (tag) {
          var temp = (tag || '').split('-').join('_');
          var parts = temp.split('_');
          return parts.length > 1 ? (parts[0].toLowerCase() + '_' + parts[1].toUpperCase()) : temp;
        },
        bcp47: function (tag) {
          var temp = (tag || '').split('_').join('-');
          var parts = temp.split('-');
          return parts.length > 1 ? (parts[0].toLowerCase() + '-' + parts[1].toUpperCase()) : temp;
        }
      };

  var version = '2.8.1';

  // tries to determine the browsers language
  var getFirstBrowserLanguage = function () {

    // internal purpose only
    if (angular.isFunction(pascalprechtTranslateOverrider.getLocale)) {
      return pascalprechtTranslateOverrider.getLocale();
    }

    var nav = $windowProvider.$get().navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i,
        language;

    // support for HTML 5.1 "navigator.languages"
    if (angular.isArray(nav.languages)) {
      for (i = 0; i < nav.languages.length; i++) {
        language = nav.languages[i];
        if (language && language.length) {
          return language;
        }
      }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = nav[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        return language;
      }
    }

    return null;
  };
  getFirstBrowserLanguage.displayName = 'angular-translate/service: getFirstBrowserLanguage';

  // tries to determine the browsers locale
  var getLocale = function () {
    var locale = getFirstBrowserLanguage() || '';
    if (languageTagResolver[uniformLanguageTagResolver]) {
      locale = languageTagResolver[uniformLanguageTagResolver](locale);
    }
    return locale;
  };
  getLocale.displayName = 'angular-translate/service: getLocale';

  /**
   * @name indexOf
   * @private
   *
   * @description
   * indexOf polyfill. Kinda sorta.
   *
   * @param {array} array Array to search in.
   * @param {string} searchElement Element to search for.
   *
   * @returns {int} Index of search element.
   */
  var indexOf = function(array, searchElement) {
    for (var i = 0, len = array.length; i < len; i++) {
      if (array[i] === searchElement) {
        return i;
      }
    }
    return -1;
  };

  /**
   * @name trim
   * @private
   *
   * @description
   * trim polyfill
   *
   * @returns {string} The string stripped of whitespace from both ends
   */
  var trim = function() {
    return this.toString().replace(/^\s+|\s+$/g, '');
  };

  var negotiateLocale = function (preferred) {

    var avail = [],
        locale = angular.lowercase(preferred),
        i = 0,
        n = $availableLanguageKeys.length;

    for (; i < n; i++) {
      avail.push(angular.lowercase($availableLanguageKeys[i]));
    }

    if (indexOf(avail, locale) > -1) {
      return preferred;
    }

    if ($languageKeyAliases) {
      var alias;
      for (var langKeyAlias in $languageKeyAliases) {
        var hasWildcardKey = false;
        var hasExactKey = Object.prototype.hasOwnProperty.call($languageKeyAliases, langKeyAlias) &&
          angular.lowercase(langKeyAlias) === angular.lowercase(preferred);

        if (langKeyAlias.slice(-1) === '*') {
          hasWildcardKey = langKeyAlias.slice(0, -1) === preferred.slice(0, langKeyAlias.length-1);
        }
        if (hasExactKey || hasWildcardKey) {
          alias = $languageKeyAliases[langKeyAlias];
          if (indexOf(avail, angular.lowercase(alias)) > -1) {
            return alias;
          }
        }
      }
    }

    if (preferred) {
      var parts = preferred.split('_');

      if (parts.length > 1 && indexOf(avail, angular.lowercase(parts[0])) > -1) {
        return parts[0];
      }
    }

    // If everything fails, just return the preferred, unchanged.
    return preferred;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#translations
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Registers a new translation table for specific language key.
   *
   * To register a translation table for specific language, pass a defined language
   * key as first parameter.
   *
   * <pre>
   *  // register translation table for language: 'de_DE'
   *  $translateProvider.translations('de_DE', {
   *    'GREETING': 'Hallo Welt!'
   *  });
   *
   *  // register another one
   *  $translateProvider.translations('en_US', {
   *    'GREETING': 'Hello world!'
   *  });
   * </pre>
   *
   * When registering multiple translation tables for for the same language key,
   * the actual translation table gets extended. This allows you to define module
   * specific translation which only get added, once a specific module is loaded in
   * your app.
   *
   * Invoking this method with no arguments returns the translation table which was
   * registered with no language key. Invoking it with a language key returns the
   * related translation table.
   *
   * @param {string} key A language key.
   * @param {object} translationTable A plain old JavaScript object that represents a translation table.
   *
   */
  var translations = function (langKey, translationTable) {

    if (!langKey && !translationTable) {
      return $translationTable;
    }

    if (langKey && !translationTable) {
      if (angular.isString(langKey)) {
        return $translationTable[langKey];
      }
    } else {
      if (!angular.isObject($translationTable[langKey])) {
        $translationTable[langKey] = {};
      }
      angular.extend($translationTable[langKey], flatObject(translationTable));
    }
    return this;
  };

  this.translations = translations;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#cloakClassName
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   *
   * Let's you change the class name for `translate-cloak` directive.
   * Default class name is `translate-cloak`.
   *
   * @param {string} name translate-cloak class name
   */
  this.cloakClassName = function (name) {
    if (!name) {
      return $cloakClassName;
    }
    $cloakClassName = name;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#nestedObjectDelimeter
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   *
   * Let's you change the delimiter for namespaced translations.
   * Default delimiter is `.`.
   *
   * @param {string} delimiter namespace separator
   */
  this.nestedObjectDelimeter = function (delimiter) {
    if (!delimiter) {
      return $nestedObjectDelimeter;
    }
    $nestedObjectDelimeter = delimiter;
    return this;
  };

  /**
   * @name flatObject
   * @private
   *
   * @description
   * Flats an object. This function is used to flatten given translation data with
   * namespaces, so they are later accessible via dot notation.
   */
  var flatObject = function (data, path, result, prevKey) {
    var key, keyWithPath, keyWithShortPath, val;

    if (!path) {
      path = [];
    }
    if (!result) {
      result = {};
    }
    for (key in data) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) {
        continue;
      }
      val = data[key];
      if (angular.isObject(val)) {
        flatObject(val, path.concat(key), result, key);
      } else {
        keyWithPath = path.length ? ('' + path.join($nestedObjectDelimeter) + $nestedObjectDelimeter + key) : key;
        if(path.length && key === prevKey){
          // Create shortcut path (foo.bar == foo.bar.bar)
          keyWithShortPath = '' + path.join($nestedObjectDelimeter);
          // Link it to original path
          result[keyWithShortPath] = '@:' + keyWithPath;
        }
        result[keyWithPath] = val;
      }
    }
    return result;
  };
  flatObject.displayName = 'flatObject';

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#addInterpolation
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Adds interpolation services to angular-translate, so it can manage them.
   *
   * @param {object} factory Interpolation service factory
   */
  this.addInterpolation = function (factory) {
    $interpolatorFactories.push(factory);
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useMessageFormatInterpolation
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use interpolation functionality of messageformat.js.
   * This is useful when having high level pluralization and gender selection.
   */
  this.useMessageFormatInterpolation = function () {
    return this.useInterpolation('$translateMessageFormatInterpolation');
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useInterpolation
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate which interpolation style to use as default, application-wide.
   * Simply pass a factory/service name. The interpolation service has to implement
   * the correct interface.
   *
   * @param {string} factory Interpolation service name.
   */
  this.useInterpolation = function (factory) {
    $interpolationFactory = factory;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useSanitizeStrategy
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Simply sets a sanitation strategy type.
   *
   * @param {string} value Strategy type.
   */
  this.useSanitizeValueStrategy = function (value) {
    $translateSanitizationProvider.useStrategy(value);
    return this;
  };

 /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#preferredLanguage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells the module which of the registered translation tables to use for translation
   * at initial startup by passing a language key. Similar to `$translateProvider#use`
   * only that it says which language to **prefer**.
   *
   * @param {string} langKey A language key.
   */
  this.preferredLanguage = function(langKey) {
    if (langKey) {
      setupPreferredLanguage(langKey);
      return this;
    }
    return $preferredLanguage;
  };
  var setupPreferredLanguage = function (langKey) {
    if (langKey) {
      $preferredLanguage = langKey;
    }
    return $preferredLanguage;
  };
  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#translationNotFoundIndicator
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets an indicator which is used when a translation isn't found. E.g. when
   * setting the indicator as 'X' and one tries to translate a translation id
   * called `NOT_FOUND`, this will result in `X NOT_FOUND X`.
   *
   * Internally this methods sets a left indicator and a right indicator using
   * `$translateProvider.translationNotFoundIndicatorLeft()` and
   * `$translateProvider.translationNotFoundIndicatorRight()`.
   *
   * **Note**: These methods automatically add a whitespace between the indicators
   * and the translation id.
   *
   * @param {string} indicator An indicator, could be any string.
   */
  this.translationNotFoundIndicator = function (indicator) {
    this.translationNotFoundIndicatorLeft(indicator);
    this.translationNotFoundIndicatorRight(indicator);
    return this;
  };

  /**
   * ngdoc function
   * @name pascalprecht.translate.$translateProvider#translationNotFoundIndicatorLeft
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets an indicator which is used when a translation isn't found left to the
   * translation id.
   *
   * @param {string} indicator An indicator.
   */
  this.translationNotFoundIndicatorLeft = function (indicator) {
    if (!indicator) {
      return $notFoundIndicatorLeft;
    }
    $notFoundIndicatorLeft = indicator;
    return this;
  };

  /**
   * ngdoc function
   * @name pascalprecht.translate.$translateProvider#translationNotFoundIndicatorLeft
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets an indicator which is used when a translation isn't found right to the
   * translation id.
   *
   * @param {string} indicator An indicator.
   */
  this.translationNotFoundIndicatorRight = function (indicator) {
    if (!indicator) {
      return $notFoundIndicatorRight;
    }
    $notFoundIndicatorRight = indicator;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#fallbackLanguage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells the module which of the registered translation tables to use when missing translations
   * at initial startup by passing a language key. Similar to `$translateProvider#use`
   * only that it says which language to **fallback**.
   *
   * @param {string||array} langKey A language key.
   *
   */
  this.fallbackLanguage = function (langKey) {
    fallbackStack(langKey);
    return this;
  };

  var fallbackStack = function (langKey) {
    if (langKey) {
      if (angular.isString(langKey)) {
        $fallbackWasString = true;
        $fallbackLanguage = [ langKey ];
      } else if (angular.isArray(langKey)) {
        $fallbackWasString = false;
        $fallbackLanguage = langKey;
      }
      if (angular.isString($preferredLanguage)  && indexOf($fallbackLanguage, $preferredLanguage) < 0) {
        $fallbackLanguage.push($preferredLanguage);
      }

      return this;
    } else {
      if ($fallbackWasString) {
        return $fallbackLanguage[0];
      } else {
        return $fallbackLanguage;
      }
    }
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#use
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Set which translation table to use for translation by given language key. When
   * trying to 'use' a language which isn't provided, it'll throw an error.
   *
   * You actually don't have to use this method since `$translateProvider#preferredLanguage`
   * does the job too.
   *
   * @param {string} langKey A language key.
   */
  this.use = function (langKey) {
    if (langKey) {
      if (!$translationTable[langKey] && (!$loaderFactory)) {
        // only throw an error, when not loading translation data asynchronously
        throw new Error('$translateProvider couldn\'t find translationTable for langKey: \'' + langKey + '\'');
      }
      $uses = langKey;
      return this;
    }
    return $uses;
  };

 /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#storageKey
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells the module which key must represent the choosed language by a user in the storage.
   *
   * @param {string} key A key for the storage.
   */
  var storageKey = function(key) {
    if (!key) {
      if ($storagePrefix) {
        return $storagePrefix + $storageKey;
      }
      return $storageKey;
    }
    $storageKey = key;
    return this;
  };

  this.storageKey = storageKey;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useUrlLoader
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateUrlLoader` extension service as loader.
   *
   * @param {string} url Url
   * @param {Object=} options Optional configuration object
   */
  this.useUrlLoader = function (url, options) {
    return this.useLoader('$translateUrlLoader', angular.extend({ url: url }, options));
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useStaticFilesLoader
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateStaticFilesLoader` extension service as loader.
   *
   * @param {Object=} options Optional configuration object
   */
  this.useStaticFilesLoader = function (options) {
    return this.useLoader('$translateStaticFilesLoader', options);
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useLoader
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use any other service as loader.
   *
   * @param {string} loaderFactory Factory name to use
   * @param {Object=} options Optional configuration object
   */
  this.useLoader = function (loaderFactory, options) {
    $loaderFactory = loaderFactory;
    $loaderOptions = options || {};
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useLocalStorage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateLocalStorage` service as storage layer.
   *
   */
  this.useLocalStorage = function () {
    return this.useStorage('$translateLocalStorage');
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useCookieStorage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateCookieStorage` service as storage layer.
   */
  this.useCookieStorage = function () {
    return this.useStorage('$translateCookieStorage');
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useStorage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use custom service as storage layer.
   */
  this.useStorage = function (storageFactory) {
    $storageFactory = storageFactory;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#storagePrefix
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets prefix for storage key.
   *
   * @param {string} prefix Storage key prefix
   */
  this.storagePrefix = function (prefix) {
    if (!prefix) {
      return prefix;
    }
    $storagePrefix = prefix;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useMissingTranslationHandlerLog
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use built-in log handler when trying to translate
   * a translation Id which doesn't exist.
   *
   * This is actually a shortcut method for `useMissingTranslationHandler()`.
   *
   */
  this.useMissingTranslationHandlerLog = function () {
    return this.useMissingTranslationHandler('$translateMissingTranslationHandlerLog');
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useMissingTranslationHandler
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Expects a factory name which later gets instantiated with `$injector`.
   * This method can be used to tell angular-translate to use a custom
   * missingTranslationHandler. Just build a factory which returns a function
   * and expects a translation id as argument.
   *
   * Example:
   * <pre>
   *  app.config(function ($translateProvider) {
   *    $translateProvider.useMissingTranslationHandler('customHandler');
   *  });
   *
   *  app.factory('customHandler', function (dep1, dep2) {
   *    return function (translationId) {
   *      // something with translationId and dep1 and dep2
   *    };
   *  });
   * </pre>
   *
   * @param {string} factory Factory name
   */
  this.useMissingTranslationHandler = function (factory) {
    $missingTranslationHandlerFactory = factory;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#usePostCompiling
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * If post compiling is enabled, all translated values will be processed
   * again with AngularJS' $compile.
   *
   * Example:
   * <pre>
   *  app.config(function ($translateProvider) {
   *    $translateProvider.usePostCompiling(true);
   *  });
   * </pre>
   *
   * @param {string} factory Factory name
   */
  this.usePostCompiling = function (value) {
    $postCompilingEnabled = !(!value);
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#forceAsyncReload
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * If force async reload is enabled, async loader will always be called
   * even if $translationTable already contains the language key, adding
   * possible new entries to the $translationTable.
   *
   * Example:
   * <pre>
   *  app.config(function ($translateProvider) {
   *    $translateProvider.forceAsyncReload(true);
   *  });
   * </pre>
   *
   * @param {boolean} value - valid values are true or false
   */
  this.forceAsyncReload = function (value) {
    $forceAsyncReloadEnabled = !(!value);
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#uniformLanguageTag
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate which language tag should be used as a result when determining
   * the current browser language.
   *
   * This setting must be set before invoking {@link pascalprecht.translate.$translateProvider#methods_determinePreferredLanguage determinePreferredLanguage()}.
   *
   * <pre>
   * $translateProvider
   *   .uniformLanguageTag('bcp47')
   *   .determinePreferredLanguage()
   * </pre>
   *
   * The resolver currently supports:
   * * default
   *     (traditionally: hyphens will be converted into underscores, i.e. en-US => en_US)
   *     en-US => en_US
   *     en_US => en_US
   *     en-us => en_us
   * * java
   *     like default, but the second part will be always in uppercase
   *     en-US => en_US
   *     en_US => en_US
   *     en-us => en_US
   * * BCP 47 (RFC 4646 & 4647)
   *     en-US => en-US
   *     en_US => en-US
   *     en-us => en-US
   *
   * See also:
   * * http://en.wikipedia.org/wiki/IETF_language_tag
   * * http://www.w3.org/International/core/langtags/
   * * http://tools.ietf.org/html/bcp47
   *
   * @param {string|object} options - options (or standard)
   * @param {string} options.standard - valid values are 'default', 'bcp47', 'java'
   */
  this.uniformLanguageTag = function (options) {

    if (!options) {
      options = {};
    } else if (angular.isString(options)) {
      options = {
        standard: options
      };
    }

    uniformLanguageTagResolver = options.standard;

    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#determinePreferredLanguage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to try to determine on its own which language key
   * to set as preferred language. When `fn` is given, angular-translate uses it
   * to determine a language key, otherwise it uses the built-in `getLocale()`
   * method.
   *
   * The `getLocale()` returns a language key in the format `[lang]_[country]` or
   * `[lang]` depending on what the browser provides.
   *
   * Use this method at your own risk, since not all browsers return a valid
   * locale (see {@link pascalprecht.translate.$translateProvider#methods_uniformLanguageTag uniformLanguageTag()}).
   *
   * @param {Function=} fn Function to determine a browser's locale
   */
  this.determinePreferredLanguage = function (fn) {

    var locale = (fn && angular.isFunction(fn)) ? fn() : getLocale();

    if (!$availableLanguageKeys.length) {
      $preferredLanguage = locale;
    } else {
      $preferredLanguage = negotiateLocale(locale);
    }

    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#registerAvailableLanguageKeys
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Registers a set of language keys the app will work with. Use this method in
   * combination with
   * {@link pascalprecht.translate.$translateProvider#determinePreferredLanguage determinePreferredLanguage}.
   * When available languages keys are registered, angular-translate
   * tries to find the best fitting language key depending on the browsers locale,
   * considering your language key convention.
   *
   * @param {object} languageKeys Array of language keys the your app will use
   * @param {object=} aliases Alias map.
   */
  this.registerAvailableLanguageKeys = function (languageKeys, aliases) {
    if (languageKeys) {
      $availableLanguageKeys = languageKeys;
      if (aliases) {
        $languageKeyAliases = aliases;
      }
      return this;
    }
    return $availableLanguageKeys;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useLoaderCache
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Registers a cache for internal $http based loaders.
   * {@link pascalprecht.translate.$translationCache $translationCache}.
   * When false the cache will be disabled (default). When true or undefined
   * the cache will be a default (see $cacheFactory). When an object it will
   * be treat as a cache object itself: the usage is $http({cache: cache})
   *
   * @param {object} cache boolean, string or cache-object
   */
  this.useLoaderCache = function (cache) {
    if (cache === false) {
      // disable cache
      loaderCache = undefined;
    } else if (cache === true) {
      // enable cache using AJS defaults
      loaderCache = true;
    } else if (typeof(cache) === 'undefined') {
      // enable cache using default
      loaderCache = '$translationCache';
    } else if (cache) {
      // enable cache using given one (see $cacheFactory)
      loaderCache = cache;
    }
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#directivePriority
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets the default priority of the translate directive. The standard value is `0`.
   * Calling this function without an argument will return the current value.
   *
   * @param {number} priority for the translate-directive
   */
  this.directivePriority = function (priority) {
    if (priority === undefined) {
      // getter
      return directivePriority;
    } else {
      // setter with chaining
      directivePriority = priority;
      return this;
    }
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#statefulFilter
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Since AngularJS 1.3, filters which are not stateless (depending at the scope)
   * have to explicit define this behavior.
   * Sets whether the translate filter should be stateful or stateless. The standard value is `true`
   * meaning being stateful.
   * Calling this function without an argument will return the current value.
   *
   * @param {boolean} state - defines the state of the filter
   */
  this.statefulFilter = function (state) {
    if (state === undefined) {
      // getter
      return statefulFilter;
    } else {
      // setter with chaining
      statefulFilter = state;
      return this;
    }
  };

  /**
   * @ngdoc object
   * @name pascalprecht.translate.$translate
   * @requires $interpolate
   * @requires $log
   * @requires $rootScope
   * @requires $q
   *
   * @description
   * The `$translate` service is the actual core of angular-translate. It expects a translation id
   * and optional interpolate parameters to translate contents.
   *
   * <pre>
   *  $translate('HEADLINE_TEXT').then(function (translation) {
   *    $scope.translatedText = translation;
   *  });
   * </pre>
   *
   * @param {string|array} translationId A token which represents a translation id
   *                                     This can be optionally an array of translation ids which
   *                                     results that the function returns an object where each key
   *                                     is the translation id and the value the translation.
   * @param {object=} interpolateParams An object hash for dynamic values
   * @param {string} interpolationId The id of the interpolation to use
   * @returns {object} promise
   */
  this.$get = [
    '$log',
    '$injector',
    '$rootScope',
    '$q',
    function ($log, $injector, $rootScope, $q) {

      var Storage,
          defaultInterpolator = $injector.get($interpolationFactory || '$translateDefaultInterpolation'),
          pendingLoader = false,
          interpolatorHashMap = {},
          langPromises = {},
          fallbackIndex,
          startFallbackIteration;

      var $translate = function (translationId, interpolateParams, interpolationId, defaultTranslationText) {

        // Duck detection: If the first argument is an array, a bunch of translations was requested.
        // The result is an object.
        if (angular.isArray(translationId)) {
          // Inspired by Q.allSettled by Kris Kowal
          // https://github.com/kriskowal/q/blob/b0fa72980717dc202ffc3cbf03b936e10ebbb9d7/q.js#L1553-1563
          // This transforms all promises regardless resolved or rejected
          var translateAll = function (translationIds) {
            var results = {}; // storing the actual results
            var promises = []; // promises to wait for
            // Wraps the promise a) being always resolved and b) storing the link id->value
            var translate = function (translationId) {
              var deferred = $q.defer();
              var regardless = function (value) {
                results[translationId] = value;
                deferred.resolve([translationId, value]);
              };
              // we don't care whether the promise was resolved or rejected; just store the values
              $translate(translationId, interpolateParams, interpolationId, defaultTranslationText).then(regardless, regardless);
              return deferred.promise;
            };
            for (var i = 0, c = translationIds.length; i < c; i++) {
              promises.push(translate(translationIds[i]));
            }
            // wait for all (including storing to results)
            return $q.all(promises).then(function () {
              // return the results
              return results;
            });
          };
          return translateAll(translationId);
        }

        var deferred = $q.defer();

        // trim off any whitespace
        if (translationId) {
          translationId = trim.apply(translationId);
        }

        var promiseToWaitFor = (function () {
          var promise = $preferredLanguage ?
            langPromises[$preferredLanguage] :
            langPromises[$uses];

          fallbackIndex = 0;

          if ($storageFactory && !promise) {
            // looks like there's no pending promise for $preferredLanguage or
            // $uses. Maybe there's one pending for a language that comes from
            // storage.
            var langKey = Storage.get($storageKey);
            promise = langPromises[langKey];

            if ($fallbackLanguage && $fallbackLanguage.length) {
                var index = indexOf($fallbackLanguage, langKey);
                // maybe the language from storage is also defined as fallback language
                // we increase the fallback language index to not search in that language
                // as fallback, since it's probably the first used language
                // in that case the index starts after the first element
                fallbackIndex = (index === 0) ? 1 : 0;

                // but we can make sure to ALWAYS fallback to preferred language at least
                if (indexOf($fallbackLanguage, $preferredLanguage) < 0) {
                  $fallbackLanguage.push($preferredLanguage);
                }
            }
          }
          return promise;
        }());

        if (!promiseToWaitFor) {
          // no promise to wait for? okay. Then there's no loader registered
          // nor is a one pending for language that comes from storage.
          // We can just translate.
          determineTranslation(translationId, interpolateParams, interpolationId, defaultTranslationText).then(deferred.resolve, deferred.reject);
        } else {
          var promiseResolved = function () {
            determineTranslation(translationId, interpolateParams, interpolationId, defaultTranslationText).then(deferred.resolve, deferred.reject);
          };
          promiseResolved.displayName = 'promiseResolved';

          promiseToWaitFor['finally'](promiseResolved, deferred.reject);
        }
        return deferred.promise;
      };

      /**
       * @name applyNotFoundIndicators
       * @private
       *
       * @description
       * Applies not fount indicators to given translation id, if needed.
       * This function gets only executed, if a translation id doesn't exist,
       * which is why a translation id is expected as argument.
       *
       * @param {string} translationId Translation id.
       * @returns {string} Same as given translation id but applied with not found
       * indicators.
       */
      var applyNotFoundIndicators = function (translationId) {
        // applying notFoundIndicators
        if ($notFoundIndicatorLeft) {
          translationId = [$notFoundIndicatorLeft, translationId].join(' ');
        }
        if ($notFoundIndicatorRight) {
          translationId = [translationId, $notFoundIndicatorRight].join(' ');
        }
        return translationId;
      };

      /**
       * @name useLanguage
       * @private
       *
       * @description
       * Makes actual use of a language by setting a given language key as used
       * language and informs registered interpolators to also use the given
       * key as locale.
       *
       * @param {key} Locale key.
       */
      var useLanguage = function (key) {
        $uses = key;

        // make sure to store new language key before triggering success event
        if ($storageFactory) {
          Storage.put($translate.storageKey(), $uses);
        }

        $rootScope.$emit('$translateChangeSuccess', {language: key});

        // inform default interpolator
        defaultInterpolator.setLocale($uses);

        var eachInterpolator = function (interpolator, id) {
          interpolatorHashMap[id].setLocale($uses);
        };
        eachInterpolator.displayName = 'eachInterpolatorLocaleSetter';

        // inform all others too!
        angular.forEach(interpolatorHashMap, eachInterpolator);
        $rootScope.$emit('$translateChangeEnd', {language: key});
      };

      /**
       * @name loadAsync
       * @private
       *
       * @description
       * Kicks of registered async loader using `$injector` and applies existing
       * loader options. When resolved, it updates translation tables accordingly
       * or rejects with given language key.
       *
       * @param {string} key Language key.
       * @return {Promise} A promise.
       */
      var loadAsync = function (key) {
        if (!key) {
          throw 'No language key specified for loading.';
        }

        var deferred = $q.defer();

        $rootScope.$emit('$translateLoadingStart', {language: key});
        pendingLoader = true;

        var cache = loaderCache;
        if (typeof(cache) === 'string') {
          // getting on-demand instance of loader
          cache = $injector.get(cache);
        }

        var loaderOptions = angular.extend({}, $loaderOptions, {
          key: key,
          $http: angular.extend({}, {
            cache: cache
          }, $loaderOptions.$http)
        });

        var onLoaderSuccess = function (data) {
          var translationTable = {};
          $rootScope.$emit('$translateLoadingSuccess', {language: key});

          if (angular.isArray(data)) {
            angular.forEach(data, function (table) {
              angular.extend(translationTable, flatObject(table));
            });
          } else {
            angular.extend(translationTable, flatObject(data));
          }
          pendingLoader = false;
          deferred.resolve({
            key: key,
            table: translationTable
          });
          $rootScope.$emit('$translateLoadingEnd', {language: key});
        };
        onLoaderSuccess.displayName = 'onLoaderSuccess';

        var onLoaderError = function (key) {
          $rootScope.$emit('$translateLoadingError', {language: key});
          deferred.reject(key);
          $rootScope.$emit('$translateLoadingEnd', {language: key});
        };
        onLoaderError.displayName = 'onLoaderError';

        $injector.get($loaderFactory)(loaderOptions)
          .then(onLoaderSuccess, onLoaderError);

        return deferred.promise;
      };

      if ($storageFactory) {
        Storage = $injector.get($storageFactory);

        if (!Storage.get || !Storage.put) {
          throw new Error('Couldn\'t use storage \'' + $storageFactory + '\', missing get() or put() method!');
        }
      }

      // if we have additional interpolations that were added via
      // $translateProvider.addInterpolation(), we have to map'em
      if ($interpolatorFactories.length) {
        var eachInterpolationFactory = function (interpolatorFactory) {
          var interpolator = $injector.get(interpolatorFactory);
          // setting initial locale for each interpolation service
          interpolator.setLocale($preferredLanguage || $uses);
          // make'em recognizable through id
          interpolatorHashMap[interpolator.getInterpolationIdentifier()] = interpolator;
        };
        eachInterpolationFactory.displayName = 'interpolationFactoryAdder';

        angular.forEach($interpolatorFactories, eachInterpolationFactory);
      }

      /**
       * @name getTranslationTable
       * @private
       *
       * @description
       * Returns a promise that resolves to the translation table
       * or is rejected if an error occurred.
       *
       * @param langKey
       * @returns {Q.promise}
       */
      var getTranslationTable = function (langKey) {
        var deferred = $q.defer();
        if (Object.prototype.hasOwnProperty.call($translationTable, langKey)) {
          deferred.resolve($translationTable[langKey]);
        } else if (langPromises[langKey]) {
          var onResolve = function (data) {
            translations(data.key, data.table);
            deferred.resolve(data.table);
          };
          onResolve.displayName = 'translationTableResolver';
          langPromises[langKey].then(onResolve, deferred.reject);
        } else {
          deferred.reject();
        }
        return deferred.promise;
      };

      /**
       * @name getFallbackTranslation
       * @private
       *
       * @description
       * Returns a promise that will resolve to the translation
       * or be rejected if no translation was found for the language.
       * This function is currently only used for fallback language translation.
       *
       * @param langKey The language to translate to.
       * @param translationId
       * @param interpolateParams
       * @param Interpolator
       * @returns {Q.promise}
       */
      var getFallbackTranslation = function (langKey, translationId, interpolateParams, Interpolator) {
        var deferred = $q.defer();

        var onResolve = function (translationTable) {
          if (Object.prototype.hasOwnProperty.call(translationTable, translationId)) {
            Interpolator.setLocale(langKey);
            var translation = translationTable[translationId];
            if (translation.substr(0, 2) === '@:') {
              getFallbackTranslation(langKey, translation.substr(2), interpolateParams, Interpolator)
                .then(deferred.resolve, deferred.reject);
            } else {
              deferred.resolve(Interpolator.interpolate(translationTable[translationId], interpolateParams));
            }
            Interpolator.setLocale($uses);
          } else {
            deferred.reject();
          }
        };
        onResolve.displayName = 'fallbackTranslationResolver';

        getTranslationTable(langKey).then(onResolve, deferred.reject);

        return deferred.promise;
      };

      /**
       * @name getFallbackTranslationInstant
       * @private
       *
       * @description
       * Returns a translation
       * This function is currently only used for fallback language translation.
       *
       * @param langKey The language to translate to.
       * @param translationId
       * @param interpolateParams
       * @param Interpolator
       * @returns {string} translation
       */
      var getFallbackTranslationInstant = function (langKey, translationId, interpolateParams, Interpolator) {
        var result, translationTable = $translationTable[langKey];

        if (translationTable && Object.prototype.hasOwnProperty.call(translationTable, translationId)) {
          Interpolator.setLocale(langKey);
          result = Interpolator.interpolate(translationTable[translationId], interpolateParams);
          if (result.substr(0, 2) === '@:') {
            return getFallbackTranslationInstant(langKey, result.substr(2), interpolateParams, Interpolator);
          }
          Interpolator.setLocale($uses);
        }

        return result;
      };


      /**
       * @name translateByHandler
       * @private
       *
       * Translate by missing translation handler.
       *
       * @param translationId
       * @returns translation created by $missingTranslationHandler or translationId is $missingTranslationHandler is
       * absent
       */
      var translateByHandler = function (translationId, interpolateParams) {
        // If we have a handler factory - we might also call it here to determine if it provides
        // a default text for a translationid that can't be found anywhere in our tables
        if ($missingTranslationHandlerFactory) {
          var resultString = $injector.get($missingTranslationHandlerFactory)(translationId, $uses, interpolateParams);
          if (resultString !== undefined) {
            return resultString;
          } else {
            return translationId;
          }
        } else {
          return translationId;
        }
      };

      /**
       * @name resolveForFallbackLanguage
       * @private
       *
       * Recursive helper function for fallbackTranslation that will sequentially look
       * for a translation in the fallbackLanguages starting with fallbackLanguageIndex.
       *
       * @param fallbackLanguageIndex
       * @param translationId
       * @param interpolateParams
       * @param Interpolator
       * @returns {Q.promise} Promise that will resolve to the translation.
       */
      var resolveForFallbackLanguage = function (fallbackLanguageIndex, translationId, interpolateParams, Interpolator, defaultTranslationText) {
        var deferred = $q.defer();

        if (fallbackLanguageIndex < $fallbackLanguage.length) {
          var langKey = $fallbackLanguage[fallbackLanguageIndex];
          getFallbackTranslation(langKey, translationId, interpolateParams, Interpolator).then(
            deferred.resolve,
            function () {
              // Look in the next fallback language for a translation.
              // It delays the resolving by passing another promise to resolve.
              resolveForFallbackLanguage(fallbackLanguageIndex + 1, translationId, interpolateParams, Interpolator, defaultTranslationText).then(deferred.resolve);
            }
          );
        } else {
          // No translation found in any fallback language
          // if a default translation text is set in the directive, then return this as a result
          if (defaultTranslationText) {
            deferred.resolve(defaultTranslationText);
          } else {
            // if no default translation is set and an error handler is defined, send it to the handler
            // and then return the result
            deferred.resolve(translateByHandler(translationId, interpolateParams));
          }
        }
        return deferred.promise;
      };

      /**
       * @name resolveForFallbackLanguageInstant
       * @private
       *
       * Recursive helper function for fallbackTranslation that will sequentially look
       * for a translation in the fallbackLanguages starting with fallbackLanguageIndex.
       *
       * @param fallbackLanguageIndex
       * @param translationId
       * @param interpolateParams
       * @param Interpolator
       * @returns {string} translation
       */
      var resolveForFallbackLanguageInstant = function (fallbackLanguageIndex, translationId, interpolateParams, Interpolator) {
        var result;

        if (fallbackLanguageIndex < $fallbackLanguage.length) {
          var langKey = $fallbackLanguage[fallbackLanguageIndex];
          result = getFallbackTranslationInstant(langKey, translationId, interpolateParams, Interpolator);
          if (!result) {
            result = resolveForFallbackLanguageInstant(fallbackLanguageIndex + 1, translationId, interpolateParams, Interpolator);
          }
        }
        return result;
      };

      /**
       * Translates with the usage of the fallback languages.
       *
       * @param translationId
       * @param interpolateParams
       * @param Interpolator
       * @returns {Q.promise} Promise, that resolves to the translation.
       */
      var fallbackTranslation = function (translationId, interpolateParams, Interpolator, defaultTranslationText) {
        // Start with the fallbackLanguage with index 0
        return resolveForFallbackLanguage((startFallbackIteration>0 ? startFallbackIteration : fallbackIndex), translationId, interpolateParams, Interpolator, defaultTranslationText);
      };

      /**
       * Translates with the usage of the fallback languages.
       *
       * @param translationId
       * @param interpolateParams
       * @param Interpolator
       * @returns {String} translation
       */
      var fallbackTranslationInstant = function (translationId, interpolateParams, Interpolator) {
        // Start with the fallbackLanguage with index 0
        return resolveForFallbackLanguageInstant((startFallbackIteration>0 ? startFallbackIteration : fallbackIndex), translationId, interpolateParams, Interpolator);
      };

      var determineTranslation = function (translationId, interpolateParams, interpolationId, defaultTranslationText) {

        var deferred = $q.defer();

        var table = $uses ? $translationTable[$uses] : $translationTable,
            Interpolator = (interpolationId) ? interpolatorHashMap[interpolationId] : defaultInterpolator;

        // if the translation id exists, we can just interpolate it
        if (table && Object.prototype.hasOwnProperty.call(table, translationId)) {
          var translation = table[translationId];

          // If using link, rerun $translate with linked translationId and return it
          if (translation.substr(0, 2) === '@:') {

            $translate(translation.substr(2), interpolateParams, interpolationId, defaultTranslationText)
              .then(deferred.resolve, deferred.reject);
          } else {
            deferred.resolve(Interpolator.interpolate(translation, interpolateParams));
          }
        } else {
          var missingTranslationHandlerTranslation;
          // for logging purposes only (as in $translateMissingTranslationHandlerLog), value is not returned to promise
          if ($missingTranslationHandlerFactory && !pendingLoader) {
            missingTranslationHandlerTranslation = translateByHandler(translationId, interpolateParams);
          }

          // since we couldn't translate the inital requested translation id,
          // we try it now with one or more fallback languages, if fallback language(s) is
          // configured.
          if ($uses && $fallbackLanguage && $fallbackLanguage.length) {
            fallbackTranslation(translationId, interpolateParams, Interpolator, defaultTranslationText)
                .then(function (translation) {
                  deferred.resolve(translation);
                }, function (_translationId) {
                  deferred.reject(applyNotFoundIndicators(_translationId));
                });
          } else if ($missingTranslationHandlerFactory && !pendingLoader && missingTranslationHandlerTranslation) {
            // looks like the requested translation id doesn't exists.
            // Now, if there is a registered handler for missing translations and no
            // asyncLoader is pending, we execute the handler
            if (defaultTranslationText) {
              deferred.resolve(defaultTranslationText);
              } else {
                deferred.resolve(missingTranslationHandlerTranslation);
              }
          } else {
            if (defaultTranslationText) {
              deferred.resolve(defaultTranslationText);
            } else {
              deferred.reject(applyNotFoundIndicators(translationId));
            }
          }
        }
        return deferred.promise;
      };

      var determineTranslationInstant = function (translationId, interpolateParams, interpolationId) {

        var result, table = $uses ? $translationTable[$uses] : $translationTable,
            Interpolator = defaultInterpolator;

        // if the interpolation id exists use custom interpolator
        if (interpolatorHashMap && Object.prototype.hasOwnProperty.call(interpolatorHashMap, interpolationId)) {
          Interpolator = interpolatorHashMap[interpolationId];
        }

        // if the translation id exists, we can just interpolate it
        if (table && Object.prototype.hasOwnProperty.call(table, translationId)) {
          var translation = table[translationId];

          // If using link, rerun $translate with linked translationId and return it
          if (translation.substr(0, 2) === '@:') {
            result = determineTranslationInstant(translation.substr(2), interpolateParams, interpolationId);
          } else {
            result = Interpolator.interpolate(translation, interpolateParams);
          }
        } else {
          var missingTranslationHandlerTranslation;
          // for logging purposes only (as in $translateMissingTranslationHandlerLog), value is not returned to promise
          if ($missingTranslationHandlerFactory && !pendingLoader) {
            missingTranslationHandlerTranslation = translateByHandler(translationId, interpolateParams);
          }

          // since we couldn't translate the inital requested translation id,
          // we try it now with one or more fallback languages, if fallback language(s) is
          // configured.
          if ($uses && $fallbackLanguage && $fallbackLanguage.length) {
            fallbackIndex = 0;
            result = fallbackTranslationInstant(translationId, interpolateParams, Interpolator);
          } else if ($missingTranslationHandlerFactory && !pendingLoader && missingTranslationHandlerTranslation) {
            // looks like the requested translation id doesn't exists.
            // Now, if there is a registered handler for missing translations and no
            // asyncLoader is pending, we execute the handler
            result = missingTranslationHandlerTranslation;
          } else {
            result = applyNotFoundIndicators(translationId);
          }
        }

        return result;
      };

      var clearNextLangAndPromise = function(key) {
        if ($nextLang === key) {
          $nextLang = undefined;
        }
        langPromises[key] = undefined;
      };

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#preferredLanguage
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the language key for the preferred language.
       *
       * @param {string} langKey language String or Array to be used as preferredLanguage (changing at runtime)
       *
       * @return {string} preferred language key
       */
      $translate.preferredLanguage = function (langKey) {
        if(langKey) {
          setupPreferredLanguage(langKey);
        }
        return $preferredLanguage;
      };

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#cloakClassName
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the configured class name for `translate-cloak` directive.
       *
       * @return {string} cloakClassName
       */
      $translate.cloakClassName = function () {
        return $cloakClassName;
      };

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#nestedObjectDelimeter
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the configured delimiter for nested namespaces.
       *
       * @return {string} nestedObjectDelimeter
       */
      $translate.nestedObjectDelimeter = function () {
        return $nestedObjectDelimeter;
      };

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#fallbackLanguage
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the language key for the fallback languages or sets a new fallback stack.
       *
       * @param {string=} langKey language String or Array of fallback languages to be used (to change stack at runtime)
       *
       * @return {string||array} fallback language key
       */
      $translate.fallbackLanguage = function (langKey) {
        if (langKey !== undefined && langKey !== null) {
          fallbackStack(langKey);

          // as we might have an async loader initiated and a new translation language might have been defined
          // we need to add the promise to the stack also. So - iterate.
          if ($loaderFactory) {
            if ($fallbackLanguage && $fallbackLanguage.length) {
              for (var i = 0, len = $fallbackLanguage.length; i < len; i++) {
                if (!langPromises[$fallbackLanguage[i]]) {
                  langPromises[$fallbackLanguage[i]] = loadAsync($fallbackLanguage[i]);
                }
              }
            }
          }
          $translate.use($translate.use());
        }
        if ($fallbackWasString) {
          return $fallbackLanguage[0];
        } else {
          return $fallbackLanguage;
        }

      };

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#useFallbackLanguage
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Sets the first key of the fallback language stack to be used for translation.
       * Therefore all languages in the fallback array BEFORE this key will be skipped!
       *
       * @param {string=} langKey Contains the langKey the iteration shall start with. Set to false if you want to
       * get back to the whole stack
       */
      $translate.useFallbackLanguage = function (langKey) {
        if (langKey !== undefined && langKey !== null) {
          if (!langKey) {
            startFallbackIteration = 0;
          } else {
            var langKeyPosition = indexOf($fallbackLanguage, langKey);
            if (langKeyPosition > -1) {
              startFallbackIteration = langKeyPosition;
            }
          }

        }

      };

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#proposedLanguage
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the language key of language that is currently loaded asynchronously.
       *
       * @return {string} language key
       */
      $translate.proposedLanguage = function () {
        return $nextLang;
      };

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#storage
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns registered storage.
       *
       * @return {object} Storage
       */
      $translate.storage = function () {
        return Storage;
      };

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#use
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Tells angular-translate which language to use by given language key. This method is
       * used to change language at runtime. It also takes care of storing the language
       * key in a configured store to let your app remember the choosed language.
       *
       * When trying to 'use' a language which isn't available it tries to load it
       * asynchronously with registered loaders.
       *
       * Returns promise object with loaded language file data or string of the currently used language.
       *
       * If no or a falsy key is given it returns the currently used language key.
       * The returned string will be ```undefined``` if setting up $translate hasn't finished.
       * @example
       * $translate.use("en_US").then(function(data){
       *   $scope.text = $translate("HELLO");
       * });
       *
       * @param {string} [key] Language key
       * @return {object|string} Promise with loaded language data or the language key if a falsy param was given.
       */
      $translate.use = function (key) {
        if (!key) {
          return $uses;
        }

        var deferred = $q.defer();

        $rootScope.$emit('$translateChangeStart', {language: key});

        // Try to get the aliased language key
        var aliasedKey = negotiateLocale(key);
        if (aliasedKey) {
          key = aliasedKey;
        }

        // if there isn't a translation table for the language we've requested,
        // we load it asynchronously
        if (($forceAsyncReloadEnabled || !$translationTable[key]) && $loaderFactory && !langPromises[key]) {
          $nextLang = key;
          langPromises[key] = loadAsync(key).then(function (translation) {
            translations(translation.key, translation.table);
            deferred.resolve(translation.key);
            if ($nextLang === key) {
              useLanguage(translation.key);
            }
            return translation;
          }, function (key) {
            $rootScope.$emit('$translateChangeError', {language: key});
            deferred.reject(key);
            $rootScope.$emit('$translateChangeEnd', {language: key});
            return $q.reject(key);
          });
          langPromises[key]['finally'](function () {
            clearNextLangAndPromise(key);
          });
        } else if ($nextLang === key && langPromises[key]) {
          // we are already loading this asynchronously
          // resolve our new deferred when the old langPromise is resolved
          langPromises[key].then(function (translation) {
            deferred.resolve(translation.key);
            return translation;
          }, function (key) {
            deferred.reject(key);
            return $q.reject(key);
          });
        } else {
          deferred.resolve(key);
          useLanguage(key);
        }

        return deferred.promise;
      };

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#storageKey
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the key for the storage.
       *
       * @return {string} storage key
       */
      $translate.storageKey = function () {
        return storageKey();
      };

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#isPostCompilingEnabled
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns whether post compiling is enabled or not
       *
       * @return {bool} storage key
       */
      $translate.isPostCompilingEnabled = function () {
        return $postCompilingEnabled;
      };

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#isForceAsyncReloadEnabled
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns whether force async reload is enabled or not
       *
       * @return {boolean} forceAsyncReload value
       */
      $translate.isForceAsyncReloadEnabled = function () {
        return $forceAsyncReloadEnabled;
      };

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#refresh
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Refreshes a translation table pointed by the given langKey. If langKey is not specified,
       * the module will drop all existent translation tables and load new version of those which
       * are currently in use.
       *
       * Refresh means that the module will drop target translation table and try to load it again.
       *
       * In case there are no loaders registered the refresh() method will throw an Error.
       *
       * If the module is able to refresh translation tables refresh() method will broadcast
       * $translateRefreshStart and $translateRefreshEnd events.
       *
       * @example
       * // this will drop all currently existent translation tables and reload those which are
       * // currently in use
       * $translate.refresh();
       * // this will refresh a translation table for the en_US language
       * $translate.refresh('en_US');
       *
       * @param {string} langKey A language key of the table, which has to be refreshed
       *
       * @return {promise} Promise, which will be resolved in case a translation tables refreshing
       * process is finished successfully, and reject if not.
       */
      $translate.refresh = function (langKey) {
        if (!$loaderFactory) {
          throw new Error('Couldn\'t refresh translation table, no loader registered!');
        }

        var deferred = $q.defer();

        function resolve() {
          deferred.resolve();
          $rootScope.$emit('$translateRefreshEnd', {language: langKey});
        }

        function reject() {
          deferred.reject();
          $rootScope.$emit('$translateRefreshEnd', {language: langKey});
        }

        $rootScope.$emit('$translateRefreshStart', {language: langKey});

        if (!langKey) {
          // if there's no language key specified we refresh ALL THE THINGS!
          var tables = [], loadingKeys = {};

          // reload registered fallback languages
          if ($fallbackLanguage && $fallbackLanguage.length) {
            for (var i = 0, len = $fallbackLanguage.length; i < len; i++) {
              tables.push(loadAsync($fallbackLanguage[i]));
              loadingKeys[$fallbackLanguage[i]] = true;
            }
          }

          // reload currently used language
          if ($uses && !loadingKeys[$uses]) {
            tables.push(loadAsync($uses));
          }

          var allTranslationsLoaded = function (tableData) {
            $translationTable = {};
            angular.forEach(tableData, function (data) {
              translations(data.key, data.table);
            });
            if ($uses) {
              useLanguage($uses);
            }
            resolve();
          };
          allTranslationsLoaded.displayName = 'refreshPostProcessor';

          $q.all(tables).then(allTranslationsLoaded, reject);

        } else if ($translationTable[langKey]) {

          var oneTranslationsLoaded = function (data) {
            translations(data.key, data.table);
            if (langKey === $uses) {
              useLanguage($uses);
            }
            resolve();
          };
          oneTranslationsLoaded.displayName = 'refreshPostProcessor';

          loadAsync(langKey).then(oneTranslationsLoaded, reject);

        } else {
          reject();
        }
        return deferred.promise;
      };

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#instant
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns a translation instantly from the internal state of loaded translation. All rules
       * regarding the current language, the preferred language of even fallback languages will be
       * used except any promise handling. If a language was not found, an asynchronous loading
       * will be invoked in the background.
       *
       * @param {string|array} translationId A token which represents a translation id
       *                                     This can be optionally an array of translation ids which
       *                                     results that the function's promise returns an object where
       *                                     each key is the translation id and the value the translation.
       * @param {object} interpolateParams Params
       * @param {string} interpolationId The id of the interpolation to use
       *
       * @return {string|object} translation
       */
      $translate.instant = function (translationId, interpolateParams, interpolationId) {

        // Detect undefined and null values to shorten the execution and prevent exceptions
        if (translationId === null || angular.isUndefined(translationId)) {
          return translationId;
        }

        // Duck detection: If the first argument is an array, a bunch of translations was requested.
        // The result is an object.
        if (angular.isArray(translationId)) {
          var results = {};
          for (var i = 0, c = translationId.length; i < c; i++) {
            results[translationId[i]] = $translate.instant(translationId[i], interpolateParams, interpolationId);
          }
          return results;
        }

        // We discarded unacceptable values. So we just need to verify if translationId is empty String
        if (angular.isString(translationId) && translationId.length < 1) {
          return translationId;
        }

        // trim off any whitespace
        if (translationId) {
          translationId = trim.apply(translationId);
        }

        var result, possibleLangKeys = [];
        if ($preferredLanguage) {
          possibleLangKeys.push($preferredLanguage);
        }
        if ($uses) {
          possibleLangKeys.push($uses);
        }
        if ($fallbackLanguage && $fallbackLanguage.length) {
          possibleLangKeys = possibleLangKeys.concat($fallbackLanguage);
        }
        for (var j = 0, d = possibleLangKeys.length; j < d; j++) {
          var possibleLangKey = possibleLangKeys[j];
          if ($translationTable[possibleLangKey]) {
            if (typeof $translationTable[possibleLangKey][translationId] !== 'undefined') {
              result = determineTranslationInstant(translationId, interpolateParams, interpolationId);
            } else if ($notFoundIndicatorLeft || $notFoundIndicatorRight) {
              result = applyNotFoundIndicators(translationId);
            }
          }
          if (typeof result !== 'undefined') {
            break;
          }
        }

        if (!result && result !== '') {
          // Return translation of default interpolator if not found anything.
          result = defaultInterpolator.interpolate(translationId, interpolateParams);
          if ($missingTranslationHandlerFactory && !pendingLoader) {
            result = translateByHandler(translationId, interpolateParams);
          }
        }

        return result;
      };

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#versionInfo
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the current version information for the angular-translate library
       *
       * @return {string} angular-translate version
       */
      $translate.versionInfo = function () {
        return version;
      };

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#loaderCache
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the defined loaderCache.
       *
       * @return {boolean|string|object} current value of loaderCache
       */
      $translate.loaderCache = function () {
        return loaderCache;
      };

      // internal purpose only
      $translate.directivePriority = function () {
        return directivePriority;
      };

      // internal purpose only
      $translate.statefulFilter = function () {
        return statefulFilter;
      };

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#isReady
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns whether the service is "ready" to translate (i.e. loading 1st language).
       *
       * See also {@link pascalprecht.translate.$translate#methods_onReady onReady()}.
       *
       * @return {boolean} current value of ready
       */
      $translate.isReady = function () {
        return $isReady;
      };

      var $onReadyDeferred = $q.defer();
      $onReadyDeferred.promise.then(function () {
        $isReady = true;
      });

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#onReady
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns whether the service is "ready" to translate (i.e. loading 1st language).
       *
       * See also {@link pascalprecht.translate.$translate#methods_isReady isReady()}.
       *
       * @param {Function=} fn Function to invoke when service is ready
       * @return {object} Promise resolved when service is ready
       */
      $translate.onReady = function (fn) {
        var deferred = $q.defer();
        if (angular.isFunction(fn)) {
          deferred.promise.then(fn);
        }
        if ($isReady) {
          deferred.resolve();
        } else {
          $onReadyDeferred.promise.then(deferred.resolve);
        }
        return deferred.promise;
      };

      // Whenever $translateReady is being fired, this will ensure the state of $isReady
      var globalOnReadyListener = $rootScope.$on('$translateReady', function () {
        $onReadyDeferred.resolve();
        globalOnReadyListener(); // one time only
        globalOnReadyListener = null;
      });
      var globalOnChangeListener = $rootScope.$on('$translateChangeEnd', function () {
        $onReadyDeferred.resolve();
        globalOnChangeListener(); // one time only
        globalOnChangeListener = null;
      });

      if ($loaderFactory) {

        // If at least one async loader is defined and there are no
        // (default) translations available we should try to load them.
        if (angular.equals($translationTable, {})) {
          if ($translate.use()) {
            $translate.use($translate.use());
          }
        }

        // Also, if there are any fallback language registered, we start
        // loading them asynchronously as soon as we can.
        if ($fallbackLanguage && $fallbackLanguage.length) {
          var processAsyncResult = function (translation) {
            translations(translation.key, translation.table);
            $rootScope.$emit('$translateChangeEnd', { language: translation.key });
            return translation;
          };
          for (var i = 0, len = $fallbackLanguage.length; i < len; i++) {
            var fallbackLanguageId = $fallbackLanguage[i];
            if ($forceAsyncReloadEnabled || !$translationTable[fallbackLanguageId]) {
              langPromises[fallbackLanguageId] = loadAsync(fallbackLanguageId).then(processAsyncResult);
            }
          }
        }
      } else {
        $rootScope.$emit('$translateReady', { language: $translate.use() });
      }

      return $translate;
    }
  ];
}
$translate.$inject = ['$STORAGE_KEY', '$windowProvider', '$translateSanitizationProvider', 'pascalprechtTranslateOverrider'];

$translate.displayName = 'displayName';

/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateDefaultInterpolation
 * @requires $interpolate
 *
 * @description
 * Uses angular's `$interpolate` services to interpolate strings against some values.
 *
 * Be aware to configure a proper sanitization strategy.
 *
 * See also:
 * * {@link pascalprecht.translate.$translateSanitization}
 *
 * @return {object} $translateDefaultInterpolation Interpolator service
 */
angular.module('pascalprecht.translate').factory('$translateDefaultInterpolation', $translateDefaultInterpolation);

function $translateDefaultInterpolation ($interpolate, $translateSanitization) {

  'use strict';

  var $translateInterpolator = {},
      $locale,
      $identifier = 'default';

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateDefaultInterpolation#setLocale
   * @methodOf pascalprecht.translate.$translateDefaultInterpolation
   *
   * @description
   * Sets current locale (this is currently not use in this interpolation).
   *
   * @param {string} locale Language key or locale.
   */
  $translateInterpolator.setLocale = function (locale) {
    $locale = locale;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateDefaultInterpolation#getInterpolationIdentifier
   * @methodOf pascalprecht.translate.$translateDefaultInterpolation
   *
   * @description
   * Returns an identifier for this interpolation service.
   *
   * @returns {string} $identifier
   */
  $translateInterpolator.getInterpolationIdentifier = function () {
    return $identifier;
  };

  /**
   * @deprecated will be removed in 3.0
   * @see {@link pascalprecht.translate.$translateSanitization}
   */
  $translateInterpolator.useSanitizeValueStrategy = function (value) {
    $translateSanitization.useStrategy(value);
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateDefaultInterpolation#interpolate
   * @methodOf pascalprecht.translate.$translateDefaultInterpolation
   *
   * @description
   * Interpolates given string agains given interpolate params using angulars
   * `$interpolate` service.
   *
   * @returns {string} interpolated string.
   */
  $translateInterpolator.interpolate = function (string, interpolationParams) {
    interpolationParams = interpolationParams || {};
    interpolationParams = $translateSanitization.sanitize(interpolationParams, 'params');

    var interpolatedText = $interpolate(string)(interpolationParams);
    interpolatedText = $translateSanitization.sanitize(interpolatedText, 'text');

    return interpolatedText;
  };

  return $translateInterpolator;
}
$translateDefaultInterpolation.$inject = ['$interpolate', '$translateSanitization'];

$translateDefaultInterpolation.displayName = '$translateDefaultInterpolation';

angular.module('pascalprecht.translate').constant('$STORAGE_KEY', 'NG_TRANSLATE_LANG_KEY');

angular.module('pascalprecht.translate')
/**
 * @ngdoc directive
 * @name pascalprecht.translate.directive:translate
 * @requires $compile
 * @requires $filter
 * @requires $interpolate
 * @restrict A
 *
 * @description
 * Translates given translation id either through attribute or DOM content.
 * Internally it uses `translate` filter to translate translation id. It possible to
 * pass an optional `translate-values` object literal as string into translation id.
 *
 * @param {string=} translate Translation id which could be either string or interpolated string.
 * @param {string=} translate-values Values to pass into translation id. Can be passed as object literal string or interpolated object.
 * @param {string=} translate-attr-ATTR translate Translation id and put it into ATTR attribute.
 * @param {string=} translate-default will be used unless translation was successful
 * @param {boolean=} translate-compile (default true if present) defines locally activation of {@link pascalprecht.translate.$translateProvider#methods_usePostCompiling}
 *
 * @example
   <example module="ngView">
    <file name="index.html">
      <div ng-controller="TranslateCtrl">

        <pre translate="TRANSLATION_ID"></pre>
        <pre translate>TRANSLATION_ID</pre>
        <pre translate translate-attr-title="TRANSLATION_ID"></pre>
        <pre translate="{{translationId}}"></pre>
        <pre translate>{{translationId}}</pre>
        <pre translate="WITH_VALUES" translate-values="{value: 5}"></pre>
        <pre translate translate-values="{value: 5}">WITH_VALUES</pre>
        <pre translate="WITH_VALUES" translate-values="{{values}}"></pre>
        <pre translate translate-values="{{values}}">WITH_VALUES</pre>
        <pre translate translate-attr-title="WITH_VALUES" translate-values="{{values}}"></pre>

      </div>
    </file>
    <file name="script.js">
      angular.module('ngView', ['pascalprecht.translate'])

      .config(function ($translateProvider) {

        $translateProvider.translations('en',{
          'TRANSLATION_ID': 'Hello there!',
          'WITH_VALUES': 'The following value is dynamic: {{value}}'
        }).preferredLanguage('en');

      });

      angular.module('ngView').controller('TranslateCtrl', function ($scope) {
        $scope.translationId = 'TRANSLATION_ID';

        $scope.values = {
          value: 78
        };
      });
    </file>
    <file name="scenario.js">
      it('should translate', function () {
        inject(function ($rootScope, $compile) {
          $rootScope.translationId = 'TRANSLATION_ID';

          element = $compile('<p translate="TRANSLATION_ID"></p>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Hello there!');

          element = $compile('<p translate="{{translationId}}"></p>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Hello there!');

          element = $compile('<p translate>TRANSLATION_ID</p>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Hello there!');

          element = $compile('<p translate>{{translationId}}</p>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Hello there!');

          element = $compile('<p translate translate-attr-title="TRANSLATION_ID"></p>')($rootScope);
          $rootScope.$digest();
          expect(element.attr('title')).toBe('Hello there!');
        });
      });
    </file>
   </example>
 */
.directive('translate', translateDirective);
function translateDirective($translate, $q, $interpolate, $compile, $parse, $rootScope) {

  'use strict';

  /**
   * @name trim
   * @private
   *
   * @description
   * trim polyfill
   *
   * @returns {string} The string stripped of whitespace from both ends
   */
  var trim = function() {
    return this.toString().replace(/^\s+|\s+$/g, '');
  };

  return {
    restrict: 'AE',
    scope: true,
    priority: $translate.directivePriority(),
    compile: function (tElement, tAttr) {

      var translateValuesExist = (tAttr.translateValues) ?
        tAttr.translateValues : undefined;

      var translateInterpolation = (tAttr.translateInterpolation) ?
        tAttr.translateInterpolation : undefined;

      var translateValueExist = tElement[0].outerHTML.match(/translate-value-+/i);

      var interpolateRegExp = '^(.*)(' + $interpolate.startSymbol() + '.*' + $interpolate.endSymbol() + ')(.*)',
          watcherRegExp = '^(.*)' + $interpolate.startSymbol() + '(.*)' + $interpolate.endSymbol() + '(.*)';

      return function linkFn(scope, iElement, iAttr) {

        scope.interpolateParams = {};
        scope.preText = '';
        scope.postText = '';
        scope.translateNamespace = getTranslateNamespace(scope);
        var translationIds = {};

        var initInterpolationParams = function (interpolateParams, iAttr, tAttr) {
          // initial setup
          if (iAttr.translateValues) {
            angular.extend(interpolateParams, $parse(iAttr.translateValues)(scope.$parent));
          }
          // initially fetch all attributes if existing and fill the params
          if (translateValueExist) {
            for (var attr in tAttr) {
              if (Object.prototype.hasOwnProperty.call(iAttr, attr) && attr.substr(0, 14) === 'translateValue' && attr !== 'translateValues') {
                var attributeName = angular.lowercase(attr.substr(14, 1)) + attr.substr(15);
                interpolateParams[attributeName] = tAttr[attr];
              }
            }
          }
        };

        // Ensures any change of the attribute "translate" containing the id will
        // be re-stored to the scope's "translationId".
        // If the attribute has no content, the element's text value (white spaces trimmed off) will be used.
        var observeElementTranslation = function (translationId) {

          // Remove any old watcher
          if (angular.isFunction(observeElementTranslation._unwatchOld)) {
            observeElementTranslation._unwatchOld();
            observeElementTranslation._unwatchOld = undefined;
          }

          if (angular.equals(translationId , '') || !angular.isDefined(translationId)) {
            var iElementText = trim.apply(iElement.text());

            // Resolve translation id by inner html if required
            var interpolateMatches = iElementText.match(interpolateRegExp);
            // Interpolate translation id if required
            if (angular.isArray(interpolateMatches)) {
              scope.preText = interpolateMatches[1];
              scope.postText = interpolateMatches[3];
              translationIds.translate = $interpolate(interpolateMatches[2])(scope.$parent);
              var watcherMatches = iElementText.match(watcherRegExp);
              if (angular.isArray(watcherMatches) && watcherMatches[2] && watcherMatches[2].length) {
                observeElementTranslation._unwatchOld = scope.$watch(watcherMatches[2], function (newValue) {
                  translationIds.translate = newValue;
                  updateTranslations();
                });
              }
            } else {
              translationIds.translate = iElementText;
            }
          } else {
            translationIds.translate = translationId;
          }
          updateTranslations();
        };

        var observeAttributeTranslation = function (translateAttr) {
          iAttr.$observe(translateAttr, function (translationId) {
            translationIds[translateAttr] = translationId;
            updateTranslations();
          });
        };

        // initial setup with values
        initInterpolationParams(scope.interpolateParams, iAttr, tAttr);

        var firstAttributeChangedEvent = true;
        iAttr.$observe('translate', function (translationId) {
          if (typeof translationId === 'undefined') {
            // case of element "<translate>xyz</translate>"
            observeElementTranslation('');
          } else {
            // case of regular attribute
            if (translationId !== '' || !firstAttributeChangedEvent) {
              translationIds.translate = translationId;
              updateTranslations();
            }
          }
          firstAttributeChangedEvent = false;
        });

        for (var translateAttr in iAttr) {
          if (iAttr.hasOwnProperty(translateAttr) && translateAttr.substr(0, 13) === 'translateAttr') {
            observeAttributeTranslation(translateAttr);
          }
        }

        iAttr.$observe('translateDefault', function (value) {
          scope.defaultText = value;
        });

        if (translateValuesExist) {
          iAttr.$observe('translateValues', function (interpolateParams) {
            if (interpolateParams) {
              scope.$parent.$watch(function () {
                angular.extend(scope.interpolateParams, $parse(interpolateParams)(scope.$parent));
              });
            }
          });
        }

        if (translateValueExist) {
          var observeValueAttribute = function (attrName) {
            iAttr.$observe(attrName, function (value) {
              var attributeName = angular.lowercase(attrName.substr(14, 1)) + attrName.substr(15);
              scope.interpolateParams[attributeName] = value;
            });
          };
          for (var attr in iAttr) {
            if (Object.prototype.hasOwnProperty.call(iAttr, attr) && attr.substr(0, 14) === 'translateValue' && attr !== 'translateValues') {
              observeValueAttribute(attr);
            }
          }
        }

        // Master update function
        var updateTranslations = function () {
          for (var key in translationIds) {

            if (translationIds.hasOwnProperty(key) && translationIds[key] !== undefined) {
              updateTranslation(key, translationIds[key], scope, scope.interpolateParams, scope.defaultText, scope.translateNamespace);
            }
          }
        };

        // Put translation processing function outside loop
        var updateTranslation = function(translateAttr, translationId, scope, interpolateParams, defaultTranslationText, translateNamespace) {
          if (translationId) {
            // if translation id starts with '.' and translateNamespace given, prepend namespace
            if (translateNamespace && translationId.charAt(0) === '.') {
              translationId = translateNamespace + translationId;
            }

            $translate(translationId, interpolateParams, translateInterpolation, defaultTranslationText)
              .then(function (translation) {
                applyTranslation(translation, scope, true, translateAttr);
              }, function (translationId) {
                applyTranslation(translationId, scope, false, translateAttr);
              });
          } else {
            // as an empty string cannot be translated, we can solve this using successful=false
            applyTranslation(translationId, scope, false, translateAttr);
          }
        };

        var applyTranslation = function (value, scope, successful, translateAttr) {
          if (translateAttr === 'translate') {
            // default translate into innerHTML
            if (!successful && typeof scope.defaultText !== 'undefined') {
              value = scope.defaultText;
            }
            iElement.empty().append(scope.preText + value + scope.postText);
            var globallyEnabled = $translate.isPostCompilingEnabled();
            var locallyDefined = typeof tAttr.translateCompile !== 'undefined';
            var locallyEnabled = locallyDefined && tAttr.translateCompile !== 'false';
            if ((globallyEnabled && !locallyDefined) || locallyEnabled) {
              $compile(iElement.contents())(scope);
            }
          } else {
            // translate attribute
            if (!successful && typeof scope.defaultText !== 'undefined') {
              value = scope.defaultText;
            }
            var attributeName = iAttr.$attr[translateAttr];
            if (attributeName.substr(0, 5) === 'data-') {
              // ensure html5 data prefix is stripped
              attributeName = attributeName.substr(5);
            }
            attributeName = attributeName.substr(15);
            iElement.attr(attributeName, value);
          }
        };

        if (translateValuesExist || translateValueExist || iAttr.translateDefault) {
          scope.$watch('interpolateParams', updateTranslations, true);
        }

        // Ensures the text will be refreshed after the current language was changed
        // w/ $translate.use(...)
        var unbind = $rootScope.$on('$translateChangeSuccess', updateTranslations);

        // ensure translation will be looked up at least one
        if (iElement.text().length) {
          if (iAttr.translate) {
            observeElementTranslation(iAttr.translate);
          } else {
            observeElementTranslation('');
          }
        } else if (iAttr.translate) {
          // ensure attribute will be not skipped
          observeElementTranslation(iAttr.translate);
        }
        updateTranslations();
        scope.$on('$destroy', unbind);
      };
    }
  };
}
translateDirective.$inject = ['$translate', '$q', '$interpolate', '$compile', '$parse', '$rootScope'];

/**
 * Returns the scope's namespace.
 * @private
 * @param scope
 * @returns {string}
 */
function getTranslateNamespace(scope) {
  'use strict';
  if (scope.translateNamespace) {
    return scope.translateNamespace;
  }
  if (scope.$parent) {
    return getTranslateNamespace(scope.$parent);
  }
}

translateDirective.displayName = 'translateDirective';

angular.module('pascalprecht.translate')
/**
 * @ngdoc directive
 * @name pascalprecht.translate.directive:translateCloak
 * @requires $rootScope
 * @requires $translate
 * @restrict A
 *
 * $description
 * Adds a `translate-cloak` class name to the given element where this directive
 * is applied initially and removes it, once a loader has finished loading.
 *
 * This directive can be used to prevent initial flickering when loading translation
 * data asynchronously.
 *
 * The class name is defined in
 * {@link pascalprecht.translate.$translateProvider#cloakClassName $translate.cloakClassName()}.
 *
 * @param {string=} translate-cloak If a translationId is provided, it will be used for showing
 *                                  or hiding the cloak. Basically it relies on the translation
 *                                  resolve.
 */
.directive('translateCloak', translateCloakDirective);

function translateCloakDirective($translate) {

  'use strict';

  return {
    compile: function (tElement) {
      var applyCloak = function () {
        tElement.addClass($translate.cloakClassName());
      },
      removeCloak = function () {
        tElement.removeClass($translate.cloakClassName());
      };
      $translate.onReady(function () {
        removeCloak();
      });
      applyCloak();

      return function linkFn(scope, iElement, iAttr) {
        // Register a watcher for the defined translation allowing a fine tuned cloak
        if (iAttr.translateCloak && iAttr.translateCloak.length) {
          iAttr.$observe('translateCloak', function (translationId) {
            $translate(translationId).then(removeCloak, applyCloak);
          });
        }
      };
    }
  };
}
translateCloakDirective.$inject = ['$translate'];

translateCloakDirective.displayName = 'translateCloakDirective';

angular.module('pascalprecht.translate')
/**
 * @ngdoc directive
 * @name pascalprecht.translate.directive:translateNamespace
 * @restrict A
 *
 * @description
 * Translates given translation id either through attribute or DOM content.
 * Internally it uses `translate` filter to translate translation id. It possible to
 * pass an optional `translate-values` object literal as string into translation id.
 *
 * @param {string=} translate namespace name which could be either string or interpolated string.
 *
 * @example
   <example module="ngView">
    <file name="index.html">
      <div translate-namespace="CONTENT">

        <div>
            <h1 translate>.HEADERS.TITLE</h1>
            <h1 translate>.HEADERS.WELCOME</h1>
        </div>

        <div translate-namespace=".HEADERS">
            <h1 translate>.TITLE</h1>
            <h1 translate>.WELCOME</h1>
        </div>

      </div>
    </file>
    <file name="script.js">
      angular.module('ngView', ['pascalprecht.translate'])

      .config(function ($translateProvider) {

        $translateProvider.translations('en',{
          'TRANSLATION_ID': 'Hello there!',
          'CONTENT': {
            'HEADERS': {
                TITLE: 'Title'
            }
          },
          'CONTENT.HEADERS.WELCOME': 'Welcome'
        }).preferredLanguage('en');

      });

    </file>
   </example>
 */
.directive('translateNamespace', translateNamespaceDirective);

function translateNamespaceDirective() {

  'use strict';

  return {
    restrict: 'A',
    scope: true,
    compile: function () {
      return {
        pre: function (scope, iElement, iAttrs) {
          scope.translateNamespace = getTranslateNamespace(scope);

          if (scope.translateNamespace && iAttrs.translateNamespace.charAt(0) === '.') {
            scope.translateNamespace += iAttrs.translateNamespace;
          } else {
            scope.translateNamespace = iAttrs.translateNamespace;
          }
        }
      };
    }
  };
}

/**
 * Returns the scope's namespace.
 * @private
 * @param scope
 * @returns {string}
 */
function getTranslateNamespace(scope) {
  'use strict';
  if (scope.translateNamespace) {
    return scope.translateNamespace;
  }
  if (scope.$parent) {
    return getTranslateNamespace(scope.$parent);
  }
}

translateNamespaceDirective.displayName = 'translateNamespaceDirective';

angular.module('pascalprecht.translate')
/**
 * @ngdoc filter
 * @name pascalprecht.translate.filter:translate
 * @requires $parse
 * @requires pascalprecht.translate.$translate
 * @function
 *
 * @description
 * Uses `$translate` service to translate contents. Accepts interpolate parameters
 * to pass dynamized values though translation.
 *
 * @param {string} translationId A translation id to be translated.
 * @param {*=} interpolateParams Optional object literal (as hash or string) to pass values into translation.
 *
 * @returns {string} Translated text.
 *
 * @example
   <example module="ngView">
    <file name="index.html">
      <div ng-controller="TranslateCtrl">

        <pre>{{ 'TRANSLATION_ID' | translate }}</pre>
        <pre>{{ translationId | translate }}</pre>
        <pre>{{ 'WITH_VALUES' | translate:'{value: 5}' }}</pre>
        <pre>{{ 'WITH_VALUES' | translate:values }}</pre>

      </div>
    </file>
    <file name="script.js">
      angular.module('ngView', ['pascalprecht.translate'])

      .config(function ($translateProvider) {

        $translateProvider.translations('en', {
          'TRANSLATION_ID': 'Hello there!',
          'WITH_VALUES': 'The following value is dynamic: {{value}}'
        });
        $translateProvider.preferredLanguage('en');

      });

      angular.module('ngView').controller('TranslateCtrl', function ($scope) {
        $scope.translationId = 'TRANSLATION_ID';

        $scope.values = {
          value: 78
        };
      });
    </file>
   </example>
 */
.filter('translate', translateFilterFactory);

function translateFilterFactory($parse, $translate) {

  'use strict';

  var translateFilter = function (translationId, interpolateParams, interpolation) {

    if (!angular.isObject(interpolateParams)) {
      interpolateParams = $parse(interpolateParams)(this);
    }

    return $translate.instant(translationId, interpolateParams, interpolation);
  };

  if ($translate.statefulFilter()) {
    translateFilter.$stateful = true;
  }

  return translateFilter;
}
translateFilterFactory.$inject = ['$parse', '$translate'];

translateFilterFactory.displayName = 'translateFilterFactory';

angular.module('pascalprecht.translate')

/**
 * @ngdoc object
 * @name pascalprecht.translate.$translationCache
 * @requires $cacheFactory
 *
 * @description
 * The first time a translation table is used, it is loaded in the translation cache for quick retrieval. You
 * can load translation tables directly into the cache by consuming the
 * `$translationCache` service directly.
 *
 * @return {object} $cacheFactory object.
 */
  .factory('$translationCache', $translationCache);

function $translationCache($cacheFactory) {

  'use strict';

  return $cacheFactory('translations');
}
$translationCache.$inject = ['$cacheFactory'];

$translationCache.displayName = '$translationCache';
return 'pascalprecht.translate';

}));

},{}],5:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],6:[function(require,module,exports){
exports = module.exports = require('./lib/angular-resource.js');
},{"./lib/angular-resource.js":7}],7:[function(require,module,exports){
/**
 * @license AngularJS v1.3.2
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
exports = module.exports = function (window, angular, undefined) {
    'use strict';

    var $resourceMinErr = angular.$$minErr('$resource');

    // Helper functions and regex to lookup a dotted path on an object
    // stopping at undefined/null.  The path must be composed of ASCII
    // identifiers (just like $parse)
    var MEMBER_NAME_REGEX = /^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;

    function isValidDottedPath(path) {
      return (path != null && path !== '' && path !== 'hasOwnProperty' &&
          MEMBER_NAME_REGEX.test('.' + path));
    }

    function lookupDottedPath(obj, path) {
      if (!isValidDottedPath(path)) {
        throw $resourceMinErr('badmember', 'Dotted member path "@{0}" is invalid.', path);
      }
      var keys = path.split('.');
      for (var i = 0, ii = keys.length; i < ii && obj !== undefined; i++) {
        var key = keys[i];
        obj = (obj !== null) ? obj[key] : undefined;
      }
      return obj;
    }

    /**
     * Create a shallow copy of an object and clear other fields from the destination
     */
    function shallowClearAndCopy(src, dst) {
      dst = dst || {};

      angular.forEach(dst, function(value, key) {
        delete dst[key];
      });

      for (var key in src) {
        if (src.hasOwnProperty(key) && !(key.charAt(0) === '$' && key.charAt(1) === '$')) {
          dst[key] = src[key];
        }
      }

      return dst;
    }

    /**
     * @ngdoc module
     * @name ngResource
     * @description
     *
     * # ngResource
     *
     * The `ngResource` module provides interaction support with RESTful services
     * via the $resource service.
     *
     *
     * <div doc-module-components="ngResource"></div>
     *
     * See {@link ngResource.$resource `$resource`} for usage.
     */

    /**
     * @ngdoc service
     * @name $resource
     * @requires $http
     *
     * @description
     * A factory which creates a resource object that lets you interact with
     * [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) server-side data sources.
     *
     * The returned resource object has action methods which provide high-level behaviors without
     * the need to interact with the low level {@link ng.$http $http} service.
     *
     * Requires the {@link ngResource `ngResource`} module to be installed.
     *
     * By default, trailing slashes will be stripped from the calculated URLs,
     * which can pose problems with server backends that do not expect that
     * behavior.  This can be disabled by configuring the `$resourceProvider` like
     * this:
     *
     * ```js
         app.config(['$resourceProvider', function($resourceProvider) {
           // Don't strip trailing slashes from calculated URLs
           $resourceProvider.defaults.stripTrailingSlashes = false;
         }]);
     * ```
     *
     * @param {string} url A parametrized URL template with parameters prefixed by `:` as in
     *   `/user/:username`. If you are using a URL with a port number (e.g.
     *   `http://example.com:8080/api`), it will be respected.
     *
     *   If you are using a url with a suffix, just add the suffix, like this:
     *   `$resource('http://example.com/resource.json')` or `$resource('http://example.com/:id.json')`
     *   or even `$resource('http://example.com/resource/:resource_id.:format')`
     *   If the parameter before the suffix is empty, :resource_id in this case, then the `/.` will be
     *   collapsed down to a single `.`.  If you need this sequence to appear and not collapse then you
     *   can escape it with `/\.`.
     *
     * @param {Object=} paramDefaults Default values for `url` parameters. These can be overridden in
     *   `actions` methods. If any of the parameter value is a function, it will be executed every time
     *   when a param value needs to be obtained for a request (unless the param was overridden).
     *
     *   Each key value in the parameter object is first bound to url template if present and then any
     *   excess keys are appended to the url search query after the `?`.
     *
     *   Given a template `/path/:verb` and parameter `{verb:'greet', salutation:'Hello'}` results in
     *   URL `/path/greet?salutation=Hello`.
     *
     *   If the parameter value is prefixed with `@` then the value for that parameter will be extracted
     *   from the corresponding property on the `data` object (provided when calling an action method).  For
     *   example, if the `defaultParam` object is `{someParam: '@someProp'}` then the value of `someParam`
     *   will be `data.someProp`.
     *
     * @param {Object.<Object>=} actions Hash with declaration of custom action that should extend
     *   the default set of resource actions. The declaration should be created in the format of {@link
     *   ng.$http#usage $http.config}:
     *
     *       {action1: {method:?, params:?, isArray:?, headers:?, ...},
     *        action2: {method:?, params:?, isArray:?, headers:?, ...},
     *        ...}
     *
     *   Where:
     *
     *   - **`action`** – {string} – The name of action. This name becomes the name of the method on
     *     your resource object.
     *   - **`method`** – {string} – Case insensitive HTTP method (e.g. `GET`, `POST`, `PUT`,
     *     `DELETE`, `JSONP`, etc).
     *   - **`params`** – {Object=} – Optional set of pre-bound parameters for this action. If any of
     *     the parameter value is a function, it will be executed every time when a param value needs to
     *     be obtained for a request (unless the param was overridden).
     *   - **`url`** – {string} – action specific `url` override. The url templating is supported just
     *     like for the resource-level urls.
     *   - **`isArray`** – {boolean=} – If true then the returned object for this action is an array,
     *     see `returns` section.
     *   - **`transformRequest`** –
     *     `{function(data, headersGetter)|Array.<function(data, headersGetter)>}` –
     *     transform function or an array of such functions. The transform function takes the http
     *     request body and headers and returns its transformed (typically serialized) version.
     *     By default, transformRequest will contain one function that checks if the request data is
     *     an object and serializes to using `angular.toJson`. To prevent this behavior, set
     *     `transformRequest` to an empty array: `transformRequest: []`
     *   - **`transformResponse`** –
     *     `{function(data, headersGetter)|Array.<function(data, headersGetter)>}` –
     *     transform function or an array of such functions. The transform function takes the http
     *     response body and headers and returns its transformed (typically deserialized) version.
     *     By default, transformResponse will contain one function that checks if the response looks like
     *     a JSON string and deserializes it using `angular.fromJson`. To prevent this behavior, set
     *     `transformResponse` to an empty array: `transformResponse: []`
     *   - **`cache`** – `{boolean|Cache}` – If true, a default $http cache will be used to cache the
     *     GET request, otherwise if a cache instance built with
     *     {@link ng.$cacheFactory $cacheFactory}, this cache will be used for
     *     caching.
     *   - **`timeout`** – `{number|Promise}` – timeout in milliseconds, or {@link ng.$q promise} that
     *     should abort the request when resolved.
     *   - **`withCredentials`** - `{boolean}` - whether to set the `withCredentials` flag on the
     *     XHR object. See
     *     [requests with credentials](https://developer.mozilla.org/en/http_access_control#section_5)
     *     for more information.
     *   - **`responseType`** - `{string}` - see
     *     [requestType](https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest#responseType).
     *   - **`interceptor`** - `{Object=}` - The interceptor object has two optional methods -
     *     `response` and `responseError`. Both `response` and `responseError` interceptors get called
     *     with `http response` object. See {@link ng.$http $http interceptors}.
     *
     * @param {Object} options Hash with custom settings that should extend the
     *   default `$resourceProvider` behavior.  The only supported option is
     *
     *   Where:
     *
     *   - **`stripTrailingSlashes`** – {boolean} – If true then the trailing
     *   slashes from any calculated URL will be stripped. (Defaults to true.)
     *
     * @returns {Object} A resource "class" object with methods for the default set of resource actions
     *   optionally extended with custom `actions`. The default set contains these actions:
     *   ```js
     *   { 'get':    {method:'GET'},
     *     'save':   {method:'POST'},
     *     'query':  {method:'GET', isArray:true},
     *     'remove': {method:'DELETE'},
     *     'delete': {method:'DELETE'} };
     *   ```
     *
     *   Calling these methods invoke an {@link ng.$http} with the specified http method,
     *   destination and parameters. When the data is returned from the server then the object is an
     *   instance of the resource class. The actions `save`, `remove` and `delete` are available on it
     *   as  methods with the `$` prefix. This allows you to easily perform CRUD operations (create,
     *   read, update, delete) on server-side data like this:
     *   ```js
     *   var User = $resource('/user/:userId', {userId:'@id'});
     *   var user = User.get({userId:123}, function() {
     *     user.abc = true;
     *     user.$save();
     *   });
     *   ```
     *
     *   It is important to realize that invoking a $resource object method immediately returns an
     *   empty reference (object or array depending on `isArray`). Once the data is returned from the
     *   server the existing reference is populated with the actual data. This is a useful trick since
     *   usually the resource is assigned to a model which is then rendered by the view. Having an empty
     *   object results in no rendering, once the data arrives from the server then the object is
     *   populated with the data and the view automatically re-renders itself showing the new data. This
     *   means that in most cases one never has to write a callback function for the action methods.
     *
     *   The action methods on the class object or instance object can be invoked with the following
     *   parameters:
     *
     *   - HTTP GET "class" actions: `Resource.action([parameters], [success], [error])`
     *   - non-GET "class" actions: `Resource.action([parameters], postData, [success], [error])`
     *   - non-GET instance actions:  `instance.$action([parameters], [success], [error])`
     *
     *   Success callback is called with (value, responseHeaders) arguments. Error callback is called
     *   with (httpResponse) argument.
     *
     *   Class actions return empty instance (with additional properties below).
     *   Instance actions return promise of the action.
     *
     *   The Resource instances and collection have these additional properties:
     *
     *   - `$promise`: the {@link ng.$q promise} of the original server interaction that created this
     *     instance or collection.
     *
     *     On success, the promise is resolved with the same resource instance or collection object,
     *     updated with data from server. This makes it easy to use in
     *     {@link ngRoute.$routeProvider resolve section of $routeProvider.when()} to defer view
     *     rendering until the resource(s) are loaded.
     *
     *     On failure, the promise is resolved with the {@link ng.$http http response} object, without
     *     the `resource` property.
     *
     *     If an interceptor object was provided, the promise will instead be resolved with the value
     *     returned by the interceptor.
     *
     *   - `$resolved`: `true` after first server interaction is completed (either with success or
     *      rejection), `false` before that. Knowing if the Resource has been resolved is useful in
     *      data-binding.
     *
     * @example
     *
     * # Credit card resource
     *
     * ```js
         // Define CreditCard class
         var CreditCard = $resource('/user/:userId/card/:cardId',
          {userId:123, cardId:'@id'}, {
           charge: {method:'POST', params:{charge:true}}
          });

         // We can retrieve a collection from the server
         var cards = CreditCard.query(function() {
           // GET: /user/123/card
           // server returns: [ {id:456, number:'1234', name:'Smith'} ];

           var card = cards[0];
           // each item is an instance of CreditCard
           expect(card instanceof CreditCard).toEqual(true);
           card.name = "J. Smith";
           // non GET methods are mapped onto the instances
           card.$save();
           // POST: /user/123/card/456 {id:456, number:'1234', name:'J. Smith'}
           // server returns: {id:456, number:'1234', name: 'J. Smith'};

           // our custom method is mapped as well.
           card.$charge({amount:9.99});
           // POST: /user/123/card/456?amount=9.99&charge=true {id:456, number:'1234', name:'J. Smith'}
         });

         // we can create an instance as well
         var newCard = new CreditCard({number:'0123'});
         newCard.name = "Mike Smith";
         newCard.$save();
         // POST: /user/123/card {number:'0123', name:'Mike Smith'}
         // server returns: {id:789, number:'0123', name: 'Mike Smith'};
         expect(newCard.id).toEqual(789);
     * ```
     *
     * The object returned from this function execution is a resource "class" which has "static" method
     * for each action in the definition.
     *
     * Calling these methods invoke `$http` on the `url` template with the given `method`, `params` and
     * `headers`.
     * When the data is returned from the server then the object is an instance of the resource type and
     * all of the non-GET methods are available with `$` prefix. This allows you to easily support CRUD
     * operations (create, read, update, delete) on server-side data.

       ```js
         var User = $resource('/user/:userId', {userId:'@id'});
         User.get({userId:123}, function(user) {
           user.abc = true;
           user.$save();
         });
       ```
     *
     * It's worth noting that the success callback for `get`, `query` and other methods gets passed
     * in the response that came from the server as well as $http header getter function, so one
     * could rewrite the above example and get access to http headers as:
     *
       ```js
         var User = $resource('/user/:userId', {userId:'@id'});
         User.get({userId:123}, function(u, getResponseHeaders){
           u.abc = true;
           u.$save(function(u, putResponseHeaders) {
             //u => saved user object
             //putResponseHeaders => $http header getter
           });
         });
       ```
     *
     * You can also access the raw `$http` promise via the `$promise` property on the object returned
     *
       ```
         var User = $resource('/user/:userId', {userId:'@id'});
         User.get({userId:123})
             .$promise.then(function(user) {
               $scope.user = user;
             });
       ```

     * # Creating a custom 'PUT' request
     * In this example we create a custom method on our resource to make a PUT request
     * ```js
     *    var app = angular.module('app', ['ngResource', 'ngRoute']);
     *
     *    // Some APIs expect a PUT request in the format URL/object/ID
     *    // Here we are creating an 'update' method
     *    app.factory('Notes', ['$resource', function($resource) {
     *    return $resource('/notes/:id', null,
     *        {
     *            'update': { method:'PUT' }
     *        });
     *    }]);
     *
     *    // In our controller we get the ID from the URL using ngRoute and $routeParams
     *    // We pass in $routeParams and our Notes factory along with $scope
     *    app.controller('NotesCtrl', ['$scope', '$routeParams', 'Notes',
                                          function($scope, $routeParams, Notes) {
     *    // First get a note object from the factory
     *    var note = Notes.get({ id:$routeParams.id });
     *    $id = note.id;
     *
     *    // Now call update passing in the ID first then the object you are updating
     *    Notes.update({ id:$id }, note);
     *
     *    // This will PUT /notes/ID with the note object in the request payload
     *    }]);
     * ```
     */
    angular.module('ngResource', ['ng']).
      provider('$resource', function() {
        var provider = this;

        this.defaults = {
          // Strip slashes by default
          stripTrailingSlashes: true,

          // Default actions configuration
          actions: {
            'get': {method: 'GET'},
            'save': {method: 'POST'},
            'query': {method: 'GET', isArray: true},
            'remove': {method: 'DELETE'},
            'delete': {method: 'DELETE'}
          }
        };

        this.$get = ['$http', '$q', function($http, $q) {

          var noop = angular.noop,
            forEach = angular.forEach,
            extend = angular.extend,
            copy = angular.copy,
            isFunction = angular.isFunction;

          /**
           * We need our custom method because encodeURIComponent is too aggressive and doesn't follow
           * http://www.ietf.org/rfc/rfc3986.txt with regards to the character set
           * (pchar) allowed in path segments:
           *    segment       = *pchar
           *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
           *    pct-encoded   = "%" HEXDIG HEXDIG
           *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
           *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
           *                     / "*" / "+" / "," / ";" / "="
           */
          function encodeUriSegment(val) {
            return encodeUriQuery(val, true).
              replace(/%26/gi, '&').
              replace(/%3D/gi, '=').
              replace(/%2B/gi, '+');
          }


          /**
           * This method is intended for encoding *key* or *value* parts of query component. We need a
           * custom method because encodeURIComponent is too aggressive and encodes stuff that doesn't
           * have to be encoded per http://tools.ietf.org/html/rfc3986:
           *    query       = *( pchar / "/" / "?" )
           *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
           *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
           *    pct-encoded   = "%" HEXDIG HEXDIG
           *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
           *                     / "*" / "+" / "," / ";" / "="
           */
          function encodeUriQuery(val, pctEncodeSpaces) {
            return encodeURIComponent(val).
              replace(/%40/gi, '@').
              replace(/%3A/gi, ':').
              replace(/%24/g, '$').
              replace(/%2C/gi, ',').
              replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
          }

          function Route(template, defaults) {
            this.template = template;
            this.defaults = extend({}, provider.defaults, defaults);
            this.urlParams = {};
          }

          Route.prototype = {
            setUrlParams: function(config, params, actionUrl) {
              var self = this,
                url = actionUrl || self.template,
                val,
                encodedVal;

              var urlParams = self.urlParams = {};
              forEach(url.split(/\W/), function(param) {
                if (param === 'hasOwnProperty') {
                  throw $resourceMinErr('badname', "hasOwnProperty is not a valid parameter name.");
                }
                if (!(new RegExp("^\\d+$").test(param)) && param &&
                  (new RegExp("(^|[^\\\\]):" + param + "(\\W|$)").test(url))) {
                  urlParams[param] = true;
                }
              });
              url = url.replace(/\\:/g, ':');

              params = params || {};
              forEach(self.urlParams, function(_, urlParam) {
                val = params.hasOwnProperty(urlParam) ? params[urlParam] : self.defaults[urlParam];
                if (angular.isDefined(val) && val !== null) {
                  encodedVal = encodeUriSegment(val);
                  url = url.replace(new RegExp(":" + urlParam + "(\\W|$)", "g"), function(match, p1) {
                    return encodedVal + p1;
                  });
                } else {
                  url = url.replace(new RegExp("(\/?):" + urlParam + "(\\W|$)", "g"), function(match,
                      leadingSlashes, tail) {
                    if (tail.charAt(0) == '/') {
                      return tail;
                    } else {
                      return leadingSlashes + tail;
                    }
                  });
                }
              });

              // strip trailing slashes and set the url (unless this behavior is specifically disabled)
              if (self.defaults.stripTrailingSlashes) {
                url = url.replace(/\/+$/, '') || '/';
              }

              // then replace collapse `/.` if found in the last URL path segment before the query
              // E.g. `http://url.com/id./format?q=x` becomes `http://url.com/id.format?q=x`
              url = url.replace(/\/\.(?=\w+($|\?))/, '.');
              // replace escaped `/\.` with `/.`
              config.url = url.replace(/\/\\\./, '/.');


              // set params - delegate param encoding to $http
              forEach(params, function(value, key) {
                if (!self.urlParams[key]) {
                  config.params = config.params || {};
                  config.params[key] = value;
                }
              });
            }
          };


          function resourceFactory(url, paramDefaults, actions, options) {
            var route = new Route(url, options);

            actions = extend({}, provider.defaults.actions, actions);

            function extractParams(data, actionParams) {
              var ids = {};
              actionParams = extend({}, paramDefaults, actionParams);
              forEach(actionParams, function(value, key) {
                if (isFunction(value)) { value = value(); }
                ids[key] = value && value.charAt && value.charAt(0) == '@' ?
                  lookupDottedPath(data, value.substr(1)) : value;
              });
              return ids;
            }

            function defaultResponseInterceptor(response) {
              return response.resource;
            }

            function Resource(value) {
              shallowClearAndCopy(value || {}, this);
            }

            Resource.prototype.toJSON = function() {
              var data = extend({}, this);
              delete data.$promise;
              delete data.$resolved;
              return data;
            };

            forEach(actions, function(action, name) {
              var hasBody = /^(POST|PUT|PATCH)$/i.test(action.method);

              Resource[name] = function(a1, a2, a3, a4) {
                var params = {}, data, success, error;

                /* jshint -W086 */ /* (purposefully fall through case statements) */
                switch (arguments.length) {
                  case 4:
                    error = a4;
                    success = a3;
                  //fallthrough
                  case 3:
                  case 2:
                    if (isFunction(a2)) {
                      if (isFunction(a1)) {
                        success = a1;
                        error = a2;
                        break;
                      }

                      success = a2;
                      error = a3;
                      //fallthrough
                    } else {
                      params = a1;
                      data = a2;
                      success = a3;
                      break;
                    }
                  case 1:
                    if (isFunction(a1)) success = a1;
                    else if (hasBody) data = a1;
                    else params = a1;
                    break;
                  case 0: break;
                  default:
                    throw $resourceMinErr('badargs',
                      "Expected up to 4 arguments [params, data, success, error], got {0} arguments",
                      arguments.length);
                }
                /* jshint +W086 */ /* (purposefully fall through case statements) */

                var isInstanceCall = this instanceof Resource;
                var value = isInstanceCall ? data : (action.isArray ? [] : new Resource(data));
                var httpConfig = {};
                var responseInterceptor = action.interceptor && action.interceptor.response ||
                  defaultResponseInterceptor;
                var responseErrorInterceptor = action.interceptor && action.interceptor.responseError ||
                  undefined;

                forEach(action, function(value, key) {
                  if (key != 'params' && key != 'isArray' && key != 'interceptor') {
                    httpConfig[key] = copy(value);
                  }
                });

                if (hasBody) httpConfig.data = data;
                route.setUrlParams(httpConfig,
                  extend({}, extractParams(data, action.params || {}), params),
                  action.url);

                var promise = $http(httpConfig).then(function(response) {
                  var data = response.data,
                    promise = value.$promise;

                  if (data) {
                    // Need to convert action.isArray to boolean in case it is undefined
                    // jshint -W018
                    if (angular.isArray(data) !== (!!action.isArray)) {
                      throw $resourceMinErr('badcfg',
                          'Error in resource configuration for action `{0}`. Expected response to ' +
                          'contain an {1} but got an {2}', name, action.isArray ? 'array' : 'object',
                        angular.isArray(data) ? 'array' : 'object');
                    }
                    // jshint +W018
                    if (action.isArray) {
                      value.length = 0;
                      forEach(data, function(item) {
                        if (typeof item === "object") {
                          value.push(new Resource(item));
                        } else {
                          // Valid JSON values may be string literals, and these should not be converted
                          // into objects. These items will not have access to the Resource prototype
                          // methods, but unfortunately there
                          value.push(item);
                        }
                      });
                    } else {
                      shallowClearAndCopy(data, value);
                      value.$promise = promise;
                    }
                  }

                  value.$resolved = true;

                  response.resource = value;

                  return response;
                }, function(response) {
                  value.$resolved = true;

                  (error || noop)(response);

                  return $q.reject(response);
                });

                promise = promise.then(
                  function(response) {
                    var value = responseInterceptor(response);
                    (success || noop)(value, response.headers);
                    return value;
                  },
                  responseErrorInterceptor);

                if (!isInstanceCall) {
                  // we are creating instance / collection
                  // - set the initial promise
                  // - return the instance / collection
                  value.$promise = promise;
                  value.$resolved = false;

                  return value;
                }

                // instance call
                return promise;
              };


              Resource.prototype['$' + name] = function(params, success, error) {
                if (isFunction(params)) {
                  error = success; success = params; params = {};
                }
                var result = Resource[name].call(this, params, this, success, error);
                return result.$promise || result;
              };
            });

            Resource.bind = function(additionalParamDefaults) {
              return resourceFactory(url, extend({}, paramDefaults, additionalParamDefaults), actions);
            };

            return Resource;
          }

          return resourceFactory;
        }];
      });


};

},{}],8:[function(require,module,exports){
!function(e,t,n){"use strict";!function o(e,t,n){function a(s,l){if(!t[s]){if(!e[s]){var i="function"==typeof require&&require;if(!l&&i)return i(s,!0);if(r)return r(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var c=t[s]={exports:{}};e[s][0].call(c.exports,function(t){var n=e[s][1][t];return a(n?n:t)},c,c.exports,o,e,t,n)}return t[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)a(n[s]);return a}({1:[function(o){var a,r,s,l,i=function(e){return e&&e.__esModule?e:{"default":e}},u=o("./modules/handle-dom"),c=o("./modules/utils"),d=o("./modules/handle-swal-dom"),f=o("./modules/handle-click"),p=o("./modules/handle-key"),m=i(p),v=o("./modules/default-params"),y=i(v),h=o("./modules/set-params"),g=i(h);s=l=function(){function o(e){var t=s;return t[e]===n?y["default"][e]:t[e]}var s=arguments[0];if(u.addClass(t.body,"stop-scrolling"),d.resetInput(),s===n)return c.logStr("SweetAlert expects at least 1 attribute!"),!1;var i=c.extend({},y["default"]);switch(typeof s){case"string":i.title=s,i.text=arguments[1]||"",i.type=arguments[2]||"";break;case"object":if(s.title===n)return c.logStr('Missing "title" argument!'),!1;i.title=s.title;for(var p in y["default"])i[p]=o(p);i.confirmButtonText=i.showCancelButton?"Confirm":y["default"].confirmButtonText,i.confirmButtonText=o("confirmButtonText"),i.doneFunction=arguments[1]||null;break;default:return c.logStr('Unexpected type of argument! Expected "string" or "object", got '+typeof s),!1}g["default"](i),d.fixVerticalPosition(),d.openModal(arguments[1]);for(var v=d.getModal(),h=v.querySelectorAll("button"),b=["onclick","onmouseover","onmouseout","onmousedown","onmouseup","onfocus"],w=function(e){return f.handleButton(e,i,v)},C=0;C<h.length;C++)for(var S=0;S<b.length;S++){var x=b[S];h[C][x]=w}d.getOverlay().onclick=w,a=e.onkeydown;var k=function(e){return m["default"](e,i,v)};e.onkeydown=k,e.onfocus=function(){setTimeout(function(){r!==n&&(r.focus(),r=n)},0)},l.enableButtons()},s.setDefaults=l.setDefaults=function(e){if(!e)throw new Error("userParams is required");if("object"!=typeof e)throw new Error("userParams has to be a object");c.extend(y["default"],e)},s.close=l.close=function(){var o=d.getModal();u.fadeOut(d.getOverlay(),5),u.fadeOut(o,5),u.removeClass(o,"showSweetAlert"),u.addClass(o,"hideSweetAlert"),u.removeClass(o,"visible");var s=o.querySelector(".sa-icon.sa-success");u.removeClass(s,"animate"),u.removeClass(s.querySelector(".sa-tip"),"animateSuccessTip"),u.removeClass(s.querySelector(".sa-long"),"animateSuccessLong");var l=o.querySelector(".sa-icon.sa-error");u.removeClass(l,"animateErrorIcon"),u.removeClass(l.querySelector(".sa-x-mark"),"animateXMark");var i=o.querySelector(".sa-icon.sa-warning");return u.removeClass(i,"pulseWarning"),u.removeClass(i.querySelector(".sa-body"),"pulseWarningIns"),u.removeClass(i.querySelector(".sa-dot"),"pulseWarningIns"),setTimeout(function(){var e=o.getAttribute("data-custom-class");u.removeClass(o,e)},300),u.removeClass(t.body,"stop-scrolling"),e.onkeydown=a,e.previousActiveElement&&e.previousActiveElement.focus(),r=n,clearTimeout(o.timeout),!0},s.showInputError=l.showInputError=function(e){var t=d.getModal(),n=t.querySelector(".sa-input-error");u.addClass(n,"show");var o=t.querySelector(".sa-error-container");u.addClass(o,"show"),o.querySelector("p").innerHTML=e,setTimeout(function(){s.enableButtons()},1),t.querySelector("input").focus()},s.resetInputError=l.resetInputError=function(e){if(e&&13===e.keyCode)return!1;var t=d.getModal(),n=t.querySelector(".sa-input-error");u.removeClass(n,"show");var o=t.querySelector(".sa-error-container");u.removeClass(o,"show")},s.disableButtons=l.disableButtons=function(){var e=d.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!0,n.disabled=!0},s.enableButtons=l.enableButtons=function(){var e=d.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!1,n.disabled=!1},"undefined"!=typeof e?e.sweetAlert=e.swal=s:c.logStr("SweetAlert is a frontend module!")},{"./modules/default-params":2,"./modules/handle-click":3,"./modules/handle-dom":4,"./modules/handle-key":5,"./modules/handle-swal-dom":6,"./modules/set-params":8,"./modules/utils":9}],2:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o={title:"",text:"",type:null,allowOutsideClick:!1,showConfirmButton:!0,showCancelButton:!1,closeOnConfirm:!0,closeOnCancel:!0,confirmButtonText:"OK",confirmButtonColor:"#8CD4F5",cancelButtonText:"Cancel",imageUrl:null,imageSize:null,timer:null,customClass:"",html:!1,animation:!0,allowEscapeKey:!0,inputType:"text",inputPlaceholder:"",inputValue:"",showLoaderOnConfirm:!1};n["default"]=o,t.exports=n["default"]},{}],3:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=t("./utils"),r=(t("./handle-swal-dom"),t("./handle-dom")),s=function(t,n,o){function s(e){m&&n.confirmButtonColor&&(p.style.backgroundColor=e)}var u,c,d,f=t||e.event,p=f.target||f.srcElement,m=-1!==p.className.indexOf("confirm"),v=-1!==p.className.indexOf("sweet-overlay"),y=r.hasClass(o,"visible"),h=n.doneFunction&&"true"===o.getAttribute("data-has-done-function");switch(m&&n.confirmButtonColor&&(u=n.confirmButtonColor,c=a.colorLuminance(u,-.04),d=a.colorLuminance(u,-.14)),f.type){case"mouseover":s(c);break;case"mouseout":s(u);break;case"mousedown":s(d);break;case"mouseup":s(c);break;case"focus":var g=o.querySelector("button.confirm"),b=o.querySelector("button.cancel");m?b.style.boxShadow="none":g.style.boxShadow="none";break;case"click":var w=o===p,C=r.isDescendant(o,p);if(!w&&!C&&y&&!n.allowOutsideClick)break;m&&h&&y?l(o,n):h&&y||v?i(o,n):r.isDescendant(o,p)&&"BUTTON"===p.tagName&&sweetAlert.close()}},l=function(e,t){var n=!0;r.hasClass(e,"show-input")&&(n=e.querySelector("input").value,n||(n="")),t.doneFunction(n),t.closeOnConfirm&&sweetAlert.close(),t.showLoaderOnConfirm&&sweetAlert.disableButtons()},i=function(e,t){var n=String(t.doneFunction).replace(/\s/g,""),o="function("===n.substring(0,9)&&")"!==n.substring(9,10);o&&t.doneFunction(!1),t.closeOnCancel&&sweetAlert.close()};o["default"]={handleButton:s,handleConfirm:l,handleCancel:i},n.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],4:[function(n,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=function(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")},s=function(e,t){r(e,t)||(e.className+=" "+t)},l=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(r(e,t)){for(;n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},i=function(e){var n=t.createElement("div");return n.appendChild(t.createTextNode(e)),n.innerHTML},u=function(e){e.style.opacity="",e.style.display="block"},c=function(e){if(e&&!e.length)return u(e);for(var t=0;t<e.length;++t)u(e[t])},d=function(e){e.style.opacity="",e.style.display="none"},f=function(e){if(e&&!e.length)return d(e);for(var t=0;t<e.length;++t)d(e[t])},p=function(e,t){for(var n=t.parentNode;null!==n;){if(n===e)return!0;n=n.parentNode}return!1},m=function(e){e.style.left="-9999px",e.style.display="block";var t,n=e.clientHeight;return t="undefined"!=typeof getComputedStyle?parseInt(getComputedStyle(e).getPropertyValue("padding-top"),10):parseInt(e.currentStyle.padding),e.style.left="",e.style.display="none","-"+parseInt((n+t)/2)+"px"},v=function(e,t){if(+e.style.opacity<1){t=t||16,e.style.opacity=0,e.style.display="block";var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(o,t)});o()}e.style.display="block"},y=function(e,t){t=t||16,e.style.opacity=1;var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity-(new Date-n)/100,n=+new Date,+e.style.opacity>0?setTimeout(o,t):e.style.display="none"});o()},h=function(n){if("function"==typeof MouseEvent){var o=new MouseEvent("click",{view:e,bubbles:!1,cancelable:!0});n.dispatchEvent(o)}else if(t.createEvent){var a=t.createEvent("MouseEvents");a.initEvent("click",!1,!1),n.dispatchEvent(a)}else t.createEventObject?n.fireEvent("onclick"):"function"==typeof n.onclick&&n.onclick()},g=function(t){"function"==typeof t.stopPropagation?(t.stopPropagation(),t.preventDefault()):e.event&&e.event.hasOwnProperty("cancelBubble")&&(e.event.cancelBubble=!0)};a.hasClass=r,a.addClass=s,a.removeClass=l,a.escapeHtml=i,a._show=u,a.show=c,a._hide=d,a.hide=f,a.isDescendant=p,a.getTopMargin=m,a.fadeIn=v,a.fadeOut=y,a.fireClick=h,a.stopEventPropagation=g},{}],5:[function(t,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=t("./handle-dom"),s=t("./handle-swal-dom"),l=function(t,o,a){var l=t||e.event,i=l.keyCode||l.which,u=a.querySelector("button.confirm"),c=a.querySelector("button.cancel"),d=a.querySelectorAll("button[tabindex]");if(-1!==[9,13,32,27].indexOf(i)){for(var f=l.target||l.srcElement,p=-1,m=0;m<d.length;m++)if(f===d[m]){p=m;break}9===i?(f=-1===p?u:p===d.length-1?d[0]:d[p+1],r.stopEventPropagation(l),f.focus(),o.confirmButtonColor&&s.setFocusStyle(f,o.confirmButtonColor)):13===i?("INPUT"===f.tagName&&(f=u,u.focus()),f=-1===p?u:n):27===i&&o.allowEscapeKey===!0?(f=c,r.fireClick(f,l)):f=n}};a["default"]=l,o.exports=a["default"]},{"./handle-dom":4,"./handle-swal-dom":6}],6:[function(n,o,a){var r=function(e){return e&&e.__esModule?e:{"default":e}};Object.defineProperty(a,"__esModule",{value:!0});var s=n("./utils"),l=n("./handle-dom"),i=n("./default-params"),u=r(i),c=n("./injected-html"),d=r(c),f=".sweet-alert",p=".sweet-overlay",m=function(){var e=t.createElement("div");for(e.innerHTML=d["default"];e.firstChild;)t.body.appendChild(e.firstChild)},v=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){var e=t.querySelector(f);return e||(m(),e=v()),e}),y=function(){var e=v();return e?e.querySelector("input"):void 0},h=function(){return t.querySelector(p)},g=function(e,t){var n=s.hexToRgb(t);e.style.boxShadow="0 0 2px rgba("+n+", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"},b=function(n){var o=v();l.fadeIn(h(),10),l.show(o),l.addClass(o,"showSweetAlert"),l.removeClass(o,"hideSweetAlert"),e.previousActiveElement=t.activeElement;var a=o.querySelector("button.confirm");a.focus(),setTimeout(function(){l.addClass(o,"visible")},500);var r=o.getAttribute("data-timer");if("null"!==r&&""!==r){var s=n;o.timeout=setTimeout(function(){var e=(s||null)&&"true"===o.getAttribute("data-has-done-function");e?s(null):sweetAlert.close()},r)}},w=function(){var e=v(),t=y();l.removeClass(e,"show-input"),t.value=u["default"].inputValue,t.setAttribute("type",u["default"].inputType),t.setAttribute("placeholder",u["default"].inputPlaceholder),C()},C=function(e){if(e&&13===e.keyCode)return!1;var t=v(),n=t.querySelector(".sa-input-error");l.removeClass(n,"show");var o=t.querySelector(".sa-error-container");l.removeClass(o,"show")},S=function(){var e=v();e.style.marginTop=l.getTopMargin(v())};a.sweetAlertInitialize=m,a.getModal=v,a.getOverlay=h,a.getInput=y,a.setFocusStyle=g,a.openModal=b,a.resetInput=w,a.resetInputError=C,a.fixVerticalPosition=S},{"./default-params":2,"./handle-dom":4,"./injected-html":7,"./utils":9}],7:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o='<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>';n["default"]=o,t.exports=n["default"]},{}],8:[function(e,t,o){Object.defineProperty(o,"__esModule",{value:!0});var a=e("./utils"),r=e("./handle-swal-dom"),s=e("./handle-dom"),l=["error","warning","info","success","input","prompt"],i=function(e){var t=r.getModal(),o=t.querySelector("h2"),i=t.querySelector("p"),u=t.querySelector("button.cancel"),c=t.querySelector("button.confirm");if(o.innerHTML=e.html?e.title:s.escapeHtml(e.title).split("\n").join("<br>"),i.innerHTML=e.html?e.text:s.escapeHtml(e.text||"").split("\n").join("<br>"),e.text&&s.show(i),e.customClass)s.addClass(t,e.customClass),t.setAttribute("data-custom-class",e.customClass);else{var d=t.getAttribute("data-custom-class");s.removeClass(t,d),t.setAttribute("data-custom-class","")}if(s.hide(t.querySelectorAll(".sa-icon")),e.type&&!a.isIE8()){var f=function(){for(var o=!1,a=0;a<l.length;a++)if(e.type===l[a]){o=!0;break}if(!o)return logStr("Unknown alert type: "+e.type),{v:!1};var i=["success","error","warning","info"],u=n;-1!==i.indexOf(e.type)&&(u=t.querySelector(".sa-icon.sa-"+e.type),s.show(u));var c=r.getInput();switch(e.type){case"success":s.addClass(u,"animate"),s.addClass(u.querySelector(".sa-tip"),"animateSuccessTip"),s.addClass(u.querySelector(".sa-long"),"animateSuccessLong");break;case"error":s.addClass(u,"animateErrorIcon"),s.addClass(u.querySelector(".sa-x-mark"),"animateXMark");break;case"warning":s.addClass(u,"pulseWarning"),s.addClass(u.querySelector(".sa-body"),"pulseWarningIns"),s.addClass(u.querySelector(".sa-dot"),"pulseWarningIns");break;case"input":case"prompt":c.setAttribute("type",e.inputType),c.value=e.inputValue,c.setAttribute("placeholder",e.inputPlaceholder),s.addClass(t,"show-input"),setTimeout(function(){c.focus(),c.addEventListener("keyup",swal.resetInputError)},400)}}();if("object"==typeof f)return f.v}if(e.imageUrl){var p=t.querySelector(".sa-icon.sa-custom");p.style.backgroundImage="url("+e.imageUrl+")",s.show(p);var m=80,v=80;if(e.imageSize){var y=e.imageSize.toString().split("x"),h=y[0],g=y[1];h&&g?(m=h,v=g):logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+e.imageSize)}p.setAttribute("style",p.getAttribute("style")+"width:"+m+"px; height:"+v+"px")}t.setAttribute("data-has-cancel-button",e.showCancelButton),e.showCancelButton?u.style.display="inline-block":s.hide(u),t.setAttribute("data-has-confirm-button",e.showConfirmButton),e.showConfirmButton?c.style.display="inline-block":s.hide(c),e.cancelButtonText&&(u.innerHTML=s.escapeHtml(e.cancelButtonText)),e.confirmButtonText&&(c.innerHTML=s.escapeHtml(e.confirmButtonText)),e.confirmButtonColor&&(c.style.backgroundColor=e.confirmButtonColor,c.style.borderLeftColor=e.confirmLoadingButtonColor,c.style.borderRightColor=e.confirmLoadingButtonColor,r.setFocusStyle(c,e.confirmButtonColor)),t.setAttribute("data-allow-outside-click",e.allowOutsideClick);var b=e.doneFunction?!0:!1;t.setAttribute("data-has-done-function",b),e.animation?"string"==typeof e.animation?t.setAttribute("data-animation",e.animation):t.setAttribute("data-animation","pop"):t.setAttribute("data-animation","none"),t.setAttribute("data-timer",e.timer)};o["default"]=i,t.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],9:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},r=function(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?parseInt(t[1],16)+", "+parseInt(t[2],16)+", "+parseInt(t[3],16):null},s=function(){return e.attachEvent&&!e.addEventListener},l=function(t){e.console&&e.console.log("SweetAlert: "+t)},i=function(e,t){e=String(e).replace(/[^0-9a-f]/gi,""),e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;var n,o,a="#";for(o=0;3>o;o++)n=parseInt(e.substr(2*o,2),16),n=Math.round(Math.min(Math.max(0,n+n*t),255)).toString(16),a+=("00"+n).substr(n.length);return a};o.extend=a,o.hexToRgb=r,o.isIE8=s,o.logStr=l,o.colorLuminance=i},{}]},{},[1]),"function"==typeof define&&define.amd?define(function(){return sweetAlert}):"undefined"!=typeof module&&module.exports&&(module.exports=sweetAlert)}(window,document);
},{}],9:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _conf = require('./conf');

var _conf2 = _interopRequireDefault(_conf);

var _components = require('./components');

var _components2 = _interopRequireDefault(_components);

var _services = require('./services');

var _services2 = _interopRequireDefault(_services);

var _partials = require('./partials');

var _partials2 = _interopRequireDefault(_partials);

angular.module('App', ['App.components', 'App.partialsPrecompile', 'App.services', 'App.routes', 'App.contants', 'App.configutarions', 'App.locales']);

angular.bootstrap(document.body, ['App']);

// angular.module('App').run(function() {
//   console.log('Running Angular with browserify')
// })

},{"./components":15,"./conf":18,"./partials":21,"./services":23}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (ngComponent) {
  ngComponent.controller('loginCtrl', loginCtrl);

  function loginCtrl($state, FormForConfiguration, Auth, Utils, $translate) {
    var _ = this;

    FormForConfiguration.enableAutoLabels();
    _.user = {};
    _.sendingInfo = false;

    _.validationRules = {
      username: {
        inputType: 'text',
        placeholder: 'vendedor5000',
        required: true
      },
      password: {
        inputType: 'password',
        minlength: 8,
        required: true
      }
    };

    _.submit = function (user) {
      _.sendingInfo = true;
      user.username = user.username.toLowerCase();
      Auth.login(user).then(function (token) {
        Utils.swalSuccess($translate.instant('WELCOME_MESSAGE'));
        $state.go('users.dashboard');
        _.sendingInfo = false;
      })['catch'](function (error) {
        _.sendingInfo = false;
        console.log(error);
        Utils.swalError(error);
      });
    };
  }
};

module.exports = exports['default'];

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (ngComponent) {
  ngComponent.controller('logoutCtrl', logoutCtrl);

  function logoutCtrl($state, Auth) {
    Auth.logout();
    $state.go('login');
  }
};

module.exports = exports['default'];

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (ngComponent) {
  ngComponent.controller('signupCtrl', signupCtrl);

  function signupCtrl($state, User, FormForConfiguration, Auth, Utils, $translate) {
    var _ = this;
    FormForConfiguration.enableAutoLabels();
    _.user = {};
    _.sendingInfo = false;
    _.validationRules = {
      name: {
        inputType: 'text',
        placeholder: 'Juan Martinez',
        required: true
      },
      username: {
        inputType: 'text',
        placeholder: 'vendedor5000',
        required: true
      },
      email: {
        inputType: 'text',
        type: 'email',
        pattern: /\w+@\w+\.\w+/,
        placeholder: 'juan@martinez.com',
        required: true
      },
      password: {
        inputType: 'password',
        minlength: 8,
        required: true
      }
    };

    _.submit = function (user) {
      _.sendingInfo = true;
      user.email = user.email.toLowerCase();
      user.username = user.username.toLowerCase();
      User.create(user).then(function (result) {
        return Auth.login(user);
      }).then(function (user) {
        Utils.swalSuccess($translate.instant('SIGNUP_SUCCESS'));
        $state.go('users.dashboard');
        _.sendingInfo = false;
      })['catch'](function (error) {
        _.sendingInfo = false;
        Utils.swalError(error);
      });
    };
  }
};

module.exports = exports['default'];

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (ngComponent) {
  ngComponent.controller('updateTokenCtrl', updateTokenCtrl);

  function updateTokenCtrl(Auth, $state) {
    if (Auth.refreshToken()) {
      $state.go('login');
    }
  }
};

module.exports = exports['default'];

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (ngComponent) {
  ngComponent.controller('homeCtrl', homeCtrl);

  function homeCtrl(ENV) {
    var _ = this;
    _.Appname = ENV.app_name;
  }
};

module.exports = exports['default'];

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _node_modulesAngularFormForDistFormFor = require('../../node_modules/angular-form-for/dist/form-for');

var _node_modulesAngularFormForDistFormFor2 = _interopRequireDefault(_node_modulesAngularFormForDistFormFor);

var _node_modulesAngularFormForDistFormForDefaultTemplates = require('../../node_modules/angular-form-for/dist/form-for.default-templates');

var _node_modulesAngularFormForDistFormForDefaultTemplates2 = _interopRequireDefault(_node_modulesAngularFormForDistFormForDefaultTemplates);

angular.module('App.components', ['formFor', 'formFor.defaultTemplates']);

var components = angular.module('App.components');

// components.run(() => {
//   console.log('Running directives module')
// })

// How to add controller to the components module
require('./home/controller')(components);

// Auth controllers
require('./auth/login')(components);
require('./auth/signup')(components);
require('./auth/update_token')(components);
require('./auth/logout')(components);

// User controllers
require('./user/dashboard')(components);

// component example
// export default function(ngComponent) {
//   ngComponent.controllers('Example', Example)
// }

exports['default'] = components;
module.exports = exports['default'];

},{"../../node_modules/angular-form-for/dist/form-for":2,"../../node_modules/angular-form-for/dist/form-for.default-templates":1,"./auth/login":10,"./auth/logout":11,"./auth/signup":12,"./auth/update_token":13,"./home/controller":14,"./user/dashboard":16}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (ngComponent) {
  ngComponent.controller('dashboardCtrl', dashCtrl);

  function dashCtrl(currentUser) {
    var _ = this;
    console.log(currentUser);
    _.current_user = currentUser;
  }
};

module.exports = exports['default'];

},{}],17:[function(require,module,exports){
(function (process){
'use strict';

var NODE_ENV = process.env.NODE_ENV || 'development';

angular.module('App.contants', []);

var contants = angular.module('App.contants');

contants.constant('ENV', {
  app_name: 'Retiqueta',
  type: NODE_ENV,
  api: {
    url: NODE_ENV === 'production' ? 'https://192.168.0.1' : 'https://146.148.39.248'
  }
});

contants.run(function (ENV) {
  if (NODE_ENV === 'development') {
    window.ENV = ENV;
  }
});

}).call(this,require('_process'))
},{"_process":5}],18:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _locales = require('./locales');

var _locales2 = _interopRequireDefault(_locales);

angular.module('App.configutarions', ['ionic']);

var confs = angular.module('App.configutarions');

confs.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
});

confs.factory('authInterceptor', function ($rootScope, $q, $location) {
  return {
    request: function request(config) {
      config.headers = config.headers || {};
      var token = window.localStorage.getItem('token');
      if (typeof token !== 'undefined' && token !== 'null' && token !== null) {
        var token = JSON.parse(token);
        config.headers.Authorization = 'Bearer ' + token.access_token;
      }
      return config;
    },
    responseError: function responseError(response) {
      if (response.status === 401) {
        var string_token = window.localStorage.getItem('token');
        if (typeof token !== 'undefined' && token !== 'null' && token !== null) {
          $location.path('/update-token');
          return $q.reject(response);
        } else {
          window.localStorage.removeItem('token');
          $location.path('/login');
          return $q.reject(response);
        }
      } else {
        return $q.reject(response);
      }
    }
  };
});

confs.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $locationProvider.html5Mode(false);
  $httpProvider.interceptors.push('authInterceptor');
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

},{"./constants":17,"./locales":19,"./routes":20}],19:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _angularTranslate = require('angular-translate');

var _angularTranslate2 = _interopRequireDefault(_angularTranslate);

angular.module('App.locales', ['pascalprecht.translate']);

var locales = angular.module('App.locales');

locales.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    DO_LOGIN: 'I have account',
    DO_SIGNUP: 'I want a new account',
    SUBMIT: 'Create my account',
    SIGNUP_SUCCESS: 'Your account has been created',
    WELCOME_MESSAGE: 'Hi!, Welcome to Retiqueta',
    DASHBOARD_TITLE: 'Dashboard'
  });
  $translateProvider.translations('es', {
    DO_LOGIN: 'Ya poseo una cuenta',
    DO_SIGNUP: 'Quiero crearme una cuenta',
    SUBMIT: 'Crear mi cuenta',
    SIGNUP_SUCCESS: 'Tu cuenta ha sido creado con exito',
    WELCOME_MESSAGE: 'Bienvenido a Retiqueta',
    DASHBOARD_TITLE: 'Dashboard'
  });
  $translateProvider.useSanitizeValueStrategy('sanitize');
  $translateProvider.preferredLanguage('en');
});

},{"angular-translate":4}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _angularPermission = require('angular-permission');

var _angularPermission2 = _interopRequireDefault(_angularPermission);

angular.module('App.routes', ['ui.router', 'permission']);

var routes = angular.module('App.routes');

routes.run(function (Permission, Auth) {
  Permission.defineRole('anonymous', function () {
    return Auth.isAnonymous();
  }).defineRole('client', function () {
    return Auth.isClient();
  });
});

routes.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/',
    controller: 'homeCtrl as home',
    templateUrl: 'home/home.html',
    data: {
      permissions: {
        only: ['anonymous'],
        redirectTo: 'users.dashboard'
      }
    }
  }).state('login', {
    url: '/login',
    controller: 'loginCtrl as login',
    templateUrl: 'auth/login.html',
    data: {
      permissions: {
        only: ['anonymous']
      }
    }
  }).state('logout', {
    url: '/logout',
    controller: 'logoutCtrl',
    data: {
      permissions: {
        only: ['client']
      }
    }
  }).state('signup', {
    url: '/signup',
    controller: 'signupCtrl as signup',
    templateUrl: 'auth/signup.html',
    data: {
      permissions: {
        only: ['anonymous']
      }
    }
  }).state('update-token', {
    url: '/update-token',
    controller: 'updateTokenCtrl'
  }).state('users', {
    abstract: true,
    url: '/users',
    templateUrl: 'user/index.html',
    data: {
      permissions: {
        only: ['client'],
        redirectTo: 'login'
      }
    },
    resolve: {
      currentUser: function currentUser(Auth) {
        return Auth.getCurrentUser();
      }
    }
  }).state('users.dashboard', {
    url: '/dashboard',
    views: {
      'dashboard-tab': {
        templateUrl: 'user/dashboard.html',
        controller: 'dashboardCtrl as dash'
      }
    }
  });

  $urlRouterProvider.otherwise("/");
});

exports['default'] = routes;
module.exports = exports['default'];

},{"angular-permission":3}],21:[function(require,module,exports){
'use strict';

(function (module) {
  try {
    module = angular.module('App.partialsPrecompile');
  } catch (e) {
    module = angular.module('App.partialsPrecompile', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('auth/login.html', '<ion-view view-title="{{ \'DO_LOGIN\' | translate }}">\n' + '  <ion-content padding="true">\n' + '    <h1> {{ \'DO_LOGIN\' | translate }} </h1>\n' + '    <form form-for="login.user" form-for-builder validation-rules="login.validationRules" submit-with="login.submit(login.user)">\n' + '      <submit-button disable="sendingInfo" label="{{ \'SUBMIT\' | translate }}"></submit-button>\n' + '    </form>\n' + '  </ion-content>\n' + '</ion-view>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('App.partialsPrecompile');
  } catch (e) {
    module = angular.module('App.partialsPrecompile', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('auth/signup.html', '<ion-view view-title="{{ \'DO_SIGNUP\' | translate }}">\n' + '  <ion-content padding="true">\n' + '    <h1> {{ \'DO_SIGNUP\' | translate }} </h1>\n' + '    <form form-for="signup.user" form-for-builder validation-rules="signup.validationRules" submit-with="signup.submit(signup.user)">\n' + '      <submit-button disable="sendingInfo" label="{{ \'SUBMIT\' | translate }}"></submit-button>\n' + '    </form>\n' + '  </ion-content>\n' + '</ion-view>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('App.partialsPrecompile');
  } catch (e) {
    module = angular.module('App.partialsPrecompile', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('home/home.html', '<ion-view view-title="Bienvenida">\n' + '  <ion-content padding="true">\n' + '    <h1 class="Appname-center"> {{ home.Appname }} </h1>\n' + '    <a ui-sref="login" class="button button-block button-positive">\n' + '      {{ \'DO_LOGIN\' | translate }}\n' + '    </a>\n' + '    <a ui-sref="signup" class="button button-block button-positive">\n' + '      {{ \'DO_SIGNUP\' | translate }}\n' + '    </a>\n' + '  </ion-content>\n' + '</ion-view>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('App.partialsPrecompile');
  } catch (e) {
    module = angular.module('App.partialsPrecompile', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('user/dashboard.html', '<ion-view view-title="{{ \'DASHBOARD_TITLE\' | translate }}">\n' + '  <ion-content padding="true">\n' + '    <h1> {{ \'DASHBOARD_TITLE\' | translate }} </h1>\n' + '    <p>{{ dash.current_user.attributes.name }}</p>\n' + '  </ion-content>\n' + '</ion-view>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('App.partialsPrecompile');
  } catch (e) {
    module = angular.module('App.partialsPrecompile', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('user/index.html', '<ion-tabs class="tabs-icon-top tabs-positive">\n' + '\n' + '  <ion-tab title="Home" icon="ion-home" ui-sref="users.dashboard">\n' + '    <ion-nav-view name="dashboard-tab"></ion-nav-view>\n' + '  </ion-tab>\n' + '\n' + '</ion-tabs>');
  }]);
})();

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (ngComponent) {

  ngComponent.service('Auth', AuthFactory);

  function AuthFactory($rootScope, ENV, User, $q, $http) {
    var _this = this;

    if (ENV.type === 'development') {
      window.Auth = this;
    }

    this.user = {};
    this.updateTokenIntent = 0;

    $rootScope.$on('session:start', function () {
      _this.getUser();
    });

    $rootScope.$on('session:finish', function () {
      _this.user = {};
    });

    // Login user
    this.login = function (user) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: ENV.api.url + '/v1/authenticate',
        data: {
          grant_type: 'password',
          client_id: "ret-mobile-ios",
          login: user.username.toLowerCase(),
          password: user.password
        }
      }).success(function (result) {
        console.log(result);
        _this.loginToken(result);
        deferred.resolve(result);
      }).error(function (err) {
        _this.logout();
        $rootScope.$broadcast('session:finish');
        deferred.reject(err);
      });

      return deferred.promise;
    };

    this.refreshToken = function () {
      if (_this.updateTokenIntent === 0) {
        var _ret = (function () {
          _this.updateTokenIntent += 1;
          var deferred = $q.defer();
          $http({
            method: 'POST',
            url: ENV.api.url + '/v1/authenticate/token',
            data: {
              refresh_token: _this.getToken().refresh_token
            }
          }).then(function (result) {
            _this.updateToken(result.data);
            deferred.resolve(result);
          })['catch'](function (e) {
            deferred.reject(e);
          });
          return {
            v: deferred.promise
          };
        })();

        if (typeof _ret === 'object') return _ret.v;
      } else {
        _this.logout();
        return false;
      }
    };

    // Login token
    this.loginToken = function (token) {
      _this.updateToken(token);
      $rootScope.$broadcast('session:start');
    };

    // Logout user
    this.logout = function () {
      window.localStorage.clear();
      $rootScope.$broadcast('session:finish');
    };

    // Is anonymous
    this.isAnonymous = function () {
      var deferred = $q.defer();
      if (!_this.isLogin()) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
      return deferred.promise;
    };

    this.isClient = function () {
      var deferred = $q.defer();
      if (_this.isLogin()) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
      return deferred.promise;
    };

    // Is login
    this.isLogin = function () {
      var token = window.localStorage.getItem('token');
      return typeof token !== 'undefined' && token !== 'null' && token !== null;
    };

    // Get user data
    this.getUser = function () {
      var deferred = $q.defer();
      if (_this.isLogin()) {
        User.get(_this.getToken().user_id).then(function (result) {
          _this.user = result.data;
          deferred.resolve(_this.user);
        })['catch'](function (error) {
          _this.user = {};
          _this.logout();
          deferred.reject(error);
        });
      } else {
        deferred.reject({ data: 'your are not login' });
      }
      return deferred.promise;
    };

    // get current_user
    this.current_user = function () {
      var force = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      if (_this.user.hasOwnProperty('id') && !force) {
        return _this.user;
      }
    };

    this.getCurrentUser = function () {
      var deferred = $q.defer();
      if (typeof _this.current_user() === 'undefined') {
        return _this.getUser();
      } else {
        deferred.resolve(_this.current_user());
        return deferred.promise;
      }
    };

    this.hasRole = function (role) {
      var deferred = $q.defer();
      if (_this.current_user().hasOwnProperty('type') && _this.current_user().type === role) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
      return deferred.promise;
    };

    this.hasValue = function (value) {
      _this.current_user();
      if (_this.isLogin()) {
        return typeof _this.user[value] !== 'undefined' && _this.user[value] !== 'null' && _this.user[value] !== null;
      } else {
        return false;
      }
    };

    this.updateToken = function (newtoken) {
      var oldtoken = _this.getToken();
      newtoken = Object.assign({}, oldtoken, newtoken);
      return window.localStorage.setItem('token', JSON.stringify(newtoken));
    };

    this.getToken = function () {
      if (_this.isLogin()) {
        return JSON.parse(window.localStorage.getItem('token'));
      } else {
        return {};
      }
    };
  }
};

module.exports = exports['default'];

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ngResource = require('ng-resource');

var _ngResource2 = _interopRequireDefault(_ngResource);

(0, _ngResource2['default'])(window, angular);

angular.module('App.services', ['ngResource']);

var services = angular.module('App.services');

// services.run(() => {
//   console.log('Running services module')
// })

// How to add factories or services to the services module
// require('./example-factory.js')(services)

// Factory example code
// export default function(ngComponent) {
//   ngComponent.factory('exampleFactory', ExampleFactory)
// }

require('./auth')(services);
require('./user')(services);
require('./utils')(services);

exports['default'] = services;
module.exports = exports['default'];

},{"./auth":22,"./user":24,"./utils":25,"ng-resource":6}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (ngComponent) {
  ngComponent.factory('User', UserFactory);

  function UserFactory(ENV, $http, $q) {
    var Model = {
      get: function get(id) {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url: ENV.api.url + '/v1/users/' + id
        }).then(function (result) {
          deferred.resolve(result.data);
        })['catch'](function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      },
      create: function create(userObj) {
        return $http({
          method: 'POST',
          url: ENV.api.url + '/v1/registrations',
          data: {
            data: {
              type: "users",
              attributes: userObj
            }
          }
        });
      }
    };
    return Model;
  }
};

module.exports = exports['default'];

},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _sweetalert = require('sweetalert');

var _sweetalert2 = _interopRequireDefault(_sweetalert);

exports['default'] = function (ngComponent) {
  ngComponent.service('Utils', UtilsFactory);

  function UtilsFactory(ENV) {
    this.cleanErrors = function (error) {
      if (typeof error === 'undefined' || error === null) {
        return 'Error in the server';
      }
      if (error.hasOwnProperty('data')) {
        return JSON.stringify(error.data.detail).replace(/[{}\[\]\"]/g, '').replace(/error\:/g, '');
      } else {
        return JSON.stringify(error).replace(/[{}\[\]\"]/g, '').replace(/error\:/g, '');
      }
    };

    this.swalError = function (error) {
      this.alert('Oops...', this.cleanErrors(error), 'error');
    };

    this.swalSuccess = function (message, title) {
      title = typeof title === 'undefined' ? 'Great!' : title;
      this.alert(title, message, 'success');
    };

    this.alert = function (title, message, type) {
      if (ENV.type === 'development') {
        console.info('title');
        console.info(message);
      }
      (0, _sweetalert2['default'])(title, message, type);
    };
  }
};

module.exports = exports['default'];

},{"sweetalert":8}]},{},[9]);
