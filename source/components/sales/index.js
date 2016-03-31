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
    _.sales = []

    function getSales () {
      Sell.getAll({
        include: `${includes}`
      })
      .then(sales => {
        _.sales = sales
      })
      .catch(Utils.swalError)
    }

    getSales()
  }
}
