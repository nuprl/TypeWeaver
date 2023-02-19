/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
let promise: any

module.exports = typeof queueMicrotask === 'function'
  ? queueMicrotask.bind(typeof window !== 'undefined' ? window : global)
  // reuse resolved promise, and allocate it lazily
  : (cb: any) => (promise || (promise = Promise.resolve()))
    .then(cb)
    .catch((err: any) => setTimeout(() => { throw err }, 0))
