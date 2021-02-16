export default function productCheckoutFactory (ngComponent) {
  ngComponent.controller('productCheckout', productCheckout)

  function productCheckout (ENV, $scope, $ionicHistory, Product, Order, Utils, $state, $stateParams) {
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
    _.goBack = goBack

    function submitOrder () {
        if (ENV.isProduction()) {
          facebookConnectPlugin.logEvent('checkout submit');
        }
      _.creditcardCtrl.submit()
    }

    function LoadProduct () {
      Product.get($stateParams.productID,  {
        include: 'user,product_pictures'
      })
      .then((product) => {
        _.product = product
      })
      .catch((e) => {
        Utils.swalError(e)
      })
    }

    function goBack () {
      if ($ionicHistory.backView() !== null) {
        $ionicHistory.goBack()
      } else {
        $state.go('users.productsSearch')
      }
    }

    function cardioReader (responsePromise) {
      _.savingOrder = true
      responsePromise
      .then((response) => {
        if (ENV.isProduction()) {
          facebookConnectPlugin.logEvent('checkout cardio success');
        }
        Object.assign(_.creditcard, {
          cardNumber: response.card_number,
          cardExpirationMonth: response.expiry_month,
          cardExpirationYear: response.expiry_year,
          securityCode: response.cvv
        })
      })
      .catch((error) => {
        if (ENV.isProduction()) {
          facebookConnectPlugin.logEvent('checkout cardio error')
        }
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
      _.savingOrder = true;
      var orderObj = Order.buildOrder(_.order, [_.product]);
      Order.create(orderObj)
      .then(successOnSaveOrder)
      .catch(errorOnSaveOrder)
      .finally(() => {
        _.savingOrder = false;
      });
    }

    function successOnSaveOrder (result) {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('checkout request success');
        facebookConnectPlugin.logPurchase(result.attributes.total_amount,
                                          result.attributes.currency);
      }
      _.creditcardCtrl.clearForm();
      _.order = {};
      $state.go('users.ordersChat', { id: result.id });
    }

    function errorOnSaveOrder (error) {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('checkout request error')
      }
      Mercadopago.tokenId = null
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

      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('checkout load', {
          id: $stateParams.productID
        })
      }
      _.creditcardCtrl.clearForm()
    })

    getForm()
  }
}
