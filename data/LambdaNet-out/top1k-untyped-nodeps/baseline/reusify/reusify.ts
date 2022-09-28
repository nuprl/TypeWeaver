'use strict'

function reusify (Constructor: Object): Object {
  var head: Object = new Constructor()
  var tail: Object = head

  function get (): String {
    var current: String = head

    if (current.next) {
      head = current.next
    } else {
      head = new Constructor()
      tail = head
    }

    current.next = null

    return current
  }

  function release (obj: String): Void {
    tail.next = obj
    tail = obj
  }

  return {
    get: get,
    release: release
  }
}

module.exports = reusify
