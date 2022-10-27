'use strict'
import fs from '../fs';
import { checkPath } from './utils';

const getMode: Function = (options: Object) => {
  const defaults: Object = { mode: 0o777 }
  if (typeof options === 'number') return options
  return ({ ...defaults, ...options }).mode
}

export const makeDir: Function = async (dir: Array, options: Object) => {
  checkPath(dir)

  return fs.mkdir(dir, {
    mode: getMode(options),
    recursive: true
  })
};

export const makeDirSync: Function = (dir: String, options: Object) => {
  checkPath(dir)

  return fs.mkdirSync(dir, {
    mode: getMode(options),
    recursive: true
  })
};
