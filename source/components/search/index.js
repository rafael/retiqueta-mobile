export default function searchFactory (ngComponent) {
  ngComponent.controller('SearchProductCtrl', SearchProductCtrl)

  function SearchProductCtrl (Product, $stateParams, Utils) {
    // Initial state
    var _ = this
    _.text = ''
    _.products = []
    _.noResult = false
    _.loading = false

    // Search function
    _.search = searchProducts
    _.clear = clear

    if ($stateParams.hasOwnProperty('word') && typeof $stateParams.word !== 'undefined' && $stateParams.word !== '') {
      _.text = $stateParams.word
      _.search()
    } else {
      prePopulate()
    }

    function clear () {
      _.text = ''
      prePopulate()
    }

    function prePopulate () {
      return Product.getFeatured({include: 'product_pictures'})
      .then(setProducts)
      .catch(Utils.swalError)
    }

    function searchProducts (page = 0) {
      if (_.text === '') { return }

      _.noResult = false
      _.loading = true
      console.log('Searching: ', _.text)
      populateWithProduct(page)
    }

    function populateWithProduct (page) {
      Product.search({
        q: _.text,
        page_number: page,
        include: 'user,product_pictures'
      })
      .then(setProducts)
      .catch(Utils.swalError)
      .finally(() => {
        _.loading = false
        console.log('Search complete')
      })

    }

    function setProducts (newProducts) {
      _.products = newProducts
      _.noResult = _.products.length === 0 && _.text !== ''
    }

    Object.observe(_, (changes) => {
      changes.forEach((change) => {
        if (change.name === 'text' && _.text === '') {
          prePopulate()
        }
      })
    })

  }
}
