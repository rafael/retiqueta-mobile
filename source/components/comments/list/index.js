export default function CommentListDirectiveFactory (ngComponent) {
  ngComponent.directive('commentsList', CommentsTag)

  function CommentsTag (CommentStore, Utils) {
    return {
      templateUrl: 'comments/list/template.html',
      restrict: 'E',
      scope: {
        parentId: '@',
        parentType: '@',
        autoLoad: '@',
        asChat: '@',
        currentUserId: '@',
        reverse: '@'
      },
      link: CommentsListLink  
    }

    function CommentsListLink (scope, element, attrs) {
      scope.asChat = (scope.asChat === 'true') ? true : false
      scope.loading = (scope.autoLoad === 'false') ? false : true
      scope.autoLoad = (scope.autoLoad === 'false') ? false : true
      scope.comments = []
      scope.authorIsCurrentUser = authorIsCurrentUser
      scope.refreshComment = fetchComments
      scope.ordenedComments = ordenedComments
        
      function ordenedComments  () {
        if (scope.reverse === 'true') {
          return scope.comments.slice().reverse()
        } else {
          return scope.comments
        }
      }

      function authorIsCurrentUser (comment) {
        return comment.attributes.user_id === scope.currentUserId
      }

      function fetchComments(parentType = scope.parentType, parentId = scope.parentId) {
        scope.loading = true

        if (typeof parentId === 'undefined' || parentId === '' || parentType === '') {
          scope.loading = false            
          return
        }

        return CommentStore.getBy(parentType, parentId).then(result => {
          scope.comments = result
        })
        .catch((e) => {
          Utils.swalError(e)
        })
        .finally(() => {
          scope.loading = false
          CommentStore.emit('fetchFinish')
        })
      }

      function addComment (comment) {
        scope.comments.push(comment)
      }

      CommentStore.on('new', addComment)
      CommentStore.on('refresh', (newId = scope.parentId) => {
        fetchComments(scope.parentType, newId)      
      })
      scope.$watch('parentId', () => {
        console.log('parentId  change')
        fetchComments(scope.parentType, scope.parentId)
      })

      if (scope.autoLoad) {
        fetchComments()
      }
    }
  }
}
