'use strict'

import { fromPromise as u } from 'universalify';
import fs from '../fs';
import path from 'path';
import mkdir from '../mkdirs';
import remove from '../remove';

const emptyDir: String = u(async function emptyDir (dir: Array): Map {
  let items: Array
  try {
    items = await fs.readdir(dir)
  } catch {
    return mkdir.mkdirs(dir)
  }

  return Promise.all(items.map((item: String) => remove.remove(path.join(dir, item))))
})

function emptyDirSync (dir: String): Void {
  let items: Array
  try {
    items = fs.readdirSync(dir)
  } catch {
    return mkdir.mkdirsSync(dir)
  }

  items.forEach((item: String) => {
    item = path.join(dir, item)
    remove.removeSync(item)
  })
}

export default {
  emptyDirSync,
  emptydirSync: emptyDirSync,
  emptyDir,
  emptydir: emptyDir
};
