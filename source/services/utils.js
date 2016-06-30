import swal from 'sweetalert'

export default function UtilsFactory (ngComponent) {
  ngComponent.service('Utils', UtilsFactory)

  function UtilsFactory (ENV, $rootScope, $translate, $ionicPlatform) {
    let YesNoActionsText = 'Yes, No' 

    $translate('YES_NO_CONFIRM')
    .then((translation) => {
      YesNoActionsText = translation
    })

    $ionicPlatform.ready(function() {
      if (typeof navigator.notification === 'undefined') {
        navigator.notification = {
          alert(message) { return window.alert(message) },
          confirm(message, cb) {
            if (window.confirm(message)) {
              cb(1)          
            }
          }
        }
      }
    })

    this.logger = {
      info () {
        if (ENV.isDevelopment() || ENV.debug()) {
          console.info(...arguments)
        }
      },
      log () {
        if (ENV.isDevelopment() || ENV.debug()) {
          console.log(...arguments)
        }
      },
      warn () {
        if (ENV.isDevelopment() || ENV.debug()) {
          console.warn(...arguments)
        }
      }
    }

    this.cleanErrors = (error) => {
      if (typeof error === 'undefined' || error === null) { return 'Error in the server' }
      let errorMessage = ''
      
      if (error.hasOwnProperty('data') && error.data !== null && error.data.hasOwnProperty('detail')) {
        errorMessage = JSON.stringify(error.data.detail) || ''
      } else if (error.hasOwnProperty('data') && error.data !== null) {
        errorMessage = JSON.stringify(error.data) || ''
      } else if (typeof error === 'string') {
        errorMessage = error
      } else {
        errorMessage = 'A problem occur getting data'
      }

      return errorMessage.replace(/[{}\[\]\"]/g, '').replace(/error\:/g, '')
    }

    this.swalError = (error) => {
      this.logger.log(error)
      if (error.hasOwnProperty('status') && error.status === 500) {
        return
      }
      this.alert('Oops...', this.cleanErrors(error), 'error')
    }

    this.swalSuccess = (message, title = 'Great!') => {
      this.alert(title, message, 'success')
    }

    this.alert = (title, message, type, alertCallback = this.alertCallback, buttonName = 'Ok') => {
      this.logger.info('title')
      this.logger.info(message)

      $rootScope.$evalAsync(() => {
        navigator.notification.alert(message, alertCallback, title, buttonName)
      })
    }

    this.confirm = (title, message, confirmCallback, buttonOptions = YesNoActionsText) => {
      $rootScope.$evalAsync(() => {
        navigator.notification.confirm(message, confirmCallback, title, buttonOptions)
      })
    }

    this.alertCallback = () => {
      // do something
    }
  }
}
