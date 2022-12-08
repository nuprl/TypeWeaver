/** Detect free variable `global` from Node.js. */
const freeGlobal: boolean = typeof global === 'object' && global !== null && global.Object === Object && global

export default freeGlobal
