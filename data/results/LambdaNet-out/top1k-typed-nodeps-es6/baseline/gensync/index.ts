"use strict";

// These use the global symbol registry so that multiple copies of this
// library can work together in case they are not deduped.
const GENSYNC_START: string = Symbol.for("gensync:v1:start");
const GENSYNC_SUSPEND: string = Symbol.for("gensync:v1:suspend");

const GENSYNC_EXPECTED_START: string = "GENSYNC_EXPECTED_START";
const GENSYNC_EXPECTED_SUSPEND: string = "GENSYNC_EXPECTED_SUSPEND";
const GENSYNC_OPTIONS_ERROR: string = "GENSYNC_OPTIONS_ERROR";
const GENSYNC_RACE_NONEMPTY: string = "GENSYNC_RACE_NONEMPTY";
const GENSYNC_ERRBACK_NO_CALLBACK: string = "GENSYNC_ERRBACK_NO_CALLBACK";

export default Object.assign(
  function gensync(optsOrFn: string): object {
    let genFn: Function = optsOrFn;
    if (typeof optsOrFn !== "function") {
      genFn = newGenerator(optsOrFn);
    } else {
      genFn = wrapGenerator(optsOrFn);
    }

    return Object.assign(genFn, makeFunctionAPI(genFn));
  },
  {
    all: buildOperation({
      name: "all",
      arity: 1,
      sync: function(args: Promise) {
        const items: any[] = Array.from(args[0]);
        return items.map((item: string) => evaluateSync(item));
      },
      async: function(args: Promise, resolve: Function, reject: string) {
        const items: any[] = Array.from(args[0]);

        if (items.length === 0) {
          Promise.resolve().then(() => resolve([]));
          return;
        }

        let count: number = 0;
        const results: any[] = items.map(() => undefined);
        items.forEach((item: string, i: string) => {
          evaluateAsync(
            item,
            (val: string) => {
              results[i] = val;
              count += 1;

              if (count === results.length) resolve(results);
            },
            reject
          );
        });
      },
    }),
    race: buildOperation({
      name: "race",
      arity: 1,
      sync: function(args: Promise) {
        const items: any[] = Array.from(args[0]);
        if (items.length === 0) {
          throw makeError("Must race at least 1 item", GENSYNC_RACE_NONEMPTY);
        }

        return evaluateSync(items[0]);
      },
      async: function(args: Promise, resolve: Function, reject: string) {
        const items: any[] = Array.from(args[0]);
        if (items.length === 0) {
          throw makeError("Must race at least 1 item", GENSYNC_RACE_NONEMPTY);
        }

        for (const item of items) {
          evaluateAsync(item, resolve, reject);
        }
      },
    }),
  }
);

/**
 * Given a generator function, return the standard API object that executes
 * the generator and calls the callbacks.
 */
function makeFunctionAPI(genFn: Function): object {
  const fns: object = {
    sync: function(...args) {
      return evaluateSync(genFn.apply(this, args));
    },
    async: function(...args) {
      return new Promise((resolve: any[], reject: string) => {
        evaluateAsync(genFn.apply(this, args), resolve, reject);
      });
    },
    errback: function(...args) {
      const cb: Function = args.pop();
      if (typeof cb !== "function") {
        throw makeError(
          "Asynchronous function called without callback",
          GENSYNC_ERRBACK_NO_CALLBACK
        );
      }

      let gen: any[];
      try {
        gen = genFn.apply(this, args);
      } catch (err) {
        cb(err);
        return;
      }

      evaluateAsync(gen, (val: string) => cb(undefined, val), (err: any[]) => cb(err));
    },
  };
  return fns;
}

function assertTypeof(type: string, name: string, value: string, allowUndefined: boolean): void {
  if (
    typeof value === type ||
    (allowUndefined && typeof value === "undefined")
  ) {
    return;
  }

  let msg: string;
  if (allowUndefined) {
    msg = `Expected opts.${name} to be either a ${type}, or undefined.`;
  } else {
    msg = `Expected opts.${name} to be a ${type}.`;
  }

  throw makeError(msg, GENSYNC_OPTIONS_ERROR);
}
function makeError(msg: string, code: string): object {
  return Object.assign(new Error(msg), { code });
}

/**
 * Given an options object, return a new generator that dispatches the
 * correct handler based on sync or async execution.
 */
