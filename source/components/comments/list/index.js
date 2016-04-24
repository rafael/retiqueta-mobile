export default function CommentListDirectiveFactory (ngComponent) {
  ngComponent.directive('commentsList', CommentsTag)

  function CommentsTag (CommentStore) {
    return {
      templateUrl: 'comments/list/template.html',
      restrict: 'E',
      scope: {
        parentId: '@',
        parentType: '@'
      },
      link (scope, element, attrs) {
        scope.loading = true
        scope.comments = []

        function fetchComments() {
          if (scope.parentId === '' || scope.parentType === '') {
            scope.loading = false
            return
          }

          CommentStore.getBy(scope.parentType, scope.parentId)
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

        CommentStore.on('new', fetchComments)
        fetchComments()
      }
    }
  }
}
