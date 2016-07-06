import Parser from '../../libs/url_parser'

export default function extractRouteFromPayload (payload) {
  const parser = Parser(payload)
  if (parser.match('/v1/products/:id/relationship/comments/:commentID')) {
    const urlVars = parser.processUrl()
    return ['users.productDetails', { productID: urlVars.id, onComment: true }]
  } else if (parser.match('/v1/products/:id')) {
    const urlVars = parser.processUrl()
    return ['users.productDetails', { productID: urlVars.id }]
  } else if (parser.match('/v1/fulfillments/:id/relationships/comments/:commentID')) {
    const urlVars = parser.processUrl()
    return ['users.ordersChat', { id: urlVars.id }]
  } else {
    throw new NotificationException('The payload don\'t match any url in the aplication')
  }
}

function NotificationException (message) {
  this.message = message;
  this.name = "NotificationException";
}

