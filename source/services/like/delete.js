import creatable from '../../libs/creatable'

export default function LikesCreateFactory (ENV, $http, $q) {
  return {
    destroy (postID) {
      let url = `${ENV.api.url}/v1/products/${postID}/unlike`
      return creatable(url, 'likes', $http, $q)({})
    }
  }
}
