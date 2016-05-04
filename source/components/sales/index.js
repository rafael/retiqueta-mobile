const includes = [
  'order',
  'order.line_items',
  'order.line_items.product',
  'order.line_items.product.product_pictures',
  'order.user',
  'order.fulfillment'
].join(',')

export default function salesCtrlFactory (ngComponent) {
  ngComponent.controller('salesCtrl', salesCtrl)

  function salesCtrl (Sell, Utils) {
    var _ = this
    _.loading = false
    _.sales = []
    
    function getSales () {
      _.loading = true
      Sell.getAll({
        include: `${includes}`
      })
      .then(sales => {
        _.sales = sales
      })
      .catch(Utils.swalError)
      .finally(() => {
        _.loading = false
      })
    }

    getSales()
  }
}
