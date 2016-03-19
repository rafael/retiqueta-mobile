import { baseErrorsFactory, baseErrorObj } from '../../../libs/merge_validations'

export default function CreditCardTokenFactory (data) {
  let errors = baseErrorsFactory(data)

  return {
    extractErrors: extractErrorsFactory(errors),
    getErrors() { return {...errors} }
  }
}

function extractErrorsFactory (errors) {
  let errorKeys = Object.keys(errors)
  let extractErrors = (causes) => {
    let result = {...errors }
    errorKeys.forEach(errorType => {
      let searchError = new RegExp(errorType, 'i')
      let regexForRemoval = new RegExp(', invalid parameter', 'i')
      let message = causes.filter(cause => {
        return cause.description.search(searchError) >= 0
      })
      .map(cause => {
        return cause.description.replace(searchError, '')
      })
      .join(', ')
      .replace(regexForRemoval, '')
      result[errorType] = {
        ...errors[errorType],
        detail: message
      }
    })

    return result
  }
  return extractErrors
}
