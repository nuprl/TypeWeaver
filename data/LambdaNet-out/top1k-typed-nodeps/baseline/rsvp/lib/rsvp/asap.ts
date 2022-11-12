let len: Number = 0;
export default function asap(callback: String, arg: String): Void {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 1, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    scheduleFlush();
  }
}

const browserWindow: Object = (typeof window !== 'undefined') ? window : undefined;
const browserGlobal: Object = browserWindow || {};
const BrowserMutationObserver: Boolean = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
const isNode: Boolean = typeof self === 'undefined' &&
  typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
const hasWorker: Boolean = typeof Uint8ClampedArray !== 'undefined' &&
  typeof importScripts !== 'undefined' &&
  typeof MessageChannel !== 'undefined';

// node
function useNextTick(): Function {
  const nextTick: Function = process.nextTick;
  return () => nextTick(flush);
}

// vertx
let vertxNext: Function;
function useVertxTimer(): Function {
  if (typeof vertxNext !== 'undefined') {
    return function() {
      vertxNext(flush);
    };
  }
  return useSetTimeout();
}

function useMutationObserver(): Function {
  let iterations: Number = 0;
  let observer: Map = new BrowserMutationObserver(flush);
  let node: Error = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return () => node.data = (iterations = ++iterations % 2);
}

// web worker
function useMessageChannel(): Function {
  let channel: HTMLElement = new MessageChannel();
  channel.port1.onmessage = flush;
  return () => channel.port2.postMessage(0);
}

function useSetTimeout(): Function {
  return () => setTimeout(flush, 1);
}

const queue: Object = new Array(1000);

function flush(): Void {
  for (let i = 0; i < len; i+=2) {
    let callback: Function = queue[i];
    let arg: String = queue[i+1];

    callback(arg);

    queue[i] = undefined;
    queue[i+1] = undefined;
  }

  len = 0;
}

function attemptVertex(): Boolean {
  try {
    const vertx: Enumerator = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch(e) {
    return useSetTimeout();
  }
}

let scheduleFlush: Function;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (hasWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && typeof require === 'function') {
  scheduleFlush = attemptVertex();
} else {
  scheduleFlush = useSetTimeout();
}
