'use strict'

function reusify (Constructor: Function) {
  var head = new Constructor()
  var tail = head

  function get () {
    var current = head

    if (current.next) {
      head = current.next
    } else {
      head = new Constructor()
      tail = head
    }

    current.next = null

    return current
  }

  function release (obj: any) {
    tail.next = obj
    tail = obj
  }

  return {
    get: get,
    release: release
  }
}

export default reusify;