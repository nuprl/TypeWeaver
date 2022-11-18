'use strict'

import { fromPromise as u } from 'universalify';
import fs from '../fs';
import path from 'path';
import mkdir from '../mkdirs';
import remove from '../remove';

const emptyDir: string = u(async function emptyDir (dir: any[]): Map {
  let items: any[]
  try {
    items = await fs.readdir(dir)
  } catch {
    return mkdir.mkdirs(dir)
  }

  return Promise.all(items.map((item: string) => remove.remove(path.join(dir, item))))
})

function emptyDirSync (dir: string): Void {
  let items: any[]
  try {
    items = fs.readdirSync(dir)
  } catch {
    return mkdir.mkdirsSync(dir)
  }

  items.forEach((item: string) => {
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
