import { baseErrorObj } from '../../../libs/merge_validations'

export const Rules = {
  category: {
    required: true,
    placeholder: 'Select',
    values: [
      { value: 'Ropa', label: '#Ropa', bg: '#777', icon: 'ion-tshirt-outline' },
      { value: 'Zapatos', label: '#Zapatos', bg: '#888', icon: 'ion-android-walk' },
      { value: 'Carteras', label: '#Carteras', bg: '#999', icon: 'ion-bag' },
      { value: 'Accesorios', label: '#Accesorios', bg: '#AAA', icon: 'ion-bowtie' }
    ]
  },
  title: {
    inputType: 'text',
    required: true,
    placeholder: 'Title of your product'
  },
  size: {
    inputType: 'text',
    required: true,
    placeholder: 'Size'
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
    placeholder: 'Original price',
    pattern: /[0-9]*/,
    inputPattern: '[0-9]*',
  },
  price: {
    inputType: 'text',
    required: true,
    placeholder: 'Your price',
    pattern: /[0-9]*/,
    inputPattern: '[0-9]*',
  }
}

export const baseErrorsObject = {
  category: Object.assign({}, baseErrorObj),
  title: Object.assign({}, baseErrorObj),
  description: Object.assign({}, baseErrorObj),
  original_price: Object.assign({}, baseErrorObj),
  price: Object.assign({}, baseErrorObj)
}
