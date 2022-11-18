'use strict';

import Promise from './core';

var DEFAULT_WHITELIST: any[] = [
  ReferenceError,
  TypeError,
  RangeError
];

var enabled: boolean = false;
exports.disable = disable;
function disable(): Void {
  enabled = false;
  Promise._onHandle = null;
  Promise._onReject = null;
}

exports.enable = enable;
function enable(options: HTMLElement): Void {
  options = options || {};
  if (enabled) disable();
  enabled = true;
  var id: number = 0;
  var displayId: number = 0;
  var rejections: object = {};
  Promise._onHandle = function (promise: HTMLElement) {
    if (
      promise._state === 2 && // IS REJECTED
      rejections[promise._rejectionId]
    ) {
      if (rejections[promise._rejectionId].logged) {
        onHandled(promise._rejectionId);
      } else {
        clearTimeout(rejections[promise._rejectionId].timeout);
      }
      delete rejections[promise._rejectionId];
    }
  };
  Promise._onReject = function (promise: HTMLElement, err: Function) {
    if (promise._deferredState === 0) { // not yet handled
      promise._rejectionId = id++;
      rejections[promise._rejectionId] = {
        displayId: null,
        error: err,
        timeout: setTimeout(
          onUnhandled.bind(null, promise._rejectionId),
          // For reference errors and type errors, this almost always
          // means the programmer made a mistake, so log them after just
          // 100ms
          // otherwise, wait 2 seconds to see if they get handled
          matchWhitelist(err, DEFAULT_WHITELIST)
            ? 100
            : 2000
        ),
        logged: false
      };
    }
  };
  function onUnhandled(id: string): Void {
    if (
      options.allRejections ||
      matchWhitelist(
        rejections[id].error,
        options.whitelist || DEFAULT_WHITELIST
      )
    ) {
      rejections[id].displayId = displayId++;
      if (options.onUnhandled) {
        rejections[id].logged = true;
        options.onUnhandled(
          rejections[id].displayId,
          rejections[id].error
        );
      } else {
        rejections[id].logged = true;
        logError(
          rejections[id].displayId,
          rejections[id].error
        );
      }
    }
  }
  function onHandled(id: string): Void {
    if (rejections[id].logged) {
      if (options.onHandled) {
        options.onHandled(rejections[id].displayId, rejections[id].error);
      } else if (!rejections[id].onUnhandled) {
        console.warn(
          'Promise Rejection Handled (id: ' + rejections[id].displayId + '):'
        );
        console.warn(
          '  This means you can ignore any previous messages of the form "Possible Unhandled Promise Rejection" with id ' +
          rejections[id].displayId + '.'
        );
      }
    }
  }
}

function logError(id: string, error: Error): Void {
  console.warn('Possible Unhandled Promise Rejection (id: ' + id + '):');
  var errStr: string = (error && (error.stack || error)) + '';
  errStr.split('\n').forEach(function (line: string) {
    console.warn('  ' + line);
  });
}

function matchWhitelist(error: object, list: any[]): boolean {
  return list.some(function (cls: string) {
    return error instanceof cls;
  });
}