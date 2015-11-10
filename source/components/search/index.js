export default function(ngComponent) {
  ngComponent.controller('SearchProductCtrl', SearchProductCtrl)

  function SearchProductCtrl(Product) {
    var _ = this
    _.text = ''
    _.products = []
    _.search = () => {
      console.log('Searching: ', _.text) 
      Product.search(_.text)
      .then(result => {
        console.log(result)
        _.products = result
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        console.log('Search complete')
      })
    }
  }
}
