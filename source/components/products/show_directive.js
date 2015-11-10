export default function(ngComponent) {
  ngComponent.directive('productTag', productTag)

  function productTag() {
    return {
      templateUrl: 'products/show_directive.html',
      retrict: 'E',
      scope: {
        product: '='
      },
      link(scope, element) {},
    }
  }
}
