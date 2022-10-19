'use strict'
import { fromPromise as u } from 'universalify';
import { makeDir as _makeDir, makeDirSync } from './make-dir';
const makeDir = u(_makeDir)

export default {
  mkdirs: makeDir,
  mkdirsSync: makeDirSync,
  // alias
  mkdirp: makeDir,
  mkdirpSync: makeDirSync,
  ensureDir: makeDir,
  ensureDirSync: makeDirSync
};
