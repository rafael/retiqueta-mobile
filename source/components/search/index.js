export default function searchFactory (ngComponent) {
  ngComponent.controller('SearchProductCtrl', SearchProductCtrl)

  function SearchProductCtrl (Product, $stateParams, Utils, $q) {
    var _ = this
    _.text = ''
    _.products = []
    _.noResult = false
    _.loading = false
    _.page = 0

    // Search function
    _.search = searchProducts
    _.loadMore = loadMore
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

    function loadMore (nextpage) {
      if (_.text !== '') {
        return populateWithProduct(nextpage, true)
      } else {
        return Promise.resolve()
      }
    }

    function searchProducts (page = 0) {
      if (_.text === '') { return }
      _.noResult = false
      _.loading = true
      console.log('Searching: ', _.text)
      populateWithProduct(page)
    }

    function populateWithProduct (page, add = false) {
      return Product.search({
        q: _.text,
        'page[number]': page,
        'page[size]': 15,
        include: 'user,product_pictures'
      }).then((result) => { 
        return setProducts(result, add) 
      })
      .catch(Utils.swalError)
      .finally(() => {
        _.loading = false
        console.log('Search complete')
      })
    }

    function setProducts (newProducts, add) {
      if (add) {
        _.products = _.products.concat(newProducts)
      } else {
        _.products = newProducts
      }
      _.noResult = _.products.length === 0 && _.text !== ''
      return newProducts
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
