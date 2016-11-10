import { Rules as FormRules, baseErrorsObject } from './product_form_fields'

export default function ProductSelectEditCategoryFactory (ngComponent) {
  ngComponent.controller('productSelectEditCategoryCtrl', productSelectEditCategoryCtrl)

  function productSelectEditCategoryCtrl ($state, ProductStore, ENV, $scope, $ionicHistory, $stateParams) {
    var _ = this;
    _.validationRules = FormRules;
    _.goBack = goBack

    _.onChangeValueCallBack = (category) => {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('product edit select_category');
      }
      debugger;
      $state.go('users.productsEdit', { productID: $stateParams.productID, category: category }, { location: 'replace', reload: true });
    }

    function goBack () {
      return history.back();
    }
  }
}
