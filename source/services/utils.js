import swal from 'sweetalert'

export default function(ngComponent) {
  ngComponent.service('Utils', UtilsFactory)

  function UtilsFactory(ENV) {
    this.cleanErrors = function(error) {
      if(typeof error === 'undefined' || error === null) {
        return 'Error in the server'
      }
      if(error.hasOwnProperty('data')) {
        return JSON.stringify(error.data.detail).replace(/[{}\[\]\"]/g,'').replace(/error\:/g,'');
      } else {
        return JSON.stringify(error).replace(/[{}\[\]\"]/g,'').replace(/error\:/g,'');
      }
    };

    this.swalError = function(error) {
      this.alert('Oops...', this.cleanErrors(error), 'error');
    };

    this.swalSuccess = function(message, title) {
      title = (typeof title === 'undefined') ? 'Great!' : title;
      this.alert(title, message, 'success');
    };

    this.alert = (title, message, type) => {
      if(ENV.type === 'development') {
        console.info('title')
        console.info(message)
      }
      swal(title,message, type)
    }
  }
}
