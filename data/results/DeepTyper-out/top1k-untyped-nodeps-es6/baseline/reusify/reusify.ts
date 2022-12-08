'use strict'

function reusify (Constructor: any): void {
  var head: File = new Constructor()
  var tail: any = head

  function get () {
    var current: any = head

    if (current.next) {
      head = current.next
    } else {
      head = new Constructor()
      tail = head
    }

    current.next = null

    return current
  }

  function release (obj: any): void {
    tail.next = obj
    tail = obj
  }

  return {
    get: get,
    release: release
  }
}

export default reusify;
