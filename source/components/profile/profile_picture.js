export default function profilePictureFactory (ngComponent) {
  ngComponent.directive('profilePicture', profilePicture)

  function profilePicture (User, Auth, Utils, CameraService) {
    return {
      templateUrl: 'profile/profile_picture.html',
      restrict: 'E',
      scope: {
        user: '='
      },
      controllerAs: 'ctrl',
      bindToController: true,
      controller() {
        var _ = this
        _.picture = ''
        _.loadingPicture = false
        _.selectSource = false
        _.takePic = takePic
        _.selectFromGallery = selectFromGallery
        _.hasPicture = hasPicture
        _.toggleSelectSource = toggleSelectSource

        function toggleSelectSource () {
          _.selectSource = !_.selectSource
        }

        function hasPicture () {
          return _.user.attributes.hasOwnProperty('profile_pic') 
            && _.user.attributes.profile_pic !== ''
            && _.user.attributes.profile_pic !== '/pics/original/missing.png'
        }


        function takePic () {
          CameraService.take()
          .then(result => {
            updatePicture('data:image/jpeg;base64,' + result)
          })

        }

        function selectFromGallery () {
          CameraService.take({
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
          })
          .then(result => {
            updatePicture('data:image/jpeg;base64,' + result)
          })
        }

        function updatePicture (base64picture) {
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
