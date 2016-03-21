export default function FeaturedDirective (ngComponent) {
  ngComponent.directive('featuredProducts', featuredProducts)

  function featuredProducts (Product) {
    return {
      templateUrl: 'products/featured/template.html',
      restrict: 'E',
      scope: {
        render: '=',
        products: '='
      },
      link (scope, element, attrs) {
        scope.hasPicture = hasPicture

        function hasPicture (productPictures) {
          return productPictures.length> 0
        }

        function loadFeatured () {
          Product.getFeatured({
            include: 'user,product_pictures'
          })
          .then(resullt => {
            scope.products = result
          })
          .catch(e => {
            console.log(e)
          })
        }

        function render () {
          if (scope.render === true) {
            loadFeatured()
          }
        }

        render()

        Object.observe(scope, (changes) => {
          changes.forEach(change =>{
            if (change.name === 'render') {
              render()
            }
          })
        })
      }
    }
  }
}