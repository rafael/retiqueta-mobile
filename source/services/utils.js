import swal from 'sweetalert'

export default function UtilsFactory (ngComponent) {
  ngComponent.service('Utils', UtilsFactory)

  function UtilsFactory (ENV, $rootScope, $translate) {
    if (typeof navigator.notification === 'undefined') {
      navigator.notification = {
        alert(message) { return window.alert(message) },
        confirm(message, cb) {
          if (window.confirm(message)) {
            cb.call()
          }
        }
      }
    }

    this.cleanErrors = (error) => {
      if (typeof error === 'undefined' || error === null) {
        return 'Error in the server'
      }

      if (ENV.isDevelopment()) {
        console.log(error)
      }

      let errorMessage = ''

      if (error.hasOwnProperty('data') && error.data !== null && error.data.hasOwnProperty('detail')) {
        errorMessage = JSON.stringify(error.data.detail) || ''
      } else if (error.hasOwnProperty('data') && error.data !== null) {
        errorMessage = JSON.stringify(error.data) || ''
      } else {
        errorMessage = 'A problem occur getting data from retiqueta'
      }

      return errorMessage.replace(/[{}\[\]\"]/g, '').replace(/error\:/g, '')
    }

    this.swalError = (error) => {
      this.alert('Oops...', this.cleanErrors(error), 'error')
    }

    this.swalSuccess = (message, title = 'Great!') => {
      this.alert(title, message, 'success')
    }

    this.alert = (title, message, type, alertCallback = this.alertCallback, buttonName = 'Ok') => {
      if (ENV.isDevelopment()) {
        console.info('title')
        console.info(message)
      }
      $rootScope.$evalAsync(() => {
        navigator.notification.alert(message, alertCallback, title, buttonName)
      })
    }

    this.confirm = (title, message, confirmCallback, buttonOptions = "Yes, No") => {
      $rootScope.$evalAsync(() => {
        navigator.notification.confirm(message, confirmCallback, title, buttonOptions)
      })
    }

    this.alertCallback = () => {
      // do something
    }
  }
}
