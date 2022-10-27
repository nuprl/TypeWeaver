import freeGlobal from './freeGlobal.js'

/** Detect free variable `exports`. */
const freeExports: Number = typeof exports === 'object' && exports !== null && !exports.nodeType && exports

/** Detect free variable `module`. */
const freeModule: HTMLElement = freeExports && typeof module === 'object' && module !== null && !module.nodeType && module

/** Detect the popular CommonJS extension `module.exports`. */
const moduleExports: Boolean = freeModule && freeModule.exports === freeExports

/** Detect free variable `process` from Node.js. */
const freeProcess: Hash = moduleExports && freeGlobal.process

/** Used to access faster Node.js helpers. */
const nodeTypes: Object = ((() => {
  try {
    /* Detect public `util.types` helpers for Node.js v10+. */
    /* Node.js deprecation code: DEP0103. */
    const typesHelper: Boolean = freeModule && freeModule.require && freeModule.require('util').types
    return typesHelper
      ? typesHelper
      /* Legacy process.binding('util') for Node.js earlier than v10. */
      : freeProcess && freeProcess.binding && freeProcess.binding('util')
  } catch (e) {}
})())

export default nodeTypes
