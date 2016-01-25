import creatable from '../../libs/creatable'

export default function PostCommentFactory (ENV, $http, $q) {
  return {
    create (postID, commentObj) {
      let url = `${ENV.api.url}/v1/products/${postID}/relationships/comments`
      return creatable(url, 'text_comments', $http, $q)(commentObj)
    }
  }
}
