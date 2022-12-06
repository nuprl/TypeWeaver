'use strict'

const u: any = require('universalify').fromPromise
const fs: any = require('../fs')
const path: any = require('path')
const mkdir: any = require('../mkdirs')
const remove: any = require('../remove')

const emptyDir: any = u(async function emptyDir (dir: string): Promise<any> {
  let items: any
  try {
    items = await fs.readdir(dir)
  } catch {
    return mkdir.mkdirs(dir)
  }

  return Promise.all(items.map((item: any) => remove.remove(path.join(dir, item))))
})

function emptyDirSync (dir: string): any {
  let items: any
  try {
    items = fs.readdirSync(dir)
  } catch {
    return mkdir.mkdirsSync(dir)
  }

  items.forEach((item: any) => {
    item = path.join(dir, item)
    remove.removeSync(item)
  })
}

module.exports = {
  emptyDirSync,
  emptydirSync: emptyDirSync,
  emptyDir,
  emptydir: emptyDir
}
