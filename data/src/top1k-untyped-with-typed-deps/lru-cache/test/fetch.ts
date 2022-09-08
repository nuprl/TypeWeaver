import t from 'tap'
import LRUCache from '../'
import type { Fetcher } from '../'
import { exposeStatics, expose } from './fixtures/expose'

const fn: Fetcher<any, any> = async (_, v) =>
  new Promise(res =>
    setImmediate(() => res(v === undefined ? 0 : v + 1))
  )

import Clock from 'clock-mock'
const clock = new Clock()
t.teardown(clock.enter())
clock.advance(1)

let LRU = LRUCache

// if we're on a version that *doesn't* have a native AbortController,
// put the polyfill in there to start with, so LRU covers both cases.
if (!global.AbortController || !global.AbortSignal) {
  global.AbortController = exposeStatics(LRU).AbortController
  global.AbortSignal = exposeStatics(LRU).AbortSignal
  LRU = t.mock('../', {}) as typeof LRUCache
}

const c = new LRU({
  fetchMethod: fn,
  max: 5,
  ttl: 5,
})

t.test('asynchronous fetching', async t => {
  const v1 = await c.fetch('key')
  t.equal(v1, 0, 'first fetch, no stale data, wait for initial value')
  const v2 = await c.fetch('key')
  t.equal(v2, 0, 'got same cached value')

  clock.advance(10)

  const v3 = await c.fetch('key', { allowStale: true })
  t.equal(v3, 0, 'fetch while stale, allowStale, get stale data')
  t.equal(
    await c.fetch('key', { allowStale: true }),
    0,
    'get stale data again while re-fetching because stale previously'
  )
  const v4 = await c.fetch('key')
  t.equal(v4, 1, 'no allow stale, wait until fresh data available')
  const v5 = await c.fetch('key')
  t.equal(v5, 1, 'fetch while not stale, just get from cache')

  clock.advance(10)

  const v6 = await c.fetch('key', { allowStale: true })
  t.equal(
    v6,
    1,
    'fetch while stale, starts new fetch, return stale data'
  )
  const e = expose(c)
  const v = e.valList[0]

  // should not have any promises or cycles in the dump
  const dump = c.dump()
  for (const [_, entry] of dump) {
    t.type(entry.value, 'number')
  }
  t.matchSnapshot(JSON.stringify(dump), 'safe to stringify dump')

  t.equal(e.isBackgroundFetch(v), true)
  t.equal(e.backgroundFetch('key', 0), v)
  await v
  const v7 = await c.fetch('key', {
    allowStale: true,
    updateAgeOnGet: true,
  })
  t.equal(v7, 2, 'fetch completed, so get new data')

  clock.advance(100)

  const v8 = await c.fetch('key', { allowStale: true })
  const v9 = c.get('key', { allowStale: true })
  t.equal(v8, 2, 'fetch returned stale while fetching')
  t.equal(v9, 2, 'get() returned stale while fetching')

  const v10 = c.fetch('key2')
  const v11 = c.get('key2')
  t.equal(v11, undefined, 'get while fetching but not yet returned')
  t.equal(await v10, 0, 'eventually 0 is returned')
  const v12 = c.get('key2')
  t.equal(v12, 0, 'get cached value after fetch')

  const v13 = c.fetch('key3')
  c.delete('key3')
  t.equal(await v13, 0, 'returned 0 eventually')
  t.equal(c.has('key3'), false, 'but not inserted into cache')

  c.fetch('key4')
  clock.advance(100)
  const v15 = await c.fetch('key4', { allowStale: true })
  t.equal(
    v15,
    0,
    'there was no stale data, even though we were ok with that'
  )

  c.set('key5', 0)
  clock.advance(100)
  const v16 = await c.fetch('key5')
  t.equal(v16, 1, 'waited for new data, data in cache was stale')

  c.fetch('key4')
  await Promise.resolve().then(() => {})
  clock.advance(100)
  const v18 = c.get('key4')
  t.equal(
    v18,
    undefined,
    'get while fetching, but did not want stale data'
  )

  c.fetch('key6')
  await Promise.resolve().then(() => {})
  clock.advance(100)
  const v20 = c.get('key6', { allowStale: true })
  t.equal(
    v20,
    undefined,
    'get while fetching, but no stale data to return'
  )
})

t.test('fetchMethod must be a function', async t => {
  // @ts-expect-error
  t.throws(() => new LRU({ fetchMethod: true, max: 2 }))
})

