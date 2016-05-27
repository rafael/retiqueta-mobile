export default function(ngComponent) {

  ngComponent.factory('MercadopagoFactory', MercadopagoFactory)

  function MercadopagoFactory (ENV, $q) {
    Mercadopago.setPublishableKey(ENV.mercadopago_keys.public)

    Object.assign(Mercadopago, {
      guessPaymentMethod: guessPaymentMethodFactory($q),
      resolveToken: createTokenFactory($q),
      resolveIdentificationTypes: resolveIdentificationTypesFactory($q)
    })

    return Mercadopago
  }
}

function resolveIdentificationTypesFactory ($q) {
  let methods = { types: [] }
  return (cached = false) => {
    if (!cached) {
      Mercadopago.getIdentificationTypes((status, result) => {
        if (status === 200) {
          methods.types =  result
        }
      })
    }
    return methods
  }
}

function guessPaymentMethodFactory ($q) {
  return function guessPaymentMethod (cardNumber) {
    var defered = $q.defer()
    Mercadopago.getPaymentMethod({ "bin": getBin(cardNumber)}, (status, response) => {
      if (status === 200) {
        defered.resolve({status, response})
      } else {
        defered.reject({status, response})
      }
    })

    return defered.promise
  }
}

function createTokenFactory ($q) {
  return function resolveToken (form) {
    var defered = $q.defer()
    Mercadopago.createToken(form, (status, response) => {
      if (status === 200) {
        defered.resolve({status, response})
      } else {
        defered.reject({status, response})
      }
    })

    return defered.promise
  }
}

function getBin(ccNumber) {
  return ccNumber.replace(/[ .-]/g, '').slice(0, 6)
}

