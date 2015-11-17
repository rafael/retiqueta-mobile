import WF from '../libs/worker_factory'

export default function(ngComponent) {

  ngComponent.factory('WKS', WorkerService)

  function WorkerService(ENV) {
    var worker = WF()
    var Model = {
      get() {
        return worker
      },
      create(code) {
        return worker = WF(code)
      },
      exec(code = false) {
        return worker.execute.apply(null, Array.concat([code], Array.slice( arguments, 1 )))
      },
      stop() {
        return worker.terminate()
      },
    } 

    if (ENV.type === 'development') {
      window.WKS = Model
    }
    
    return Model
  }
}
