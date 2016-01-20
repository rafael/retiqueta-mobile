export default function CommentListDirectiveFactory (ngComponent) {
  ngComponent.directive('commentsList', CommentsTag)

  function CommentsTag (CommentStore) {
    return {
      templateUrl: 'comments/list.html',
      retrict: 'E',
      link (scope, element, attrs) {
        scope.loading = true
        scope.comments = []

        CommentStore.on('new', fetchComments)

        function fetchComments() {
          CommentStore.getByProduct(attrs.productId)
          .then(result => {
            scope.comments = result
            console.log(result)
          })
          .catch(error => {
            console.warn('Error Fetching comments for ', attrs.productId)
            console.log(error)
          })
          .finally(() => {
            scope.loading = false
          })
        }

        fetchComments()
      }
    }
  }
}