t.test('no fetchContext without fetchMethod', async t => {
  t.throws(() => new LRU({ fetchContext: true, max: 2 }))
})

t.test('fetch without fetch method', async t => {
  const c = new LRU({ max: 3 })
  c.set(0, 0)
  c.set(1, 1)
  t.same(await Promise.all([c.fetch(0), c.fetch(1)]), [0, 1])
})

t.test('fetch options, signal', async t => {
  let aborted = false
  const disposed: any[] = []
  const disposedAfter: any[] = []
  const c = new LRU<any, any>({
    max: 3,
    ttl: 100,
    fetchMethod: async (k, oldVal, { signal, options }) => {
      // do something async
      await new Promise(res => setImmediate(res))
      if (signal.aborted) {
        aborted = true
        return
      }
      if (k === 2) {
        options.ttl = 25
      }
      return (oldVal || 0) + 1
    },
    dispose: (v, k, reason) => {
      disposed.push([v, k, reason])
    },
    disposeAfter: (v, k, reason) => {
      disposedAfter.push([v, k, reason])
    },
  })

  const v1 = c.fetch(2)
  c.delete(2)
  t.equal(await v1, undefined, 'no value returned, aborted by delete')
  t.equal(aborted, true)
  t.same(disposed, [], 'no disposals for aborted promises')
  t.same(disposedAfter, [], 'no disposals for aborted promises')

  aborted = false
  const v2 = c.fetch(2)
  c.set(2, 2)
  t.equal(await v2, undefined, 'no value returned, aborted by set')
  t.equal(aborted, true)
  t.same(disposed, [], 'no disposals for aborted promises')
  t.same(disposedAfter, [], 'no disposals for aborted promises')
  c.delete(2)
  disposed.length = 0
  disposedAfter.length = 0

  aborted = false
  const v3 = c.fetch(2)
  c.set(3, 3)
  c.set(4, 4)
  c.set(5, 5)
  t.equal(await v3, undefined, 'no value returned, aborted by evict')
  t.equal(aborted, true)
  t.same(disposed, [], 'no disposals for aborted promises')
  t.same(disposedAfter, [], 'no disposals for aborted promises')

  aborted = false
  await c.fetch(6, { ttl: 1000 })
  t.equal(
    c.getRemainingTTL(6),
    1000,
    'overridden ttl in fetch() opts'
  )
  await c.fetch(2, { ttl: 1 })
  t.equal(c.getRemainingTTL(2), 25, 'overridden ttl in fetchMethod')
})

t.test('fetch options, signal, with polyfill', async t => {
  const { AbortController, AbortSignal } = global
  // @ts-expect-error
  t.teardown(() => Object.assign(global, { AbortController, AbortSignal }))
  // @ts-expect-error
  global.AbortController = undefined
  // @ts-expect-error
  global.AbortSignal = undefined
  const LRU = t.mock('../', {}) as typeof LRUCache
  let aborted = false
  const disposed: any[] = []
  const disposedAfter: any[] = []
  const c = new LRU<number, number>({
    max: 3,
    ttl: 100,
    fetchMethod: async (k, oldVal, { signal, options }) => {
      // do something async
      await new Promise(res => setImmediate(res))
      if (signal.aborted) {
        aborted = true
        return
      }
      if (k === 2) {
        options.ttl = 25
      }
      return (oldVal || 0) + 1
    },
    dispose: (v, k, reason) => {
      disposed.push([v, k, reason])
    },
    disposeAfter: (v, k, reason) => {
      disposedAfter.push([v, k, reason])
    },
  })

  const v1 = c.fetch(2)
  c.delete(2)
  t.equal(await v1, undefined, 'no value returned, aborted by delete')
  t.equal(aborted, true)
  t.same(disposed, [], 'no disposals for aborted promises')
  t.same(disposedAfter, [], 'no disposals for aborted promises')

  aborted = false
  const v2 = c.fetch(2)
  c.set(2, 2)
  t.equal(await v2, undefined, 'no value returned, aborted by set')
  t.equal(aborted, true)
  t.same(disposed, [], 'no disposals for aborted promises')
  t.same(disposedAfter, [], 'no disposals for aborted promises')
  c.delete(2)
  disposed.length = 0
  disposedAfter.length = 0

  aborted = false
  const v3 = c.fetch(2)
  c.set(3, 3)
  c.set(4, 4)
  c.set(5, 5)
  t.equal(await v3, undefined, 'no value returned, aborted by evict')
  t.equal(aborted, true)
  t.same(disposed, [], 'no disposals for aborted promises')
  t.same(disposedAfter, [], 'no disposals for aborted promises')

  aborted = false
  await c.fetch(6, { ttl: 1000 })
  t.equal(
    c.getRemainingTTL(6),
    1000,
    'overridden ttl in fetch() opts'
  )
  await c.fetch(2, { ttl: 1 })
  t.equal(c.getRemainingTTL(2), 25, 'overridden ttl in fetchMethod')
})

