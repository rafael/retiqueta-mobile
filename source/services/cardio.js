const defaultScaningValues = {
  "expiry": true,
  "cvv": true,
  "zip": false,
  "expiry_month": true,
  "expiry_year": true,
  "suppressManual": false,
  "suppressConfirm": false,
  "hideLogo": false
}

export default function CardIOServiceFactory (ngComponent) {
  ngComponent.factory('CardIOService', CardIOService)

  function CardIOService (ENV, $q) {
    let CardIO = Object.create(window.CardIO)
    
    if (ENV.isDevelopment()) {
      if (typeof CardIO === 'undefined') {
        CardIO = {
          canScan() {},
          scan() {}
        }
      }
    }

    let Model = {
      canScan () {
        let defered = $q.defer()
        CardIO.canScan((canScan) => {
          (canScan) ? defered.resolve() : defered.reject()
        }, () => {
          defered.reject()
        })
        return defered.promise
      },
      scan (options = {}) {
        options = Object.assign({}, defaultScaningValues, options)
        let defered = $q.defer()
        CardIO.scan(options, (response) => {
          defered.resolve(response)
        }, (e) => {
          defered.reject(e)
        })
        return defered.promise
      }
    }

    if (ENV.isDevelopment()) {
      window.CardIOService = Model
    }

    return Model
  }
}
