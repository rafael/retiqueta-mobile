import event from 'events'

export default function UserStoreFactory (ngComponent) {

  ngComponent.factory('UserStore', UserStore) 

  function UserStore(User) {
    var user = {}
    var Model = {
      request(id) {
        User.get(id)
        .then(result => { user = result; this.emit('change') } )
        .catch(error => { this.emit('error', error) } )
      },
    }
  }

}
