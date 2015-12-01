'use strict';

var jsonapi = require('../../../source/libs/jsonapi')
var clone = require('clone')

describe('Libs: JSONAPI', function () {

  var result_from_api

  beforeEach(function() {
    result_from_api = {
      data: [
        {
          id: 1,
          attributes: {
            category: "shoes",
          },
          relationships: {
              user: {"data":{"id":"e877c0cb-83a9-4058-a033-aa67d3683feb","type":"users"}} ,
              product_pictures: {"data":[{"id":"60","type":"product_pictures"}]}
          }
        }
      ]
    }

  })

  it('parse get multiple elements', function () {  
    var parsed_result = jsonapi(result_from_api)
    
    var result = clone(Object.assign({}, result_from_api))
    result.data[0].relationships.user = result.data[0].relationships.user.data
    result.data[0].relationships.product_pictures = result.data[0].relationships.product_pictures.data
    
    expect(parsed_result.data[0].relationships).toEqual(result.data[0].relationships)
  });

  it('parse multiple elements with include', function() {
    var userInclude = {"id":"e877c0cb-83a9-4058-a033-aa67d3683feb","type":"users","attributes":{"username":"highercomve","profile_pic":"https://retiqueta-stage-img.s3.amazonaws.com//system/d37615fa4437eac341613b7fb2b40c61d7d5df3f.jpg?1447434175","first_name":"Sergio Alejandro","last_name":"Marin","website":"http://higher.com.ve","country":null,"bio":"Mi bio no se guarda!!","following_count":0,"followers_count":0}}
    var pictureInclude = {"id":"60","type":"product_pictures","attributes":{"url":"https://retiqueta-stage-img.s3.amazonaws.com//product_pictures/a8b755758fa9a476f978810f70a190c8ffe8f8c3.jpg?1447090124","small_url":"https://retiqueta-stage-img.s3.amazonaws.com//product_pictures/f91ff97861c0d9f48352877a4f7c4b9a4b9a9315.jpg?1447090124","large_url":"https://retiqueta-stage-img.s3.amazonaws.com//product_pictures/7bbf00b44f31062fff527356e76f29fed04dc06a.jpg?1447090124","product_id":"5df59e6a-b8d7-4c0a-98ae-c63931334642"}}
  
    var result = clone(Object.assign({},
      result_from_api,
      { 
        included: [
          userInclude,
          pictureInclude,
        ]
      }
    ))

    var parsed_result = jsonapi(result)
    var must_be = clone(Object.assign({}, result_from_api))

    must_be.data[0].relationships.user = userInclude
    must_be.data[0].relationships.product_pictures = [pictureInclude]
    
    expect(parsed_result.data[0].relationships).toEqual(must_be.data[0].relationships)
  });

});


