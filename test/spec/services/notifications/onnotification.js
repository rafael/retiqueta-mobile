'use strict';

var onNotificationFactory = require('../../../../source/services/notifications/onnotification')
var $stateMock = {
  go (direction, params) {
    if (typeof direction === 'string' && typeof params === 'object') {
      return "redirected"
    } else {
      return false
    }
  }
}
var $cordovaLocalNotificationMock = {
  schedule (obj) {
    if (typeof obj === 'object') {
      return "scheduled"
    } else {
      return false
    }
  } 
}
var Utils = {
  logger: {
    info () { },
    log () {}
  }
}
var onNotification = onNotificationFactory({}, Utils, $stateMock, {}, {}, $cordovaLocalNotificationMock)

/*
var testEngine;

beforeEach(module('plunker'));
beforeEach(inject(function(engine){
  testEngine = engine;
}));
*/

describe("On Notification Factory test", function () {
  it("process notifications with type url with the app open", function () {
    var notification = {
      payload: {
        type: 'url',
        url: "https://api.retiqueta.com/v1/products/3903c11e-fdc5-4d83-b489-7490c1693620/relationships/comments/c1afc5d5-39d3-4cb9-af9e-a38f658f8da9"
      },
      '_raw': {
        additionalData: {
          foreground: true
        }
      } 
    }  

    var result = onNotification(notification)

    expect(result).toEqual("scheduled")

  })

  it("process notifications with type url with the app open", function () {
    var notification = {
      payload: {
        type: 'url',
        url: "https://api.retiqueta.com/v1/products/3903c11e-fdc5-4d83-b489-7490c1693620/relationships/comments/c1afc5d5-39d3-4cb9-af9e-a38f658f8da9"
      },
      '_raw': {
        additionalData: {
          foreground: false
        }
      } 
    } 

    var result = onNotification(notification)

    expect(result).toEqual("redirected")

  })

  it("process notifications with type fullfiment_comment", function () {
    var notification = {
      "payload": {
        "order_id": "ee2219fc-3946-4db6-aea7-fdcbf429c1f0", 
        "url": "https://api.retiqueta.com/v1/fulfillments/a074c815-e449-4878-b4ae-0384c048320e/relationships/comments/09700f25-81f0-4548-81db-9cefe3ffec2b", 
        "type": "fulfillment_comment"
      },
      '_raw': {
        additionalData: {
          foreground: false
        }
      } 
    }  

    var result = onNotification(notification)

    expect(result).toEqual("redirected")

  })
})
