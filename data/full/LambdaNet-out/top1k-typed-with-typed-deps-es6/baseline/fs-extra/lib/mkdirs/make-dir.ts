'use strict'
import fs from '../fs';
import { checkPath } from './utils';

const getMode: Function = (options: object) => {
  const defaults: object = { mode: 0o777 }
  if (typeof options === 'number') return options
  return ({ ...defaults, ...options }).mode
}

export const makeDir: Function = async (dir: any[], options: object) => {
  checkPath(dir)

  return fs.mkdir(dir, {
    mode: getMode(options),
    recursive: true
  })
};

export const makeDirSync: Function = (dir: string, options: object) => {
  checkPath(dir)

  return fs.mkdirSync(dir, {
    mode: getMode(options),
    recursive: true
  })
};
