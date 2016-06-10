import Parser from '../../libs/url_parser'

export default function extractRouteFromPayload (payload) {
  const parser = Parser(payload)
  if (parser.match('/v1/products/:id/relationship/comments/:commentID')) {
    const urlVars = parser.processUrl()
    return ['users.productDetails', { productID: urlVars.id, onComment: true }]
  } else {
    throw new NotificationException('The payload don\'t match any url in the aplication')
  }
}

function NotificationException (message) {
  this.message = message;
  this.name = "NotificationException";
}

