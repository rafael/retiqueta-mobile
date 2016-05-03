export default function profilePictureFactory (ngComponent) {
  ngComponent.directive('profilePicture', profilePicture)

  function profilePicture (User, Auth, Utils) {
    return {
      templateUrl: 'profile/profile_picture.html',
      restrict: 'E',
      scope: {
        user: '='
      },
      controllerAs: 'profilePicture',
      bindToController: true,
      controller() {
        var _ = this
        _.picture = ''
        _.loadingPicture = false

        _.updatePicture = (base64picture) => {
          _.loadingPicture = true
          User.updatePicture(_.user.id, base64picture)
            .then((result) => {
              _.user = result.data.data
              Auth.user.attributes.profile_pic = _.user.attributes.profile_pic
            })
            .catch(Utils.swalError)
            .finally(() => {
              _.loadingPicture = false
            })
        }
      }
    }
  }
}