function newGenerator({ name, arity, sync, async, errback }): void {
  assertTypeof("string", "name", name, true /* allowUndefined */);
  assertTypeof("number", "arity", arity, true /* allowUndefined */);
  assertTypeof("function", "sync", sync);
  assertTypeof("function", "async", async, true /* allowUndefined */);
  assertTypeof("function", "errback", errback, true /* allowUndefined */);
  if (async && errback) {
    throw makeError(
      "Expected one of either opts.async or opts.errback, but got _both_.",
      GENSYNC_OPTIONS_ERROR
    );
  }

  if (typeof name !== "string") {
    let fnName;
    if (errback && errback.name && errback.name !== "errback") {
      fnName = errback.name;
    }
    if (async && async.name && async.name !== "async") {
      fnName = async.name.replace(/Async$/, "");
    }
    if (sync && sync.name && sync.name !== "sync") {
      fnName = sync.name.replace(/Sync$/, "");
    }

    if (typeof fnName === "string") {
      name = fnName;
    }
  }

  if (typeof arity !== "number") {
    arity = sync.length;
  }

  return buildOperation({
    name,
    arity,
    sync: function(args) {
      return sync.apply(this, args);
    },
    async: function(args, resolve, reject) {
      if (async) {
        async.apply(this, args).then(resolve, reject);
      } else if (errback) {
        errback.call(this, ...args, (err, value) => {
          if (err == null) resolve(value);
          else reject(err);
        });
      } else {
        resolve(sync.apply(this, args));
      }
    },
  });
}

function wrapGenerator(genFn: any[]): string {
  return setFunctionMetadata(genFn.name, genFn.length, function(...args) {
    return genFn.apply(this, args);
  });
}

function buildOperation({ name, arity, sync, async }): void {
  return setFunctionMetadata(name, arity, function*(...args) {
    const resume = yield GENSYNC_START;
    if (!resume) {
      // Break the tail call to avoid a bug in V8 v6.X with --harmony enabled.
      const res = sync.call(this, args);
      return res;
    }

    let result;
    try {
      async.call(
        this,
        args,
        value => {
          if (result) return;

          result = { value };
          resume();
        },
        err => {
          if (result) return;

          result = { err };
          resume();
        }
      );
    } catch (err) {
      result = { err };
      resume();
    }

    // Suspend until the callbacks run. Will resume synchronously if the
    // callback was already called.
    yield GENSYNC_SUSPEND;

    if (result.hasOwnProperty("err")) {
      throw result.err;
    }

    return result.value;
  });
}

function evaluateSync(gen: object): object {
  let value: string;
  while (!({ value } = gen.next()).done) {
    assertStart(value, gen);
  }
  return value;
}

function evaluateAsync(gen: object, resolve: Function, reject: string): void {
  (function step(): void {
    try {
      let value: string;
      while (!({ value } = gen.next()).done) {
        assertStart(value, gen);

        // If this throws, it is considered to have broken the contract
        // established for async handlers. If these handlers are called
        // synchronously, it is also considered bad behavior.
        let sync: boolean = true;
        let didSyncResume: boolean = false;
        const out: string = gen.next(() => {
          if (sync) {
            didSyncResume = true;
          } else {
            step();
          }
        });
        sync = false;

        assertSuspend(out, gen);

        if (!didSyncResume) {
          // Callback wasn't called synchronously, so break out of the loop
          // and let it call 'step' later.
          return;
        }
      }

      return resolve(value);
    } catch (err) {
      return reject(err);
    }
  })();
}

function assertStart(value: string, gen: string): void {
  if (value === GENSYNC_START) return;

  throwError(
    gen,
    makeError(
      `Got unexpected yielded value in gensync generator: ${JSON.stringify(
        value
      )}. Did you perhaps mean to use 'yield*' instead of 'yield'?`,
      GENSYNC_EXPECTED_START
    )
  );
}
function assertSuspend({ value, done }, gen): void {
  if (!done && value === GENSYNC_SUSPEND) return;

  throwError(
    gen,
    makeError(
      done
        ? "Unexpected generator completion. If you get this, it is probably a gensync bug."
        : `Expected GENSYNC_SUSPEND, got ${JSON.stringify(
            value
          )}. If you get this, it is probably a gensync bug.`,
      GENSYNC_EXPECTED_SUSPEND
    )
  );
}

function throwError(gen: any[], err: Function): void {
  // Call `.throw` so that users can step in a debugger to easily see which
  // 'yield' passed an unexpected value. If the `.throw` call didn't throw
  // back to the generator, we explicitly do it to stop the error
  // from being swallowed by user code try/catches.
  if (gen.throw) gen.throw(err);
  throw err;
}

function isIterable(value: object): boolean {
  return (
    !!value &&
    (typeof value === "object" || typeof value === "function") &&
    !value[Symbol.iterator]
  );
}

function setFunctionMetadata(name: string, arity: string, fn: string): any[] {
  if (typeof name === "string") {
    // This should always work on the supported Node versions, but for the
    // sake of users that are compiling to older versions, we check for
    // configurability so we don't throw.
    const nameDesc: string = Object.getOwnPropertyDescriptor(fn, "name");
    if (!nameDesc || nameDesc.configurable) {
      Object.defineProperty(
        fn,
        "name",
        Object.assign(nameDesc || {}, {
          configurable: true,
          value: name,
        })
      );
    }
  }

  if (typeof arity === "number") {
    const lengthDesc: string = Object.getOwnPropertyDescriptor(fn, "length");
    if (!lengthDesc || lengthDesc.configurable) {
      Object.defineProperty(
        fn,
        "length",
        Object.assign(lengthDesc || {}, {
          configurable: true,
          value: arity,
        })
      );
    }
  }

  return fn;
}
