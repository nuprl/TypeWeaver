var retry: any = require('../lib/retry');

function attemptAsyncOperation(someInput: any, cb: any): void {
  var opts: any = {
    retries: 2,
    factor: 2,
    minTimeout: 1 * 1000,
    maxTimeout: 2 * 1000,
    randomize: true
  };
  var operation: any = retry.operation(opts);

  operation.attempt(function(currentAttempt: any) {
    failingAsyncOperation(someInput, function(err: any, result: any) {

      if (err && err.message === 'A fatal error') {
        operation.stop();
        return cb(err);
      }

      if (operation.retry(err)) {
        return;
      }

      cb(operation.mainError(), operation.errors(), result);
    });
  });
}

attemptAsyncOperation('test input', function(err: any, errors: any, result: any) {
  console.warn('err:');
  console.log(err);

  console.warn('result:');
  console.log(result);
});

function failingAsyncOperation(input: any, cb: any): any {
  return setImmediate(cb.bind(null, new Error('A fatal error')));
}
