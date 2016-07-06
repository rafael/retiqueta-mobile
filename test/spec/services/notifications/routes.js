'use strict';

var RouteParser = require('../../../../source/services/notifications/routes')

describe("Notification routes parser", function() {
  it("notification for comment on products", function() {
    var result = RouteParser({
      url: "https://api.retiqueta.com/v1/products/3903c11e-fdc5-4d83-b489-7490c1693620/relationships/comments/c1afc5d5-39d3-4cb9-af9e-a38f658f8da9"
    })
    expect(result).toEqual([
      'users.productDetails', 
      { 
        productID: '3903c11e-fdc5-4d83-b489-7490c1693620',
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
