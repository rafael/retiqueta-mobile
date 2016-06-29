export default function productCheckoutFactory (ngComponent) {
  ngComponent.controller('productCheckout', productCheckout)

  function productCheckout ($ionicAnalytics, $scope, Product, Order, Utils, $state, $stateParams) {
    var _ = this
    var form
    _.savingOrder = false
    _.product = {}
    _.order = {}
    _.formController = {}
    _.creditcard = {}
    _.creditcardCtrl = {}
    _.validationRules = {
      address: {
        required: false,
        placeholder: 'Put your address here'
      }
    }
    _.PayOrder = PayOrder
    _.submitCreditForm = submitCreditForm
    _.cardioReader = cardioReader
    _.submitOrder = submitOrder

    function submitOrder () {
      _.creditcardCtrl.submit()
    }

    function LoadProduct () {
      $ionicAnalytics.track('fetch start', {
        action: 'checkout products'
      })
      Product.get($stateParams.productID,  {
        include: 'user,product_pictures'
      })
      .then((product) => {
        $ionicAnalytics.track('fetch success', {
          action: 'checkout products'
        })
        _.product = product
      })
      .catch((e) => {
        $ionicAnalytics.track('fetch error', {
          action: 'checkout products',
          error: e
        })
        Utils.swalError(e)
      })
    }

    function cardioReader (responsePromise) {
      _.savingOrder = true
      responsePromise
      .then((response) => {
        $ionicAnalytics.track('fetch success', {
          action: 'scan credit card'
        })
        Object.assign(_.creditcard, {
          cardNumber: response.card_number,
          cardExpirationMonth: response.expiry_month,
          cardExpirationYear: response.expiry_year,
          securityCode: response.cvv
        })
      })
      .catch((error) => {
        $ionicAnalytics.track('fetch error', {
          action: 'scan credit card',
          error
        })
        Utils.swalError(error)
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
      .then(successOnSaveOrder)
      .catch(errorOnSaveOrder)
      .finally(() => {
        _.savingOrder = false
      })
    }

    function successOnSaveOrder (result) {
      $ionicAnalytics.track('fetch success', {
        action: 'checkout',
        id: $stateParams.productID,
        'order_id': result.id
      })
      _.creditcardCtrl.clearForm()
      _.order = {}
      $state.go('users.ordersChat', { id: result.id })
    }

    function errorOnSaveOrder (error) {
      $ionicAnalytics.track('fetch error', {
        action: 'checkout',
        id: $stateParams.productID,
        errors: error     
      })

      Utils.swalError(error)
    }

    function PayOrder (token, payment_method_id) {
      _.order.token = token
      _.order.payment_method_id = payment_method_id
      submitCreditForm()
    }

    function getForm() {
      LoadProduct()
      form = document.getElementById("address-form")
    }

    $scope.$on("$ionicView.enter", function(event, data) {
      $ionicAnalytics.track('Load', {
        action: 'checkout',
        id: $stateParams.productID
      })
      _.creditcardCtrl.clearForm()
    })

    getForm()
  }
}