t.test('fetch options, signal, with half polyfill', async t => {
  const { AbortController, AbortSignal } = global
  t.teardown(() => {
    global.AbortSignal = AbortSignal
    //@ts-expect-error
    delete AbortController.AbortSignal
  })
  // @ts-expect-error
  global.AbortController.AbortSignal = AbortSignal
  // @ts-expect-error
  global.AbortSignal = undefined
  const LRU = t.mock('../', {}) as typeof LRUCache
  let aborted = false
  const disposed: any[] = []
  const disposedAfter: any[] = []
  const c = new LRU<number, number>({
    max: 3,
    ttl: 100,
    fetchMethod: async (k, oldVal, { signal, options }) => {
      // do something async
      await new Promise(res => setImmediate(res))
      if (signal.aborted) {
        aborted = true
        return
      }
      if (k === 2) {
        options.ttl = 25
      }
      return (oldVal || 0) + 1
    },
    dispose: (v, k, reason) => {
      disposed.push([v, k, reason])
    },
    disposeAfter: (v, k, reason) => {
      disposedAfter.push([v, k, reason])
    },
  })

  const v1 = c.fetch(2)
  c.delete(2)
  t.equal(await v1, undefined, 'no value returned, aborted by delete')
  t.equal(aborted, true)
  t.same(disposed, [], 'no disposals for aborted promises')
  t.same(disposedAfter, [], 'no disposals for aborted promises')

  aborted = false
  const v2 = c.fetch(2)
  c.set(2, 2)
  t.equal(await v2, undefined, 'no value returned, aborted by set')
  t.equal(aborted, true)
  t.same(disposed, [], 'no disposals for aborted promises')
  t.same(disposedAfter, [], 'no disposals for aborted promises')
  c.delete(2)
  disposed.length = 0
  disposedAfter.length = 0

  aborted = false
  const v3 = c.fetch(2)
  c.set(3, 3)
  c.set(4, 4)
  c.set(5, 5)
  t.equal(await v3, undefined, 'no value returned, aborted by evict')
  t.equal(aborted, true)
  t.same(disposed, [], 'no disposals for aborted promises')
  t.same(disposedAfter, [], 'no disposals for aborted promises')

  aborted = false
  await c.fetch(6, { ttl: 1000 })
  t.equal(
    c.getRemainingTTL(6),
    1000,
    'overridden ttl in fetch() opts'
  )
  await c.fetch(2, { ttl: 1 })
  t.equal(c.getRemainingTTL(2), 25, 'overridden ttl in fetchMethod')
})

t.test('fetchMethod throws', async t => {
  // make sure that even if there's no one to sit around and wait for it,
  // the background fetch throwing doesn't blow anything up.
  const cache = new LRU<string, number>({
    max: 10,
    ttl: 10,
    allowStale: true,
    fetchMethod: async () => {
      throw new Error('fetch failure')
    },
  })
  // seed the cache, and make the values stale.
  // this simulates the case where the fetch() DID work,
  // and replaced the promise with the resolution, but
  // then they got stale.
  cache.set('a', 1)
  cache.set('b', 2)
  clock.advance(20)
  await Promise.resolve().then(() => {})
  const a = await Promise.all([
    cache.fetch('a'),
    cache.fetch('a'),
    cache.fetch('a'),
  ])
  t.strictSame(a, [1, 1, 1])
  // clock advances, promise rejects
  clock.advance(20)
  await Promise.resolve().then(() => {})
  t.equal(cache.get('a'), undefined, 'removed from cache')
  const b = await Promise.all([
    cache.fetch('b'),
    cache.fetch('b'),
    cache.fetch('b'),
  ])
  t.strictSame(b, [2, 2, 2])
  clock.advance(20)
  await Promise.resolve().then(() => {})
  t.equal(cache.get('b'), undefined, 'removed from cache')
  const ap = cache.fetch('a')
  cache.set('a', 99)
  await t.rejects(ap, { message: 'fetch failure' })
  t.equal(cache.get('a'), 99, 'did not delete new value')
  t.rejects(cache.fetch('b'), { message: 'fetch failure' })
})

