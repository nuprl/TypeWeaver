import RetryOperation from './retry_operation';

export const operation: Function = function(options: object) {
  var timeouts: Function = timeouts(options);
  return new RetryOperation(timeouts, {
      forever: options && (options.forever || options.retries === Infinity),
      unref: options && options.unref,
      maxRetryTime: options && options.maxRetryTime
  });
};

export const timeouts: Function = function(options: object) {
  if (options instanceof Array) {
    return [].concat(options);
  }

  var opts: object = {
    retries: 10,
    factor: 2,
    minTimeout: 1 * 1000,
    maxTimeout: Infinity,
    randomize: false
  };
  for (var key in options) {
    opts[key] = options[key];
  }

  if (opts.minTimeout > opts.maxTimeout) {
    throw new Error('minTimeout is greater than maxTimeout');
  }

  var timeouts: any[] = [];
  for (var i = 0; i < opts.retries; i++) {
    timeouts.push(this.createTimeout(i, opts));
  }

  if (options && options.forever && !timeouts.length) {
    timeouts.push(this.createTimeout(i, opts));
  }

  // sort the array numerically ascending
  timeouts.sort(function(a: number,b: number) {
    return a - b;
  });

  return timeouts;
};

export const createTimeout: Function = function(attempt: number, opts: object) {
  var random: number = (opts.randomize)
    ? (Math.random() + 1)
    : 1;

  var timeout: number = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
  timeout = Math.min(timeout, opts.maxTimeout);

  return timeout;
};

export const wrap: Function = function(obj: object, options: any[], methods: any[]) {
  if (options instanceof Array) {
    methods = options;
    options = null;
  }

  if (!methods) {
    methods = [];
    for (var key in obj) {
      if (typeof obj[key] === 'function') {
        methods.push(key);
      }
    }
  }

  for (var i = 0; i < methods.length; i++) {
    var method: string   = methods[i];
    var original: string = obj[method];

    obj[method] = function retryWrapper(original: Function): void {
      var op: HTMLElement       = operation(options);
      var args: any[]     = Array.prototype.slice.call(arguments, 1);
      var callback: Function = args.pop();

      args.push(function(err: Function) {
        if (op.retry(err)) {
          return;
        }
        if (err) {
          arguments[0] = op.mainError();
        }
        callback.apply(this, arguments);
      });

      op.attempt(function() {
        original.apply(obj, args);
      });
    }.bind(obj, original);
    obj[method].options = options;
  }
};
