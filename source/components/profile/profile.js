export default function(ngComponent) {
  ngComponent.controller('profileCtrl', profileCtrl)

  function profileCtrl($scope, currentUser, User) {
    var _ = this    
    _.user = currentUser
    _.picture = ''
    _.loadingPicture = false

    var reader = new FileReader();
    
    reader.onload = function(e) {
      _.update(e.target.result.split(',')[1])
    }
    
    _.loadPicture = function(e) {
      _.picture = e.target.files[0]
      reader.readAsDataURL(_.picture)
    }

    _.update = function(base64picture) {
      _.loadingPicture = true
      User.updatePicture(_.user.id, _.picture, base64picture)
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
