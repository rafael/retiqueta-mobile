export default function searchFactory (ngComponent) {
  ngComponent.controller('SearchProductCtrl', SearchProductCtrl)

  function SearchProductCtrl (Product, $stateParams) {
    // Initial state
    var _ = this
    _.text = ''
    _.products = []
    _.noResult = false
    _.loading = false

    // Search function
    _.search = (page = 0) => {
      _.loading = true
      _.noResult = false
      console.log('Searching: ', _.text)

      Product.search({
        q: _.text,
        page_number: page,
        include: 'user,product_pictures'
      })
        .then(result => {
          _.setProducts(result)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          _.loading = false
          console.log('Search complete')
        })
    }

    _.setProducts = (newProducts) => {
      _.products = newProducts
      _.noResult = _.products.length === 0 && _.text !== ''
    }

    if ($stateParams.hasOwnProperty('word') && typeof $stateParams.word !== 'undefined' && $stateParams.word !== '') {
      _.text = $stateParams.word
      _.search()
    }
  }
}
