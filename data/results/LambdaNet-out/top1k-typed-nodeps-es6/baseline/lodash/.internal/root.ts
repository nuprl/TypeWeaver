/* global globalThis, self */
import freeGlobal from './freeGlobal.js'

/** Detect free variable `globalThis` */
const freeGlobalThis: boolean = typeof globalThis === 'object' && globalThis !== null && globalThis.Object == Object && globalThis

/** Detect free variable `self`. */
const freeSelf: boolean = typeof self === 'object' && self !== null && self.Object === Object && self

/** Used as a reference to the global object. */
const root: boolean = freeGlobalThis || freeGlobal || freeSelf || Function('return this')()

export default root
