import { Rules as FormRules, baseErrorsObject } from './product_form_fields'

export default function ProductSelectionFactory (ngComponent) {
  ngComponent.controller('SelectCategoryCtrl', SelectCategoryCtrl)

  function SelectCategoryCtrl ($state, ProductStore) {
    var _ = this
    _.product = ProductStore.get()
    _.validationRules = FormRules

    _.onChangeValueCallBack = () => {
      ProductStore.set(_.product)
      $state.go('productsNew', {}, { location: 'replace', reload: true })
    }

    Object.observe(_.product, changes => {
      changes.forEach(change => {
        _.onChangeValueCallBack()
      })
    })
  }
}
