/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
let promise: Object

module.exports = typeof queueMicrotask === 'function'
  ? queueMicrotask.bind(typeof window !== 'undefined' ? window : global)
  // reuse resolved promise, and allocate it lazily
  : (cb: Function) => (promise || (promise = Promise.resolve()))
    .then(cb)
    .catch((err: Function) => setTimeout(() => { throw err }, 0))