
export default function CommentCreateDirectiveFactory (ngComponent) {
  ngComponent.directive('commentForm', CommentForm)

  function CommentForm (CommentStore, Utils) {
    return {
      templateUrl: 'comments/create/template.html',
      restrict: 'E',
      scope: {
        parentId: '@',
        parentType: '@'
      },
      link (scope, element, attrs) {
        scope.loading = false
        scope.comment = ''
        scope.save = function() {
          scope.loading = true

          CommentStore.create(scope.parentId, { text: scope.comment }, scope.parentType)
          .then(result => {
            CommentStore.emit('new')
          })
          .catch(error => {
            console.log(error)
            console.warn('Error creating new comment for, ', scope.parentId)
            Utils.swalError(error)
          })
          .finally(() => {
            scope.loading = false
            scope.comment = ''
          })
        }
      }
    }
  }
}
