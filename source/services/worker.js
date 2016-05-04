import WF from '../libs/worker_factory'

export default function WorkerServiceFactory (ngComponent) {
  ngComponent.factory('WKS', WorkerService)

  function WorkerService (ENV) {
    var worker = WF()
    var Model = {
      get () {
        return worker
      },
      create (code) {
        worker = WF(code)
        return worker
      },
      exec (code = false) {
        return worker.execute.apply(null, Array.concat([code], Array.slice(arguments, 1)))
      },
      stop () {
        return worker.terminate()
      }
    }

    if (ENV.type === 'development') {
      window.WKS = Model
    }

    return Model
  }
}
