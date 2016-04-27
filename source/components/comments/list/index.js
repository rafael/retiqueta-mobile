export default function CommentListDirectiveFactory (ngComponent) {
  ngComponent.directive('commentsList', CommentsTag)

  function CommentsTag (CommentStore) {
    return {
      templateUrl: 'comments/list/template.html',
      restrict: 'E',
      scope: {
        parentId: '@',
        parentType: '@',
        autoLoad: '@'
      },
      link (scope, element, attrs) {
        scope.loading = (scope.autoLoad === 'false') ? false : true
        scope.autoLoad = (scope.autoLoad === 'false') ? false : true
        scope.comments = []

        function fetchComments() {
          if (typeof scope.parentId === 'undefined' || scope.parentId === '' || scope.parentType === '') {
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
        if (scope.autoLoad) {
          fetchComments()
        }
      }
    }
  }
}
