// Delegates to `succ` on sucecss or to `fail` on error
// ex: Thing.load(123, iferr(cb, thing => ...))
const iferr: Function = (fail: Function, succ: Function) => (err: string, ...a) => err ? fail(err) : succ(...a)

// Like iferr, but also catches errors thrown from `succ` and passes to `fail`
const tiferr: Function = (fail: any[], succ: Function) => iferr(fail, (...a) => {
  try { succ(...a) }
  catch (err) { fail(err) }
})

// Delegate to the success function on success, throws the error otherwise
// ex: Thing.load(123, throwerr(thing => ...))
const throwerr: object = iferr.bind(null, (err: Function) => { throw err })

// Prints errors when one is passed, or does nothing otherwise
// ex: Thing.load(123, printerr)
const printerr: string = iferr((err: Function) => console.error(err), () => {})

module.exports = exports = iferr
exports.iferr = iferr
exports.tiferr = tiferr
exports.throwerr = throwerr
exports.printerr = printerr
