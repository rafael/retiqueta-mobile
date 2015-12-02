export default function(ngComponent) {
  ngComponent.directive('profilePicture', profilePicture)

  function profilePicture(User) {
    return {
      templateUrl: 'profile/profile_picture.html',
      retrict: 'E',
      scope: {
        user: '='
      },
      controllerAs: 'profilePicture',
      bindToController: true,

      controller: function() {
        var _ = this
        _.picture = ''
        _.loadingPicture = false

        _.updatePicture = function(base64picture) {
          _.loadingPicture = true
          User.updatePicture(_.user.id, base64picture)
          .then((result) => {
            _.user = result.data.data
          })
          .catch((e) => {     
            console.log(e)
          })
          .finally(() => {
            _.loadingPicture = false
          })
        }
      }
    }
  } 
}
