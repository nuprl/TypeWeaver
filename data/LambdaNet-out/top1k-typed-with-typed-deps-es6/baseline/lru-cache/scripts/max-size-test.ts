#!/usr/bin/env node --max_old_space_size=400 --expose_gc
// https://github.com/isaacs/node-lru-cache/issues/227

if (typeof gc !== 'function') {
  throw new Error('run with --expose-gc')
}

let heapdump: String
try {
  heapdump = require('heapdump')
} catch (e) {
  const {spawnSync} = require('child_process')
  spawnSync('npm', ['install'], { cwd: __dirname, stdio: 'inherit' })
  heapdump = require('heapdump')
}

import LRU from '../';
const maxSize: Number = 1_000_000
const itemSize: Number = 1_000
const expectItemCount: Number = Math.floor(maxSize / itemSize)
const profEvery: Number = 100_000
const n: Number = 10_000_000

const sizeCalculation: Function = (s: Array) => s.length || 1
const max: Number = expectItemCount + 1
const keyRange: Number = expectItemCount * 2
const makeItem: Function = () => Buffer.alloc(itemSize)

import v8 from 'v8';
const prof: Function = async (i: HTMLElement, cache: LRUCache, name: String) => {
  // run gc so that we know if we're actually leaking memory, or just
  // that the gc is being lazy and not responding until there's memory
  // pressure.
  gc()
  const file: String = `${__dirname}/heapdump-${name}-${i}.heapsnapshot`
  await new Promise((res: Function, rej: Function) =>
    heapdump.writeSnapshot(file, (er: Boolean) => er ? rej(er) : res()))
  if (!cache || i === 0) {
    console.log(i, v8.getHeapStatistics(), file)
  }
  if (cache && i === 0) {
    console.log(max, cache.valList.length, cache.free.length)
  }
}

const test: Function = async (name: Array, cache: LRUCache) => {
  console.log(name)
  for (let i = 0; i < n; i++) {
    if ((i % profEvery) === 0) {
      await prof(i, cache, name)
    }

    // add items within a range of 2x the expected item count,
    // so we get evictions happening
    const item: String = makeItem()
    cache.set(i % keyRange, item)

    // get some random item, too, to keep the list a bit shuffled.
    // often these will be missing, of course, but expectItemCount/keyRange
    // times they'll be a hit, once the cache is full.
    const j: Number = Math.floor(Math.random() * keyRange)
    cache.get(j)
  }
  cache = null
  prof(n, null, name)
}

const main: Function = async () => {
  await test('max-no-maxSize', new LRU({ max }))
  await test('max-maxSize', new LRU({ max, maxSize, sizeCalculation }))
  await test('no-max-maxSize', new LRU({ maxSize, sizeCalculation }))
}

main()
