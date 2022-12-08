'use strict'
export default validate;

function isArguments (thingy: any): boolean {
  return thingy != null && typeof thingy === 'object' && thingy.hasOwnProperty('callee')
}

const types: any = {
  '*': {label: 'any', check: () => true},
  A: {label: 'array', check: (_: any) => Array.isArray(_) || isArguments(_)},
  S: {label: 'string', check: (_: any) => typeof _ === 'string'},
  N: {label: 'number', check: (_: any) => typeof _ === 'number'},
  F: {label: 'function', check: (_: any) => typeof _ === 'function'},
  O: {label: 'object', check: (_: any) => typeof _ === 'object' && _ != null && !types.A.check(_) && !types.E.check(_)},
  B: {label: 'boolean', check: (_: any) => typeof _ === 'boolean'},
  E: {label: 'error', check: (_: any) => _ instanceof Error},
  Z: {label: 'null', check: (_: any) => _ == null}
}

function addSchema (schema: any, arity: any): void {
  const group: any = arity[schema.length] = arity[schema.length] || []
  if (group.indexOf(schema) === -1) group.push(schema)
}

function validate (rawSchemas: any, args: any): void {
  if (arguments.length !== 2) throw wrongNumberOfArgs(['SA'], arguments.length)
  if (!rawSchemas) throw missingRequiredArg(0, 'rawSchemas')
  if (!args) throw missingRequiredArg(1, 'args')
  if (!types.S.check(rawSchemas)) throw invalidType(0, ['string'], rawSchemas)
  if (!types.A.check(args)) throw invalidType(1, ['array'], args)
  const schemas: string[] = rawSchemas.split('|')
  const arity: {} = {}

  schemas.forEach((schema: any) => {
    for (let ii = 0; ii < schema.length; ++ii) {
      const type = schema[ii]
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
  let matching: any = arity[args.length]
  if (!matching) {
    throw wrongNumberOfArgs(Object.keys(arity), args.length)
  }
  for (let ii = 0; ii < args.length; ++ii) {
    let newMatching: any = matching.filter((schema: any) => {
      const type = schema[ii]
      const typeCheck: any = types[type].check
      return typeCheck(args[ii])
    })
    if (!newMatching.length) {
      const labels: any = matching.map((_: any) => types[_[ii]].label).filter((_: any) => _ != null)
      throw invalidType(ii, labels, args[ii])
    }
    matching = newMatching
  }
}

function missingRequiredArg (num: number): string {
  return newException('EMISSINGARG', 'Missing required argument #' + (num + 1))
}

function unknownType (num: number, type): string {
  return newException('EUNKNOWNTYPE', 'Unknown type ' + type + ' in argument #' + (num + 1))
}

function invalidType (num: number, expectedTypes: string, value: string): string {
  let valueType: string
  Object.keys(types).forEach((typeCode: number) => {
    if (types[typeCode].check(value)) valueType = types[typeCode].label
  })
  return newException('EINVALIDTYPE', 'Argument #' + (num + 1) + ': Expected ' +
    englishList(expectedTypes) + ' but got ' + valueType)
}

function englishList (list: string[]): string {
  return list.join(', ').replace(/, ([^,]+)$/, ' or $1')
}

function wrongNumberOfArgs (expected: any, got: string): string {
  const english: string = englishList(expected)
  const args: any[] = expected.every((ex: string) => ex.length === 1)
    ? 'argument'
    : 'arguments'
  return newException('EWRONGARGCOUNT', 'Expected ' + english + ' ' + args + ' but got ' + got)
}

function moreThanOneError (schema: any): string {
  return newException('ETOOMANYERRORTYPES',
    'Only one error type per argument signature is allowed, more than one found in "' + schema + '"')
}

function newException (code: string, msg: string): string {
  const err: Error = new Error(msg)
  err.code = code
  /* istanbul ignore else */
  if (Error.captureStackTrace) Error.captureStackTrace(err, validate)
  return err
}
