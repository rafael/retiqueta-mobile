export default function CommentListDirectiveFactory (ngComponent) {
  ngComponent.directive('commentsList', CommentsTag)

  function CommentsTag (CommentStore) {
    return {
      templateUrl: 'comments/list.html',
      restrict: 'E',
      link (scope, element, attrs) {
        scope.loading = true
        scope.comments = []

        CommentStore.on('new', fetchComments)

        function fetchComments() {
          CommentStore.getByProduct(attrs.productId)
          .then(result => {
            scope.comments = result
          })
          .catch(error => {
            console.warn('Error Fetching comments for ', attrs.productId)
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
