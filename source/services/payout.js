import paginable from '../libs/paginable'
import creatable from '../libs/creatable'

export default function PayoutFactory (ngComponent) {
  ngComponent.factory('Payout', Payout)

  function Payout (ENV, $http, $q) {    
    let Model = {
      create: creatable(`${ENV.api.url}/v1/payouts`, 'payouts', $http, $q),
      all: paginable(`${ENV.api.url}/v1/payouts`, $http, $q)
    }

    if (ENV.isDevelopment()) {
      window.Payout = Model
    }

    return Model
  }
}
