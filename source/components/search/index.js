export default function(ngComponent) {
  ngComponent.controller('SearchProductCtrl', SearchProductCtrl)

  function SearchProductCtrl(Product, $stateParams) {
    // Initial state
    var _ = this
    _.text = ''
    _.products = []

    // Search function 
    _.search = (page = 0) => {
      console.log('Searching: ', _.text) 
      Product.search({ 
        q: _.text,
        page_number: page,
        include: 'product_pictures'
      })
      .then(result => {
        _.products = result
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        console.log('Search complete')
      })
    }

    if($stateParams.hasOwnProperty('word') && typeof $stateParams.word !== 'undefined' && $stateParams.word !== '') {
      _.text = $stateParams.word
      _.search()
    }
  }
}
