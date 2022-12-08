var RetryOperation: any = require('./retry_operation');

exports.operation = function(options: any) {
  var timeouts: any = exports.timeouts(options);
  return new RetryOperation(timeouts, {
      forever: options && (options.forever || options.retries === Infinity),
      unref: options && options.unref,
      maxRetryTime: options && options.maxRetryTime
  });
};

exports.timeouts = function(options: any) {
  if (options instanceof Array) {
    return [].concat(options);
  }

  var opts: any = {
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
  timeouts.sort(function(a: any,b: any) {
    return a - b;
  });

  return timeouts;
};

exports.createTimeout = function(attempt: number, opts: any) {
  var random: number = (opts.randomize)
    ? (Math.random() + 1)
    : 1;

  var timeout: number = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
  timeout = Math.min(timeout, opts.maxTimeout);

  return timeout;
};

exports.wrap = function(obj: any, options: any, methods: any[]) {
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
    var method: any   = methods[i];
    var original: any = obj[method];

    obj[method] = function retryWrapper(original: any): void {
      var op: any       = exports.operation(options);
      var args: any     = Array.prototype.slice.call(arguments, 1);
      var callback: any = args.pop();

      args.push(function(err: any) {
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
