'use strict';

var RouteParser = require('../../../../source/services/notifications/routes')

describe("Notification routes parser", function() {
  it("notification for comment on products", function() {
    var result = RouteParser({
      url: "https://api.retiqueta.com/v1/products/0218e428-f500-44a5-86a0-c62aa6a6368d/relationship/comments/0218e428-f500-44a5-86a0-c62aa6a6368d"
    })
    expect(result).toEqual([
      'users.productDetails', 
      { 
        productID: '0218e428-f500-44a5-86a0-c62aa6a6368d',
        onComment: true
      }
    ]);
  });
  it("notifications for comment like", function() {
    var result = RouteParser({
      url: "https://api.retiqueta.com/v1/products/12"
    })
    expect(result).toEqual([
      'users.productDetails', 
      { 
        productID: '12'
      }
    ]);
  });
  it("notification for comment on fullfiment", function() {
    var result = RouteParser({
      url: "https://api.retiqueta.com/v1/fulfillments/10/relationships/comments/90"
    })
    expect(result).toEqual([
      'users.ordersChat', 
      { 
        id: '10'      
      }
    ]);
  });
  it("notification with a map url", function() {
    var payload = {
      url: "https://api.retiqueta.com/v1/comments/10"
    }
    expect(function () {
      RouteParser(payload)
    }).toThrow();
  });
});
