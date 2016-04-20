import creatable from '../../libs/creatable'

export default function PostCommentFactory (ENV, $http, $q) {
  return {
    create (id, commentObj, type) {
      let url = `${ENV.api.url}/v1/${type}/${id}/relationships/comments`
      return creatable(url, 'text_comments', $http, $q)(commentObj)
    }
  }
}
