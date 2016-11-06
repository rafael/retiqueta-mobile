export default function DashboardFactory (ngComponent) {
  ngComponent.controller('dashboardCtrl', dashCtrl)

  function dashCtrl (Product, Utils, $scope, ENV, $rootScope) {
    var _ = this
    var ONE_HOUR = 60 * 60;
    var ONE_DAY = 60 * 60 * 24;
    var date = new Date
    _.cards = []

    function howOld(card) {
      var difference = (date - new Date(card.attributes.created_at)) / 1000
      var age = 0
      if (difference < ONE_HOUR) {
        age = Math.round(difference / 60) + "m"
      } else if (difference < ONE_DAY) {
        age = Math.round(difference / 3600)
        if(age == 1) {
          age =  "1 hr"
        } else {
          age =  age + " hrs"
        }
      } else {
        age = Match.round(difference / 86400) + " d"
      }
      if (!ENV.isProduction()) {
        console.log('Card is: ' + age + ' old.')
      }
      card.attributes.age = age
    }

    function getCards() {
      var cardsResponse =  {
        "data": [
          {
            "id": "1",
            "type": "featured_picks",
            "attributes": {
              "created_at": "2016-11-06T02:17:41.447+00:00",
              "products": [
                {
                  "id": "0dc3d0eb-0603-40d8-a869-0a190b57dfc9",
                  "image_large_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/1528e0dab54bd0ec90da22f3ecdfeb1dd8a2bbfe.?1478394600",
                  "image_medium_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/1528e0dab54bd0ec90da22f3ecdfeb1dd8a2bbfe.?1478394600",
                  "image_small_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/1528e0dab54bd0ec90da22f3ecdfeb1dd8a2bbfe.?1478394600"
                },
                {
                  "id": "661666e6-c148-451f-b8c0-863ff795b8a2",
                  "image_large_url": "https://d2xhr02146786q.cloudfront.net//product_pictures/9a024d64ddd80f4114b7277793d89687f2c55a6f.jpg?1478396216",
                  "image_medium_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/0ea9cfceffb0751fa0ac3323592b6d2af736ac02.?1478221005",
                  "image_small_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/0ea9cfceffb0751fa0ac3323592b6d2af736ac02.?1478221005"
                },
                {
                  "id": "d60e82bd-1a20-4392-8cb2-73c96a0e7b27",
                  "image_large_url": "https://d2xhr02146786q.cloudfront.net//product_pictures/54a40338e0227660beb7b18f783a4c7b929b4f11.jpg?1478396222",
                  "image_medium_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/4401ad4c7128803b13b87e6a7b20fb355a5a7a04.?1478100228",
                  "image_small_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/4401ad4c7128803b13b87e6a7b20fb355a5a7a04.?1478100228"
                }
              ],
              "title": "Retiqueta featured picks"
            }
          },
          {
            "id": "1",
            "type": "featured_picks",
            "attributes": {
              "created_at": "2016-11-06T02:17:41.447+00:00",
              "products": [
                {
                  "id": "0dc3d0eb-0603-40d8-a869-0a190b57dfc9",
                  "image_large_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/1528e0dab54bd0ec90da22f3ecdfeb1dd8a2bbfe.?1478394600",
                  "image_medium_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/1528e0dab54bd0ec90da22f3ecdfeb1dd8a2bbfe.?1478394600",
                  "image_small_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/1528e0dab54bd0ec90da22f3ecdfeb1dd8a2bbfe.?1478394600"
                },
                {
                  "id": "661666e6-c148-451f-b8c0-863ff795b8a2",
                  "image_large_url": "https://d2xhr02146786q.cloudfront.net//product_pictures/9a024d64ddd80f4114b7277793d89687f2c55a6f.jpg?1478396216",
                  "image_medium_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/0ea9cfceffb0751fa0ac3323592b6d2af736ac02.?1478221005",
                  "image_small_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/0ea9cfceffb0751fa0ac3323592b6d2af736ac02.?1478221005"
                },
                {
                  "id": "d60e82bd-1a20-4392-8cb2-73c96a0e7b27",
                  "image_large_url": "https://d2xhr02146786q.cloudfront.net//product_pictures/54a40338e0227660beb7b18f783a4c7b929b4f11.jpg?1478396222",
                  "image_medium_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/4401ad4c7128803b13b87e6a7b20fb355a5a7a04.?1478100228",
                  "image_small_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/4401ad4c7128803b13b87e6a7b20fb355a5a7a04.?1478100228"
                }
              ],
              "title": "Retiqueta featured picks"
            }
          },
          {
            "id": "1",
            "type": "featured_picks",
            "attributes": {
              "created_at": "2016-11-06T02:17:41.447+00:00",
              "products": [
                {
                  "id": "0dc3d0eb-0603-40d8-a869-0a190b57dfc9",
                  "image_large_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/1528e0dab54bd0ec90da22f3ecdfeb1dd8a2bbfe.?1478394600",
                  "image_medium_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/1528e0dab54bd0ec90da22f3ecdfeb1dd8a2bbfe.?1478394600",
                  "image_small_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/1528e0dab54bd0ec90da22f3ecdfeb1dd8a2bbfe.?1478394600"
                },
                {
                  "id": "661666e6-c148-451f-b8c0-863ff795b8a2",
                  "image_large_url": "https://d2xhr02146786q.cloudfront.net//product_pictures/9a024d64ddd80f4114b7277793d89687f2c55a6f.jpg?1478396216",
                  "image_medium_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/0ea9cfceffb0751fa0ac3323592b6d2af736ac02.?1478221005",
                  "image_small_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/0ea9cfceffb0751fa0ac3323592b6d2af736ac02.?1478221005"
                },
                {
                  "id": "d60e82bd-1a20-4392-8cb2-73c96a0e7b27",
                  "image_large_url": "https://d2xhr02146786q.cloudfront.net//product_pictures/54a40338e0227660beb7b18f783a4c7b929b4f11.jpg?1478396222",
                  "image_medium_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/4401ad4c7128803b13b87e6a7b20fb355a5a7a04.?1478100228",
                  "image_small_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/4401ad4c7128803b13b87e6a7b20fb355a5a7a04.?1478100228"
                }
              ],
              "title": "Retiqueta featured picks"
            }
          },
          {
            "id": "1",
            "type": "featured_picks",
            "attributes": {
              "created_at": "2016-11-06T02:17:41.447+00:00",
              "products": [
                {
                  "id": "0dc3d0eb-0603-40d8-a869-0a190b57dfc9",
                  "image_large_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/1528e0dab54bd0ec90da22f3ecdfeb1dd8a2bbfe.?1478394600",
                  "image_medium_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/1528e0dab54bd0ec90da22f3ecdfeb1dd8a2bbfe.?1478394600",
                  "image_small_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/1528e0dab54bd0ec90da22f3ecdfeb1dd8a2bbfe.?1478394600"
                },
                {
                  "id": "661666e6-c148-451f-b8c0-863ff795b8a2",
                  "image_large_url": "https://d2xhr02146786q.cloudfront.net//product_pictures/9a024d64ddd80f4114b7277793d89687f2c55a6f.jpg?1478396216",
                  "image_medium_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/0ea9cfceffb0751fa0ac3323592b6d2af736ac02.?1478221005",
                  "image_small_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/0ea9cfceffb0751fa0ac3323592b6d2af736ac02.?1478221005"
                },
                {
                  "id": "d60e82bd-1a20-4392-8cb2-73c96a0e7b27",
                  "image_large_url": "https://d2xhr02146786q.cloudfront.net//product_pictures/54a40338e0227660beb7b18f783a4c7b929b4f11.jpg?1478396222",
                  "image_medium_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/4401ad4c7128803b13b87e6a7b20fb355a5a7a04.?1478100228",
                  "image_small_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/4401ad4c7128803b13b87e6a7b20fb355a5a7a04.?1478100228"
                }
              ],
              "title": "Retiqueta featured picks"
            }
          },
          {
            "id": "1",
            "type": "featured_picks",
            "attributes": {
              "created_at": "2016-11-06T02:17:41.447+00:00",
              "products": [
                {
                  "id": "0dc3d0eb-0603-40d8-a869-0a190b57dfc9",
                  "image_large_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/1528e0dab54bd0ec90da22f3ecdfeb1dd8a2bbfe.?1478394600",
                  "image_medium_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/1528e0dab54bd0ec90da22f3ecdfeb1dd8a2bbfe.?1478394600",
                  "image_small_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/1528e0dab54bd0ec90da22f3ecdfeb1dd8a2bbfe.?1478394600"
                },
                {
                  "id": "661666e6-c148-451f-b8c0-863ff795b8a2",
                  "image_large_url": "https://d2xhr02146786q.cloudfront.net//product_pictures/9a024d64ddd80f4114b7277793d89687f2c55a6f.jpg?1478396216",
                  "image_medium_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/0ea9cfceffb0751fa0ac3323592b6d2af736ac02.?1478221005",
                  "image_small_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/0ea9cfceffb0751fa0ac3323592b6d2af736ac02.?1478221005"
                },
                {
                  "id": "d60e82bd-1a20-4392-8cb2-73c96a0e7b27",
                  "image_large_url": "https://d2xhr02146786q.cloudfront.net//product_pictures/54a40338e0227660beb7b18f783a4c7b929b4f11.jpg?1478396222",
                  "image_medium_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/4401ad4c7128803b13b87e6a7b20fb355a5a7a04.?1478100228",
                  "image_small_url": "https://d3e4hek1qnfih2.cloudfront.net//product_pictures/4401ad4c7128803b13b87e6a7b20fb355a5a7a04.?1478100228"
                }
              ],
              "title": "Retiqueta featured picks"
            }
          }
        ]
      }
      if (!ENV.isProduction()) {
        console.log('Getting timeline cards.')
      }
      var cards = cardsResponse.data
      cards.map(howOld)
      _.cards = cards
    }

    $scope.$on("$ionicView.enter", () => {
      if (ENV.isProduction()) {
        facebookConnectPlugin.logEvent('timeline load')
      }
      getCards()
    })
  }
}
