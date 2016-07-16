'use strict';

var RouteParser = require('../../../../source/services/notifications/routes')
var uuid = require('node-uuid')

describe("Notification routes parser", function() {
  it("notification for comment on products", function() {
    var result = RouteParser({
      url: "https://api.retiqueta.com/v1/products/3903c11e-fdc5-4d83-b489-7490c1693620/relationships/comments/c1afc5d5-39d3-4cb9-af9e-a38f658f8da9",
      type: "url"
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
      url: "https://api.retiqueta.com/v1/products/3903c11e-fdc5-4d83-b489-7490c1693620",
      type: "url"
    })
    expect(result).toEqual([
      'users.productDetails', 
      { 
        productID: '3903c11e-fdc5-4d83-b489-7490c1693620'
      }
    ]);
  });
  it("notification for comment on fullfiment", function() {
    var result = RouteParser({
      url: "https://api.retiqueta.com/v1/orders/3903c11e-fdc5-4d83-b489-7490c1693620",
      type: "url"
    })
    expect(result).toEqual([
      'users.ordersChat', 
      { 
        id: '3903c11e-fdc5-4d83-b489-7490c1693620'      
      }
    ]);
  });
  
  it("notification for comment on fullfiment", function() {
    var user_uuid = uuid.v4()
    var result = RouteParser({
      url: "https://api.retiqueta.com/v1/users/" + user_uuid,
      type: "url"
    })
    expect(result).toEqual([
      'users.profile', 
      { 
        userID: user_uuid    
      }
    ]);
  });

  it("notification without full url only with path", function() {
    var result = RouteParser({
      url: "/v1/orders/3903c11e-fdc5-4d83-b489-7490c1693620",
      type: "url"
    })
    expect(result).toEqual([
      'users.ordersChat', 
      { 
        id: '3903c11e-fdc5-4d83-b489-7490c1693620'      
      }
    ]);
  });

  it("notification without an url inside of routes must throw an error", function() {
    var payload = {
      url: "https://api.retiqueta.com/v1/comments/10"
    }
    expect(function () {
      RouteParser(payload)
    }).toThrow();
  });
  it("notification without type url, must throw an error", function() {
    var payload = {
      url: "https://api.retiqueta.com/v1/fulfillments/3903c11e-fdc5-4d83-b489-7490c1693620/relationships/comments/90",
      type: "noUrl"
    }
    expect(function () {
      RouteParser(payload)
    }).toThrow();
  });

});
