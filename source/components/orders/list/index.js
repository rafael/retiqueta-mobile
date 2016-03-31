export default function ordersCtrlFactory (ngComponent) {
  ngComponent.controller('ordersCtrl', ordersCtrl)

  function ordersCtrl (Order, Utils) {
    var _ = this
    _.orders = []

    function getOrders () {
      Order.getAll({
        include: 'line_items,line_items.product,user'
      })
      .then(orders => {
        _.orders = orders
      })
      .catch(Utils.swalError)
    }
    getOrders()
  }
}
