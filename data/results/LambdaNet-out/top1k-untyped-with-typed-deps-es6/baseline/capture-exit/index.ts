import RSVP from 'rsvp';

var exit: Function;
var handlers: any[] = [];
var lastTime: string;
var isExiting: boolean = false;

process.on('beforeExit', function (code: string) {
  if (handlers.length === 0) { return; }

  var own: number = lastTime = _flush(lastTime, code)
    .finally(function () {
      // if an onExit handler has called process.exit, do not disturb
      // `lastTime`.
      //
      // Otherwise, clear `lastTime` so that we know to synchronously call the
      // real `process.exit` with the given exit code, when our captured
      // `process.exit` is called during a `process.on('exit')` handler
      //
      // This is impossible to reason about, don't feel bad.  Just look at
      // test-natural-exit-subprocess-error.js
      if (own === lastTime) {
        lastTime = undefined;
      }
    });
});

// This exists only for testing
export const _reset: Function = function () {
  releaseExit();
  handlers = [];
  lastTime = undefined;
  isExiting = false;
  firstExitCode = undefined;
};

/*
 * To allow cooperative async exit handlers, we unfortunately must hijack
 * process.exit.
 *
 * It allows a handler to ensure exit, without that exit handler impeding other
 * similar handlers
 *
 * for example, see: https://github.com/sindresorhus/ora/issues/27
 *
 */
export const releaseExit: Function = function() {
  if (exit) {
    process.exit = exit;
    exit = null;
  }
};

var firstExitCode: string;

export const captureExit: Function = function() {
  if (exit) {
    // already captured, no need to do more work
    return;
  }
  exit = process.exit;

  process.exit = function(code: number) {
    if (handlers.length === 0 && lastTime === undefined) {
      // synchronously exit.
      //
      // We do this brecause either
      //
      //  1.  The process exited due to a call to `process.exit` but we have no
      //      async work to do because no handlers had been attached.  It
      //      doesn't really matter whether we take this branch or not in this
      //      case.
      //
      //  2.  The process exited naturally.  We did our async work during
      //      `beforeExit` and are in this function because someone else has
      //      called `process.exit` during an `on('exit')` hook.  The only way
      //      for us to preserve the exit code in this case is to exit
      //      synchronously.
      //
      return exit.call(process, code);
    }

    if (firstExitCode === undefined) {
      firstExitCode = code;
    }
    var own: number = lastTime = _flush(lastTime, firstExitCode)
      .then(function() {
        // if another chain has started, let it exit
        if (own !== lastTime) { return; }
        exit.call(process, firstExitCode);
      })
      .catch(function(error: object) {
        // if another chain has started, let it exit
        if (own !== lastTime) {
          throw error;
        }
        console.error(error);
        exit.call(process, 1);
      });
  };
};

export const _handlers: any[] = handlers;

export const _flush: Function = function(lastTime: string, code: string) {
  isExiting = true;
  var work: any[] = handlers.splice(0, handlers.length);

  return RSVP.Promise.resolve(lastTime).
    then(function() {
      var firstRejected: boolean;
      return RSVP.allSettled(work.map(function(handler: Function) {
        return RSVP.resolve(handler.call(null, code)).catch(function(e: boolean) {
          if (!firstRejected) {
            firstRejected = e;
          }
          throw e;
        });
      })).then(function(results: Function) {
        if (firstRejected) {
          throw firstRejected;
        }
      });
    });
};

export const onExit: Function = function(cb: string) {
  if (!exit) {
    throw new Error('Cannot install handler when exit is not captured.  Call `captureExit()` first');
  }
  if (isExiting) {
    throw new Error('Cannot install handler while `onExit` handlers are running.');
  }
  var index: number = handlers.indexOf(cb);

  if (index > -1) { return; }
  handlers.push(cb);
};

export const offExit: Function = function(cb: string) {
  var index: number = handlers.indexOf(cb);

  if (index < 0) { return; }

  handlers.splice(index, 1);
};

export const exit: Function = function() {
  exit.apply(process, arguments);
};

export const listenerCount: Function = function() {
  return handlers.length;
};
