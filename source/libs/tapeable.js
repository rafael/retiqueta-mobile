
const _tap = function _tap(input) {  
  return new Tap(input);
}

class Tap {
  constructor(value) {
    this.value = value
  }
  valueOf () {
    return this.value
  }
  tap (fn) {
    if ( arguments.length == 1 ) {
      this.value = fn(this.value)
    } else {
      var args = Array.prototype.slice.call(arguments, 1)
      this.value = fn.apply(null, [this.value].concat(args))
    } 
    return this
  }
}

export default _tap
