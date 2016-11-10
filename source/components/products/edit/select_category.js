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
      ProductStore.set(Object.assign(_.product, {category: category}));
      $state.go('users.productDetails.edit', { productID: _.product.id }, { location: 'replace', reload: true });
    }

    function goBack () {
      return history.back();
    }

    $scope.$on("$ionicView.enter", (event, data) => {
      _.product = ProductStore.get()
    })
  }
}
