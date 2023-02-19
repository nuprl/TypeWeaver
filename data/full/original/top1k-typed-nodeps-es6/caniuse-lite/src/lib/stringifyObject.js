import t from '@babel/types';
import generateCode from './generateCode';
import moduleExports from './moduleExports';

function getKey(encoded) {
  if (/\d/.test(encoded[0])) {
    return t.stringLiteral(encoded)
  }
  return t.identifier(encoded)
}

function stringifyRecursive(data) {
  if (data === null) {
    return t.nullLiteral()
  } else if (typeof data === 'undefined') {
    return t.identifier('undefined')
  } else if (typeof data === 'string') {
    return t.stringLiteral(data)
  } else if (typeof data === 'number') {
    return t.numericLiteral(data)
  } else if (Array.isArray(data)) {
    return t.arrayExpression(data.map(stringifyRecursive))
  } else if (data === Object(data)) {
    return t.objectExpression(
      Object.entries(data).map(([key, value]) =>
        t.objectProperty(getKey(key), stringifyRecursive(value))
      )
    )
  } else {
    throw new Error(`Unhandled type "${typeof data}" when creating object`)
  }
}

function stringify(data) {
  return generateCode([moduleExports(stringifyRecursive(data))])
}

export default stringify;
