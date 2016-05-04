function buildLineItems (products) {
  return products.map(product => {
    return {
      product_type: 'products',
      product_id: product.id
    }
  })
}

/*
 * BUILD this object
 *
 *  payment_data": {
 *    "token": "67191d98cf4538cfaef81b46ec9af838",
 *    "payment_method_id": "visa"
 *  },
 *  "shipping_address": "2930 Lyon Street - Apt 2A, San Francisco, CA, 94123",
 *  "line_items": [{"product_type": "products", "product_id": "fa8375cf-1b4a-40d1-b9d4-fa0935c69bb5" }]
 *
 */

export default function buildOrderFactory (ENV, $http, $q) {
  return {
    buildOrder (order, products) {
      return {
        payment_data: {
          token: order.token,
          payment_method_id: order.payment_method_id
        },
        shipping_address: order.address,
        line_items: buildLineItems(products)
      }
    }
  }
}


