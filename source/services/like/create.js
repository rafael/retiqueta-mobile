import creatable from '../../libs/creatable'

export default function LikesCreateFactory (ENV, $http, $q) {
  return {
    create (postID) {
      let url = `${ENV.api.url}/v1/products/${postID}/like`
      return creatable(url, 'likes', $http, $q)({})
    }
  }
}
