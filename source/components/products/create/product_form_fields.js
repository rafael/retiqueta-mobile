import { baseErrorObj } from '../../../libs/merge_validations'

export const Rules = {
  category: {
    required: true,
    placeholder: 'Select a Category',
    values: [
      { value: 'Ropa', label: 'Ropa' },
      { value: 'Zapatos', label: 'Zapatos' },
      { value: 'Carteras', label: 'Carteras' },
      { value: 'Accesorios', label: 'Accesorios' }
    ]
  },
  title: {
    inputType: 'text',
    required: true,
    placeholder: 'Title of your product'
  },
  description: {
    inputType: 'text',
    required: true,
    multiline: true,
    placeholder: 'Describe your product'
  },
  original_price: {
    inputType: 'text',
    required: true,
    placeholder: 'Original price'
  },
  price: {
    inputType: 'text',
    required: true,
    placeholder: 'Your price'
  }
}

export const baseErrorsObject = {
  category: Object.assign({}, baseErrorObj),
  title: Object.assign({}, baseErrorObj),
  description: Object.assign({}, baseErrorObj),
  original_price: Object.assign({}, baseErrorObj),
  price: Object.assign({}, baseErrorObj)
}
