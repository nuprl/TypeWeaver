/** Detect free variable `global` from Node.js. */
const freeGlobal: Boolean = typeof global === 'object' && global !== null && global.Object === Object && global

export default freeGlobal
