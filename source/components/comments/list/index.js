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
      scope.loading = false     
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

        return CommentStore.getBy(parentType, parentId)
        .then(result => {
          scope.comments = result
        })
        .catch((e) => {
          Utils.swalError(e)
        })
        .finally(() => {
          scope.loading = false
          CommentStore.emit('fetchFinish', parentType, parentId)
        })
      }

      function addComment (type, parentId, comment) {
        if (type === scope.parentType && parentId === scope.parentId ) {
          scope.comments.push(comment)
        }
      }

      CommentStore.on('new', addComment)
      CommentStore.on('refresh', (type, id) => {
        if (type === scope.parentType && id === scope.parentId) {
          fetchComments(type, id)      
        }
      })
      scope.$watchGroup(['parentId', 'parentType'], () => {
        fetchComments(scope.parentType, scope.parentId)
      }) 

      if (scope.autoLoad) {
        fetchComments()
      }
    }
  }
}
