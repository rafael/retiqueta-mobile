import { Rules as FormRules, baseErrorsObject } from './product_form_fields'

export default function ProductSelectionFactory (ngComponent) {
  ngComponent.controller('SelectCategoryCtrl', SelectCategoryCtrl)

  function SelectCategoryCtrl ($state, ProductStore, ENV, $scope) {
    var _ = this
    _.product = ProductStore.get()
    _.validationRules = FormRules
    _.onChangeValueCallBack = (category) => {
      ProductStore.set(Object.assign(_.product, {category: category}))
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('product create select_category');
      }
      $state.go('productsNew', {}, { location: 'replace', reload: true })
    }

    $scope.$on("$ionicView.enter", (event, data) => {
      _.product = ProductStore.get()
    })
  }
}
