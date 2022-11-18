'use strict'
export default validate;

function isArguments (thingy: object): boolean {
  return thingy != null && typeof thingy === 'object' && thingy.hasOwnProperty('callee')
}

const types: object = {
  '*': {label: 'any', check: () => true},
  A: {label: 'array', check: (_: any[]) => Array.isArray(_) || isArguments(_)},
  S: {label: 'string', check: (_: string) => typeof _ === 'string'},
  N: {label: 'number', check: (_: string) => typeof _ === 'number'},
  F: {label: 'function', check: (_: string) => typeof _ === 'function'},
  O: {label: 'object', check: (_: string) => typeof _ === 'object' && _ != null && !types.A.check(_) && !types.E.check(_)},
  B: {label: 'boolean', check: (_: string) => typeof _ === 'boolean'},
  E: {label: 'error', check: (_: string) => _ instanceof Error},
  Z: {label: 'null', check: (_: string) => _ == null}
}

function addSchema (schema: string, arity: Promise): Void {
  const group: any[] = arity[schema.length] = arity[schema.length] || []
  if (group.indexOf(schema) === -1) group.push(schema)
}

function validate (rawSchemas: string, args: any[]): Void {
  if (arguments.length !== 2) throw wrongNumberOfArgs(['SA'], arguments.length)
  if (!rawSchemas) throw missingRequiredArg(0, 'rawSchemas')
  if (!args) throw missingRequiredArg(1, 'args')
  if (!types.S.check(rawSchemas)) throw invalidType(0, ['string'], rawSchemas)
  if (!types.A.check(args)) throw invalidType(1, ['array'], args)
  const schemas: any[] = rawSchemas.split('|')
  const arity: object = {}

  schemas.forEach((schema: string) => {
    for (let ii = 0; ii < schema.length; ++ii) {
      const type: string = schema[ii]
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
  let matching: any[] = arity[args.length]
  if (!matching) {
    throw wrongNumberOfArgs(Object.keys(arity), args.length)
  }
  for (let ii = 0; ii < args.length; ++ii) {
    let newMatching: any[] = matching.filter((schema: object) => {
      const type: string = schema[ii]
      const typeCheck: Function = types[type].check
      return typeCheck(args[ii])
    })
    if (!newMatching.length) {
      const labels: any[] = matching.map((_: Promise) => types[_[ii]].label).filter((_: string) => _ != null)
      throw invalidType(ii, labels, args[ii])
    }
    matching = newMatching
  }
}

function missingRequiredArg (num: number): string {
  return newException('EMISSINGARG', 'Missing required argument #' + (num + 1))
}

function unknownType (num: string, type: string): string {
  return newException('EUNKNOWNTYPE', 'Unknown type ' + type + ' in argument #' + (num + 1))
}

function invalidType (num: string, expectedTypes: string, value: string): string {
  let valueType: string
  Object.keys(types).forEach((typeCode: string) => {
    if (types[typeCode].check(value)) valueType = types[typeCode].label
  })
  return newException('EINVALIDTYPE', 'Argument #' + (num + 1) + ': Expected ' +
    englishList(expectedTypes) + ' but got ' + valueType)
}

function englishList (list: any[]): string {
  return list.join(', ').replace(/, ([^,]+)$/, ' or $1')
}

function wrongNumberOfArgs (expected: any[], got: number): boolean {
  const english: string = englishList(expected)
  const args: string = expected.every((ex: any[]) => ex.length === 1)
    ? 'argument'
    : 'arguments'
  return newException('EWRONGARGCOUNT', 'Expected ' + english + ' ' + args + ' but got ' + got)
}

function moreThanOneError (schema: string): string {
  return newException('ETOOMANYERRORTYPES',
    'Only one error type per argument signature is allowed, more than one found in "' + schema + '"')
}

function newException (code: string, msg: string): object {
  const err: Error = new Error(msg)
  err.code = code
  /* istanbul ignore else */
  if (Error.captureStackTrace) Error.captureStackTrace(err, validate)
  return err
}
