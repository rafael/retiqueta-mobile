export function extractErrorByField (httpError, values, errorsTypes) {
  let result = {}
  errorsTypes.forEach(errorType => {
    result[errorType] = Object.assign({}, baseErrorObj)
    let errorTypeRegex = new RegExp(errorType, 'i')
    if (httpError.detail.search(errorTypeRegex) >= 0) {
      let message = httpError.detail.split(',').filter(errorMessage => {
        return errorMessage.search(errorTypeRegex) >= 0
      }).join(', ')
      result[errorType] = Object.assign({}, result[errorType], {
        detail: message,
        last_time_value: values[errorType]
      })
    }
  })
  return result
}

export function validationFactory (field, $q) {
  return function(value) {
    var value_to_test = this.errors[field]
    if (value_to_test.detail === '') {
      return $q.resolve()
    } else if(value_to_test.last_time_value !== value) {
      return $q.resolve()
    } else {
      return $q.reject(value_to_test.detail)
    }
  }
}

export function baseErrorsFactory (obj) {
  let result = {}
  Object.keys(obj).forEach(key => {
    result[key] = Object.assign({}, baseErrorObj)
  })
  return result
}

export const baseErrorObj = {
  detail: "",
  last_time_value: ""
}

