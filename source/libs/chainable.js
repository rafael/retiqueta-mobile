
const _chain = function _chain(input) {  
  return new Chain(input);
}

class Chain {
  constructor(value) {
    this.value = value
  }
  valueOf () {
    return this.value
  }
  pipe (fn) {
    if ( arguments.length == 1 ) {
      this.value = fn(this.value)
    } else {
      var args = Array.prototype.slice.call(arguments, 1)
      this.value = fn.apply(null, [this.value].concat(args))
    } 
    return this
  }
  result() {
    return this.value
  }
}

export default _chain
