import _chain from 'pipeable'

function WorkerWrapper () {
  var poster = function (data) {
    importScripts(data.funcFileUrl)
    data.params.length = Object.keys(data.params).length
    postMessage(workerCallBack.apply(null, Array.from(data.params)))
  }
  onmessage = function (e) {
    poster(e.data)
  }
}

function FuncToString (code) {
  return _chain(code.toString())
    .pipe(function (workerString) {
      var code = `var __code = ${workerString}; __code();`
      return code
    })
    .result()
}

function FuncToBlobUrl (funcString) {
  return _chain(funcString)
    .pipe(function (code) {
      return new Blob([code])
    })
    .pipe(window.URL.createObjectURL)
    .result()
}

function WorkerFactory (actorCode) {
  var worker = _chain(WorkerWrapper)
    .pipe(FuncToString)
    .pipe(FuncToBlobUrl)
    .pipe(function (blobUrl) {
      console.info('Creating new Worker')
      return new Worker(blobUrl)
    })
    .result()

  var actorCode = `var workerCallBack = ${actorCode.toString()}`

  return function (params) {
    worker.postMessage({
      funcFileUrl: FuncToBlobUrl(actorCode),
      params: arguments
    })
    return new Promise((resolve, reject) => {
      worker.onmessage = e => {
        worker.terminate()
        resolve(e.data)
      }
      worker.onerror = e => {
        worker.terminate()
        reject(e)
      }
    })
  }
}

export default WorkerFactory
