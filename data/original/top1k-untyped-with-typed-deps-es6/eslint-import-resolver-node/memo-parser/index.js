'use strict';

import crypto from 'crypto';
import moduleRequire from 'eslint-module-utils/module-require';
import { hashObject } from 'eslint-module-utils/hash';

const cache = new Map();

// must match ESLint default options or we'll miss the cache every time
const parserOptions = {
  loc: true,
  range: true,
  raw: true,
  tokens: true,
  comment: true,
  attachComment: true,
};

export const parse = function parse(content, options) {
  options = Object.assign({}, options, parserOptions);

  if (!options.filePath) {
    throw new Error('no file path provided!');
  }

  const keyHash = crypto.createHash('sha256');
  keyHash.update(content);
  hashObject(options, keyHash);

  const key = keyHash.digest('hex');

  let ast = cache.get(key);
  if (ast != null) return ast;

  const realParser = moduleRequire(options.parser);

  ast = realParser.parse(content, options);
  cache.set(key, ast);

  return ast;
};
