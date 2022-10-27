var dns: any = require('dns');
var retry: any = require('../lib/retry');

function faultTolerantResolve(address: string, cb: any): void {
  var opts: any = {
    retries: 2,
    factor: 2,
    minTimeout: 1 * 1000,
    maxTimeout: 2 * 1000,
    randomize: true
  };
  var operation: any = retry.operation(opts);

  operation.attempt(function(currentAttempt: any) {
    dns.resolve(address, function(err: any, addresses: any) {
      if (operation.retry(err)) {
        return;
      }

      cb(operation.mainError(), operation.errors(), addresses);
    });
  });
}

faultTolerantResolve('nodejs.org', function(err: any, errors: any, addresses: any) {
  console.warn('err:');
  console.log(err);

  console.warn('addresses:');
  console.log(addresses);
});