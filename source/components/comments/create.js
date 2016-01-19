export default function CommentCreateDirectiveFactory (ngComponent) {
  ngComponent.directive('commentForm', CommentForm)

  function CommentForm (CommentStore, Utils) {
    return {
      templateUrl: 'comments/create.html',
      retrict: 'E',
      scope: {
        productId: '='
      },
      link (scope, element, attrs) {
        scope.loading = false
        scope.comment = ''
        scope.save = function() {
          scope.loading = true
          CommentStore.create(scope.productId, { text: scope.comment })
          .then(result => {
            CommentStore.emit('new')
          })
          .catch(error => {
            console.warn('Error creating new comment for, ', scope.productId)
            console.log(error)
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
