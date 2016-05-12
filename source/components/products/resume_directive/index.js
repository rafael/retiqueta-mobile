export default function ResumeProductDirective (ngComponent) {
  ngComponent.directive('resumeProduct', ResumenProductTag)

  function ResumenProductTag () {
    return {
      templateUrl: 'products/resume_directive/template.html',
      restrict: 'E',
      replace: true,
      scope: {
        product: '=',
      },
      link: ResumenProductTagLink     
    }
  }

  function ResumenProductTagLink (scope, element, attrs) {
    scope.product.relationships.product_pictures = scope.product.relationships.product_pictures.slice(0, 1)[0]
  }

}
