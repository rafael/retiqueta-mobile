export default function CommentCreateDirectiveFactory (ngComponent) {
  ngComponent.directive('commentForm', CommentForm)

  function CommentForm (CommentStore, Utils, $ionicAnalytics) {
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

    // Link function inside funcion scope
    function CommentFormLink (scope, element, attrs) {
      scope.loading = false
      scope.comment = ''
      scope.save = saveComment
      scope.focus = (typeof scope.focus === 'undefined') ? false : scope.focus

      function saveComment () {
        scope.loading = true
        $ionicAnalytics.track(`fetch start`, {
          action: 'create comment',
          type: scope.parentType,
          id: scope.parentId,
        })
        CommentStore.create(scope.parentId, { text: scope.comment }, scope.parentType)
        .then(result => {
          $ionicAnalytics.track(`fecth success`, {
            action: 'create comment',
            type: scope.parentType,
            id: scope.parentId,
          })
          CommentStore.emit('new', scope.parentType, scope.parentId, result)
        })
        .catch(error => {
          $ionicAnalytics.track(`fetch error`, {
            action: 'create comment',
            type: scope.parentType,
            id: scope.parentId,
            error: error
          })
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