t.test(
  'fetchMethod throws, noDeleteOnFetchRejection option',
  async t => {
    // make sure that even if there's no one to sit around and wait for it,
    // the background fetch throwing doesn't blow anything up.
    let fetchFail = true
    const cache = new LRU<string, number>({
      max: 10,
      ttl: 10,
      allowStale: true,
      noDeleteOnFetchRejection: true,
      fetchMethod: async () => {
        if (fetchFail) {
          throw new Error('fetch failure')
        } else {
          return 1
        }
      },
    })

    // seed the cache, and make the values stale.
    // this simulates the case where the fetch() DID work,
    // and replaced the promise with the resolution, but
    // then they got stale.
    cache.set('a', 1)
    cache.set('b', 2)
    clock.advance(20)
    await Promise.resolve().then(() => {})
    const a = await Promise.all([
      cache.fetch('a'),
      cache.fetch('a'),
      cache.fetch('a'),
    ])
    t.strictSame(a, [1, 1, 1])
    // clock advances, promise rejects
    clock.advance(20)
    await Promise.resolve().then(() => {})
    const e = expose(cache)
    t.equal(e.keyMap.get('a'), 0)
    t.equal(e.valList[0], 1, 'promise replaced with stale value')
    const b = await Promise.all([
      cache.fetch('b'),
      cache.fetch('b'),
      cache.fetch('b'),
    ])
    t.strictSame(b, [2, 2, 2])
    clock.advance(20)
    await Promise.resolve().then(() => {})
    t.equal(e.keyMap.get('b'), 1)
    t.equal(e.valList[1], 2, 'promise replaced with stale value')
    cache.delete('a')
    cache.delete('b')

    // even though we don't noDeleteOnFetchRejection,
    // if there's no stale, we still remove the *promise*.
    const ap = cache.fetch('a')
    cache.set('a', 99)
    await t.rejects(ap, { message: 'fetch failure' })
    t.equal(cache.get('a'), 99, 'did not delete, was replaced')
    await t.rejects(cache.fetch('b'), { message: 'fetch failure' })
    t.equal(e.keyMap.get('b'), undefined, 'not in cache')
    t.equal(e.valList[1], null, 'not in cache')
  }
)

t.test('fetchContext', async t => {
  const cache = new LRU<string, [string, any]>({
    max: 10,
    ttl: 10,
    allowStale: true,
    noDeleteOnFetchRejection: true,
    fetchContext: 'default context',
    fetchMethod: async (k, _, { context, options }) => {
      //@ts-expect-error
      t.equal(options.fetchContext, undefined)
      t.equal(context, expectContext)
      return [k, context]
    },
  })

  let expectContext = 'default context'
  t.strictSame(await cache.fetch('x'), ['x', 'default context'])
  expectContext = 'overridden'
  t.strictSame(await cache.fetch('y', { fetchContext: 'overridden' }), ['y', 'overridden'])
  // if still in cache, doesn't call fetchMethod again
  t.strictSame(await cache.fetch('x', { fetchContext: 'ignored' }), ['x', 'default context'])
})

t.test('forceRefresh', async t => {
  const cache = new LRU<number, number>({
    max: 10,
    allowStale: true,
    ttl: 100,
    fetchMethod: async (k, _, { options }) => {
      //@ts-expect-error
      t.equal(options.forceRefresh, undefined, 'do not expose forceRefresh')
      return k
    }
  })

  // put in some values that don't match what fetchMethod returns
  cache.set(1, 100)
  cache.set(2, 200)
  t.equal(await cache.fetch(1), 100)
  // still there, because we're allowing stale, and it's not stale
  t.equal(await cache.fetch(1, { forceRefresh: true }), 100)
  t.equal(await cache.fetch(1, { forceRefresh: true }), 100)
  t.equal(cache.peek(1), 100)
  // if we don't allow stale though, then that means that we wait
  // for the background fetch to complete, so we get the updated value.
  t.equal(await cache.fetch(1, { allowStale: false }), 1)

  cache.set(1, 100)
  t.equal(await cache.fetch(1, { allowStale: false }), 100)
  t.equal(await cache.fetch(1, { forceRefresh: true, allowStale: false }), 1)
})
