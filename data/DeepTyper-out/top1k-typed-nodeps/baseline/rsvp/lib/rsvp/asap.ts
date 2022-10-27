let len: number = 0;
export default function asap(callback: any, arg: any): void {
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

const browserWindow: any = (typeof window !== 'undefined') ? window : undefined;
const browserGlobal: any = browserWindow || {};
const BrowserMutationObserver: any = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
const isNode: boolean = typeof self === 'undefined' &&
  typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
const hasWorker: boolean = typeof Uint8ClampedArray !== 'undefined' &&
  typeof importScripts !== 'undefined' &&
  typeof MessageChannel !== 'undefined';

// node
function useNextTick(): any {
  const nextTick: any = process.nextTick;
  return () => nextTick(flush);
}

// vertx
let vertxNext: any;
function useVertxTimer(): void {
  if (typeof vertxNext !== 'undefined') {
    return function() {
      vertxNext(flush);
    };
  }
  return useSetTimeout();
}

function useMutationObserver(): any {
  let iterations: number = 0;
  let observer: any = new BrowserMutationObserver(flush);
  let node: FileNode = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return () => node.data = (iterations = ++iterations % 2);
}

// web worker
function useMessageChannel(): void {
  let channel: any = new MessageChannel();
  channel.port1.onmessage = flush;
  return () => channel.port2.postMessage(0);
}

function useSetTimeout(): any {
  return () => setTimeout(flush, 1);
}

const queue: any[] = new Array(1000);

function flush(): void {
  for (let i = 0; i < len; i+=2) {
    let callback: any = queue[i];
    let arg: any = queue[i+1];

    callback(arg);

    queue[i] = undefined;
    queue[i+1] = undefined;
  }

  len = 0;
}

function attemptVertex(): any {
  try {
    const vertx: Function = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch(e) {
    return useSetTimeout();
  }
}

let scheduleFlush: any;
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
