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
  ngComponent.directive('creditCardToken', creditCardToken)

  function creditCardToken (MercadopagoFactory) {
    return {
      restrict: 'E',
      templateUrl: 'checkout/creditcard_token/template.html',
      scope: {
        onTokenHandler: '=',
        onSubmitHandler: '=',
        savingOrder: '=',
        creditcard: "="
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
          MercadopagoFactory.getIdentificationTypes()

          Object.observe(scope.creditcard, function(changes) {
            changes.forEach(function(change) {
              if (change.name === 'cardNumber' && change.type === 'update') {
                changeCredictCard()
              }
            })
          })

          function changeCredictCard () {
            if (scope.creditcard.cardNumber.length >= 6) {
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
