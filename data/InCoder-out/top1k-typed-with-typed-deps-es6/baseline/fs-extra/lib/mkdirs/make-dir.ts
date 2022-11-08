'use strict'
import fs from '../fs';
import { checkPath } from './utils';

const getMode = options => {
  const defaults = { mode: 0o777 }
  if (typeof options === 'number') return options
  return ({ ...defaults, ...options }).mode
}

export const makeDir = async (dir, options) => {
  checkPath(dir)

  return fs.mkdir(dir, {
    mode: getMode(options),
    recursive: true
  })
};

export const makeDirSync = (dir, options) => {
  checkPath(dir)

  return fs.mkdirSync(dir, {
    mode: getMode(options),
    recursive: true
  })
};