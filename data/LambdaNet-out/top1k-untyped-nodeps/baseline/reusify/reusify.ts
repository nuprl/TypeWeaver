'use strict'

function reusify (Constructor: object): object {
  var head: object = new Constructor()
  var tail: object = head

  function get (): string {
    var current: string = head

    if (current.next) {
      head = current.next
    } else {
      head = new Constructor()
      tail = head
    }

    current.next = null

    return current
  }

  function release (obj: string): Void {
    tail.next = obj
    tail = obj
  }

  return {
    get: get,
    release: release
  }
}

module.exports = reusify
