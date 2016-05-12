export default function CommentCreateDirectiveFactory (ngComponent) {
  ngComponent.directive('commentForm', CommentForm)

  function CommentForm (CommentStore, Utils) {
    return {
      templateUrl: 'comments/create/template.html',
      restrict: 'E',
      scope: {
        parentId: '@',
        parentType: '@',
        focus: '='
      },
      link: CommentFormLink   
    }
  }

  function CommentFormLink (scope, element, attrs) {
    scope.loading = false
    scope.comment = ''
    scope.save = saveComment
    scope.focus = (typeof scope.focus === 'undefined') ? false : scope.focus

    function saveComment () {
      scope.loading = true

      CommentStore.create(scope.parentId, { text: scope.comment }, scope.parentType)
      .then(result => {
        CommentStore.emit('refresh')
      })
      .catch(error => {
        Utils.swalError(error)
      })
      .finally(() => {
        scope.loading = false
        scope.comment = ''
      })
    }
  }
}
