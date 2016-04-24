export default function productCheckoutFactory (ngComponent) {
  ngComponent.controller('productCheckout', productCheckout)

  function productCheckout ($scope, ProductData, Order, Utils, $state) {
    var _ = this
    var form
    _.savingOrder = false
    _.product = ProductData
    _.order = {}
    _.formController = {}
    _.validationRules = {
      address: {
        required: true,
        placeholder: 'Put your address here'
      }
    }
    _.PayOrder = PayOrder
    _.submitCreditForm = submitCreditForm
    _.creditcard = {}
    _.cardioReader = cardioReader

    function cardioReader (responsePromise) {
      _.savingOrder = true
      responsePromise
      .then((response) => {
        Object.assign(_.creditcard, {
          cardNumber: response.card_number,
          cardExpirationMonth: response.expiry_month,
          cardExpirationYear: response.expiry_year,
          securityCode: response.cvv
        })
        console.log(_.creditcard)
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        _.savingOrder = false
      })
    }

    function submitCreditForm () {
      _.formController.validateForm(true)
      .then(() => {
        if (!_.savingOrder && _.order.hasOwnProperty('token') && _.order.hasOwnProperty('payment_method_id')) {
          saveOrder()
        }
      })
    }

    function saveOrder () {
      _.savingOrder = true
      var orderObj = Order.buildOrder(_.order, [_.product])
      Order.create(orderObj)
      .then(result => {
        $state.go('users.orders')
      })
      .catch(error => {
        console.log(error)
        Utils.swalError(error)
      })
      .finally(() => {
        _.savingOrder = false
      })
    }

    function successOnSaveOrder (result) {
      console.log(result)
    }

    function errorOnSaveOrder (error) {
      console.log(error)
    }

    function PayOrder (token, payment_method_id) {
      _.order.token = token
      _.order.payment_method_id = payment_method_id
      submitCreditForm()
    }

    function getForm() {
      form = document.getElementById("address-form")
    }

    getForm()
  }
}
