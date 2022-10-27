'use strict'

import fs from 'graceful-fs';
import { fromCallback as u } from 'universalify';
import rimraf from './rimraf';

function remove (path, callback) {
  // Node 14.14.0+
  if (fs.rm) return fs.rm(path, { recursive: true, force: true }, callback)
  rimraf(path, callback)
}

function removeSync (path) {
  // Node 14.14.0+
  if (fs.rmSync) return fs.rmSync(path, { recursive: true, force: true })
  rimraf.sync(path)
}

export default {
  remove: u(remove),
  removeSync
};