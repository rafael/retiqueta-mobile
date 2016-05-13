import service from './service'

let today = new Date()
const creditCardObj = {
  cardNumber: '',
  securityCode: '',
  cardExpirationMonth: '',
  cardExpirationYear: '',
  cardholderName: '',
  docNumber: ''
}

export default function CreditCardTokenFactory (ngComponent) {
  ngComponent.directive('formatCredictCard', formatCredictCard)
  ngComponent.directive('creditCardToken', creditCardToken)


  function formatOnWatch ($scope, ngModel) {
    $scope.$watch(function() {
      return ngModel.$modelValue;
    }, function() {
      ngModel.$setViewValue(formatNumber(ngModel.$modelValue));
      ngModel.$render();
    });
  }

  function formatNumber (number) {
    return number.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim()
  }

  function formatCredictCard () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link (scope, element, attrs, ctrl) {
        ctrl.$parsers.push(value => {
          if (typeof value === 'string') {
            return value.replace(/\D/g, '')
          }  else {
            return value
          }
        })
        ctrl.$formatters.push(value => {
          if (typeof value === 'string') {
            return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim()
          }
        })
        formatOnWatch(scope, ctrl)
      }
    }
  }

  function creditCardToken (MercadopagoFactory) {
    return {
      restrict: 'E',
      templateUrl: 'checkout/creditcard_token/template.html',
      scope: {
        onTokenHandler: '=',
        onSubmitHandler: '=',
        savingOrder: '=',
        creditcard: "=",
        hideSubmit: "=",
        formController: "="
      },
      link: {
        pre (scope) {
          scope.creditcard = creditCardObj
        },
        post (scope, element, attrs) {
          let formElement = document.querySelector('form[name="creditcardinfo"]')
          let helpersFunctions = service(scope.creditcard)

          scope.errors = helpersFunctions.getErrors()
          scope.createToken = createToken
          scope.changeCredictCard = changeCredictCard
          scope.hasError = hasError
          scope.identificationTypes = MercadopagoFactory.resolveIdentificationTypes()

          if (scope.formController) {
            Object.assign(scope.formController, { submit: createToken })
          }

          Object.observe(scope.creditcard, (changes) => {
            changes.forEach((change) => { 
              scope.errors[change.name].detail = ''
              if (change.name === 'cardNumber' && change.type === 'update') {
                changeCredictCard()
              }
            })
          })

          function changeCredictCard () {
            if (scope.creditcard.cardNumber.length >= 10) {
              MercadopagoFactory.guessPaymentMethod(scope.creditcard.cardNumber)
              .then(onGuess)
              .catch(errorOnGuess)
            }
          }

          function hasError (field) {
            return scope.errors[field].detail !== ''
          }

          function createToken (form) {
            scope.onSubmitHandler()
            MercadopagoFactory.resolveToken(formElement)
            .then(onCreateToken)
            .catch(errorOnCreateToken)
          }

          function onGuess (response) {
            //console.info("Success on guess")
            scope.creditcard.methodID = response.response[0].id
          }

          function errorOnGuess (response) {
            //console.info("Error Guess")
            //console.log(response)
          }

          function onCreateToken (response) {
            //console.info("Success on create token")
            scope.onTokenHandler(response.response.id, scope.creditcard.methodID)
          }

          function errorOnCreateToken (response) {
            //console.info('Error on create token')
            scope.errors = helpersFunctions.extractErrors(response.response.cause)
            //console.log(scope.errors)
          }
        }
      }
    }
  }
}
