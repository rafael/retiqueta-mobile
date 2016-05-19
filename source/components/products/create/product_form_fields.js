import { baseErrorObj } from '../../../libs/merge_validations'

export const Rules = {
  category: {
    required: true,
    placeholder: 'Select',
    values: [
      { value: '#ropa', label: '#Ropa', bg: '#777', icon: 'ion-tshirt-outline' },
      { value: '#zapatos', label: '#Zapatos', bg: '#888', icon: 'ion-android-walk' },
      { value: '#carteras', label: '#Carteras', bg: '#999', icon: 'ion-bag' },
      { value: '#accesorios', label: '#Accesorios', bg: '#AAA', icon: 'ion-bowtie' }
    ]
  }, 
  description: {
    inputType: 'text',
    required: true,
    multiline: true,
    placeholder: 'Lindo pantal\ón #tallaM #pantalon #negro'
  },
  location: {
    inputType: 'text',
    required: true,
    placeholder: 'Estado, Ciudad'
  },
  original_price: {
    inputType: 'text',
    required: true,
    placeholder: 'Precio original',
    // pattern: /[0-9]*/,
    // inputPattern: '[0-9]*',
  },
  price: {
    inputType: 'text',
    required: true,
    placeholder: 'Precio Retiqueta',
    // pattern: /[0-9]*/,
    // inputPattern: '[0-9]*',
  }
}

export const baseErrorsObject = {
  category: Object.assign({}, baseErrorObj),
  location: Object.assign({}, baseErrorObj),
  description: Object.assign({}, baseErrorObj),
  original_price: Object.assign({}, baseErrorObj),
  price: Object.assign({}, baseErrorObj)
}
