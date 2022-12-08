'use strict'
import fs from '../fs';
import { checkPath } from './utils';

const getMode: Promise<{}> = (options: any) => {
  const defaults: any = { mode: 0o777 }
  if (typeof options === 'number') return options
  return ({ ...defaults, ...options }).mode
}

export const makeDir: Promise<void> = async (dir: string, options: any) => {
  checkPath(dir)

  return fs.mkdir(dir, {
    mode: getMode(options),
    recursive: true
  })
};

export const makeDirSync: void = (dir: string, options: any) => {
  checkPath(dir)

  return fs.mkdirSync(dir, {
    mode: getMode(options),
    recursive: true
  })
};
