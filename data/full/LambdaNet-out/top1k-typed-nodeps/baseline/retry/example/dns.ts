var dns: string = require('dns');
var retry: string = require('../lib/retry');

function faultTolerantResolve(address: string, cb: Function): void {
  var opts: object = {
    retries: 2,
    factor: 2,
    minTimeout: 1 * 1000,
    maxTimeout: 2 * 1000,
    randomize: true
  };
  var operation: HTMLElement = retry.operation(opts);

  operation.attempt(function(currentAttempt: boolean) {
    dns.resolve(address, function(err: any[], addresses: number) {
      if (operation.retry(err)) {
        return;
      }

      cb(operation.mainError(), operation.errors(), addresses);
    });
  });
}

faultTolerantResolve('nodejs.org', function(err: string, errors: Function, addresses: number) {
  console.warn('err:');
  console.log(err);

  console.warn('addresses:');
  console.log(addresses);
});