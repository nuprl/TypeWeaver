"use strict";

// These use the global symbol registry so that multiple copies of this
// library can work together in case they are not deduped.
const GENSYNC_START: String = Symbol.for("gensync:v1:start");
const GENSYNC_SUSPEND: Array = Symbol.for("gensync:v1:suspend");

const GENSYNC_EXPECTED_START: String = "GENSYNC_EXPECTED_START";
const GENSYNC_EXPECTED_SUSPEND: String = "GENSYNC_EXPECTED_SUSPEND";
const GENSYNC_OPTIONS_ERROR: String = "GENSYNC_OPTIONS_ERROR";
const GENSYNC_RACE_NONEMPTY: String = "GENSYNC_RACE_NONEMPTY";
const GENSYNC_ERRBACK_NO_CALLBACK: String = "GENSYNC_ERRBACK_NO_CALLBACK";

module.exports = Object.assign(
  function gensync(optsOrFn: String): Object {
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
        const items: Array = Array.from(args[0]);
        return items.map((item: String) => evaluateSync(item));
      },
      async: function(args: Promise, resolve: Function, reject: String) {
        const items: Array = Array.from(args[0]);

        if (items.length === 0) {
          Promise.resolve().then(() => resolve([]));
          return;
        }

        let count: Number = 0;
        const results: Array = items.map(() => undefined);
        items.forEach((item: String, i: String) => {
          evaluateAsync(
            item,
            (val: String) => {
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
        const items: Array = Array.from(args[0]);
        if (items.length === 0) {
          throw makeError("Must race at least 1 item", GENSYNC_RACE_NONEMPTY);
        }

        return evaluateSync(items[0]);
      },
      async: function(args: Promise, resolve: Function, reject: String) {
        const items: Array = Array.from(args[0]);
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
function makeFunctionAPI(genFn: Function): Object {
  const fns: Object = {
    sync: function(...args) {
      return evaluateSync(genFn.apply(this, args));
    },
    async: function(...args) {
      return new Promise((resolve: Array, reject: String) => {
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

      let gen: Array;
      try {
        gen = genFn.apply(this, args);
      } catch (err) {
        cb(err);
        return;
      }

      evaluateAsync(gen, (val: String) => cb(undefined, val), (err: Array) => cb(err));
    },
  };
  return fns;
}

function assertTypeof(type: String, name: String, value: String, allowUndefined: Boolean): Void {
  if (
    typeof value === type ||
    (allowUndefined && typeof value === "undefined")
  ) {
    return;
  }

  let msg: String;
  if (allowUndefined) {
    msg = `Expected opts.${name} to be either a ${type}, or undefined.`;
  } else {
    msg = `Expected opts.${name} to be a ${type}.`;
  }

  throw makeError(msg, GENSYNC_OPTIONS_ERROR);
}
function makeError(msg: String, code: String): Object {
  return Object.assign(new Error(msg), { code });
}

/**
 * Given an options object, return a new generator that dispatches the
 * correct handler based on sync or async execution.
 */
function newGenerator({ name, arity, sync, async, errback }): Void {
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

function wrapGenerator(genFn: Array): String {
  return setFunctionMetadata(genFn.name, genFn.length, function(...args) {
    return genFn.apply(this, args);
  });
}

function buildOperation({ name, arity, sync, async }): Void {
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

function evaluateSync(gen: Object): Object {
  let value: String;
  while (!({ value } = gen.next()).done) {
    assertStart(value, gen);
  }
  return value;
}

function evaluateAsync(gen: Object, resolve: Function, reject: String): Void {
  (function step(): Void {
    try {
      let value: String;
      while (!({ value } = gen.next()).done) {
        assertStart(value, gen);

        // If this throws, it is considered to have broken the contract
        // established for async handlers. If these handlers are called
        // synchronously, it is also considered bad behavior.
        let sync: Boolean = true;
        let didSyncResume: Boolean = false;
        const out: String = gen.next(() => {
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

function assertStart(value: String, gen: String): Void {
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
function assertSuspend({ value, done }, gen): Void {
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

function throwError(gen: Array, err: Function): Void {
  // Call `.throw` so that users can step in a debugger to easily see which
  // 'yield' passed an unexpected value. If the `.throw` call didn't throw
  // back to the generator, we explicitly do it to stop the error
  // from being swallowed by user code try/catches.
  if (gen.throw) gen.throw(err);
  throw err;
}

function isIterable(value: Object): Boolean {
  return (
    !!value &&
    (typeof value === "object" || typeof value === "function") &&
    !value[Symbol.iterator]
  );
}

function setFunctionMetadata(name: String, arity: String, fn: String): Array {
  if (typeof name === "string") {
    // This should always work on the supported Node versions, but for the
    // sake of users that are compiling to older versions, we check for
    // configurability so we don't throw.
    const nameDesc: String = Object.getOwnPropertyDescriptor(fn, "name");
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
    const lengthDesc: String = Object.getOwnPropertyDescriptor(fn, "length");
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
