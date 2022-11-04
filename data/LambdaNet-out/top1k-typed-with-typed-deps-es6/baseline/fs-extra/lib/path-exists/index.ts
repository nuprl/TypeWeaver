'use strict'
import { fromPromise as u } from 'universalify';
import fs from '../fs';

function pathExists (path: String): Promise {
  return fs.access(path).then(() => true).catch(() => false)
}

export default {
  pathExists: u(pathExists),
  pathExistsSync: fs.existsSync
};