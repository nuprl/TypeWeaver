import retry from '../lib/retry';

function attemptAsyncOperation(someInput: Element, cb: Function): Void {
  var opts: object = {
    retries: 2,
    factor: 2,
    minTimeout: 1 * 1000,
    maxTimeout: 2 * 1000,
    randomize: true
  };
  var operation: HTMLElement = retry.operation(opts);

  operation.attempt(function(currentAttempt: boolean) {
    failingAsyncOperation(someInput, function(err: Error, result: any[]) {

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

attemptAsyncOperation('test input', function(err: string, errors: Function, result: Function) {
  console.warn('err:');
  console.log(err);

  console.warn('result:');
  console.log(result);
});

function failingAsyncOperation(input: HTMLInputElement, cb: Function): number {
  return setImmediate(cb.bind(null, new Error('A fatal error')));
}
