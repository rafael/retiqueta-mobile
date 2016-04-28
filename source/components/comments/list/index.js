export default function CommentListDirectiveFactory (ngComponent) {
  ngComponent.directive('commentsList', CommentsTag)

  function CommentsTag (CommentStore) {
    return {
      templateUrl: 'comments/list/template.html',
      restrict: 'E',
      scope: {
        parentId: '@',
        parentType: '@',
        autoLoad: '@',
        asChat: '@',
        currentUserId: '@'
      },
      link (scope, element, attrs) {
        scope.asChat = (scope.asChat === 'true') ? true : false
        scope.loading = (scope.autoLoad === 'false') ? false : true
        scope.autoLoad = (scope.autoLoad === 'false') ? false : true
        scope.comments = []
        scope.authorIsCurrentUser = authorIsCurrentUser
        scope.refreshComment = fetchComments

        function authorIsCurrentUser (comment) {
          return comment.attributes.user_id === scope.currentUserId
        }

        function fetchComments() {
          scope.loading = true

          if (typeof scope.parentId === 'undefined' || scope.parentId === '' || scope.parentType === '') {
            scope.loading = false            
            return
          }

          return CommentStore.getBy(scope.parentType, scope.parentId).then(result => {
            scope.comments = result
          }).catch(error => {
            console.warn('Error Fetching comments for ', attrs.productId)
          }).finally(() => {
            scope.loading = false
          })
        }

        function addComment (comment) {
          scope.comments.push(comment)
        }

        let reloading = setInterval(fetchComments, 10000)

        scope.$on("$destroy", function handleDestroyEvent() {
          removeInterval(reloading)
        })

        CommentStore.on('new', addComment)
        CommentStore.on('refresh', fetchComments)
        scope.$watch('parentId', fetchComments)

        if (scope.autoLoad) {
          fetchComments()
        }
      }
    }
  }
}
