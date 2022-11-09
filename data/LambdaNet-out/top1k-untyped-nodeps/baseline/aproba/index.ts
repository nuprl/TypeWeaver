'use strict'
module.exports = validate

function isArguments (thingy: Object): Boolean {
  return thingy != null && typeof thingy === 'object' && thingy.hasOwnProperty('callee')
}

const types: Object = {
  '*': {label: 'any', check: () => true},
  A: {label: 'array', check: (_: Array) => Array.isArray(_) || isArguments(_)},
  S: {label: 'string', check: (_: String) => typeof _ === 'string'},
  N: {label: 'number', check: (_: String) => typeof _ === 'number'},
  F: {label: 'function', check: (_: String) => typeof _ === 'function'},
  O: {label: 'object', check: (_: String) => typeof _ === 'object' && _ != null && !types.A.check(_) && !types.E.check(_)},
  B: {label: 'boolean', check: (_: String) => typeof _ === 'boolean'},
  E: {label: 'error', check: (_: String) => _ instanceof Error},
  Z: {label: 'null', check: (_: String) => _ == null}
}

function addSchema (schema: String, arity: Promise): Void {
  const group: Array = arity[schema.length] = arity[schema.length] || []
  if (group.indexOf(schema) === -1) group.push(schema)
}

function validate (rawSchemas: String, args: Array): Void {
  if (arguments.length !== 2) throw wrongNumberOfArgs(['SA'], arguments.length)
  if (!rawSchemas) throw missingRequiredArg(0, 'rawSchemas')
  if (!args) throw missingRequiredArg(1, 'args')
  if (!types.S.check(rawSchemas)) throw invalidType(0, ['string'], rawSchemas)
  if (!types.A.check(args)) throw invalidType(1, ['array'], args)
  const schemas: Array = rawSchemas.split('|')
  const arity: Object = {}

  schemas.forEach((schema: String) => {
    for (let ii = 0; ii < schema.length; ++ii) {
      const type: String = schema[ii]
      if (!types[type]) throw unknownType(ii, type)
    }
    if (/E.*E/.test(schema)) throw moreThanOneError(schema)
    addSchema(schema, arity)
    if (/E/.test(schema)) {
      addSchema(schema.replace(/E.*$/, 'E'), arity)
      addSchema(schema.replace(/E/, 'Z'), arity)
      if (schema.length === 1) addSchema('', arity)
    }
  })
  let matching: Array = arity[args.length]
  if (!matching) {
    throw wrongNumberOfArgs(Object.keys(arity), args.length)
  }
  for (let ii = 0; ii < args.length; ++ii) {
    let newMatching: Array = matching.filter((schema: Object) => {
      const type: String = schema[ii]
      const typeCheck: Function = types[type].check
      return typeCheck(args[ii])
    })
    if (!newMatching.length) {
      const labels: Array = matching.map((_: Promise) => types[_[ii]].label).filter((_: String) => _ != null)
      throw invalidType(ii, labels, args[ii])
    }
    matching = newMatching
  }
}

function missingRequiredArg (num: Number): String {
  return newException('EMISSINGARG', 'Missing required argument #' + (num + 1))
}

function unknownType (num: String, type: String): String {
  return newException('EUNKNOWNTYPE', 'Unknown type ' + type + ' in argument #' + (num + 1))
}

function invalidType (num: String, expectedTypes: String, value: String): String {
  let valueType: String
  Object.keys(types).forEach((typeCode: String) => {
    if (types[typeCode].check(value)) valueType = types[typeCode].label
  })
  return newException('EINVALIDTYPE', 'Argument #' + (num + 1) + ': Expected ' +
    englishList(expectedTypes) + ' but got ' + valueType)
}

function englishList (list: Array): String {
  return list.join(', ').replace(/, ([^,]+)$/, ' or $1')
}

function wrongNumberOfArgs (expected: Array, got: Number): Boolean {
  const english: String = englishList(expected)
  const args: String = expected.every((ex: Array) => ex.length === 1)
    ? 'argument'
    : 'arguments'
  return newException('EWRONGARGCOUNT', 'Expected ' + english + ' ' + args + ' but got ' + got)
}

function moreThanOneError (schema: String): String {
  return newException('ETOOMANYERRORTYPES',
    'Only one error type per argument signature is allowed, more than one found in "' + schema + '"')
}

function newException (code: String, msg: String): Object {
  const err: Error = new Error(msg)
  err.code = code
  /* istanbul ignore else */
  if (Error.captureStackTrace) Error.captureStackTrace(err, validate)
  return err
}
