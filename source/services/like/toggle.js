import creatable from '../../libs/creatable'

export default function LikesCreateFactory (ENV, $http, $q) {
  return {
    toggle (postID, alreadyLike = false) {
      return (alreadyLike) ?
        this.destroy(postID) :
        this.create(postID)
    }
  }
}
