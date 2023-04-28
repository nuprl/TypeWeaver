var dns = require('dns');
var retry = require('../lib/retry');

function faultTolerantResolve(address: string, cb: any) {
  var opts = {
    retries: 2,
    factor: 2,
    minTimeout: 1 * 1000,
    maxTimeout: 2 * 1000,
    randomize: true
  };
  var operation = retry.operation(opts);

  operation.attempt(function(currentAttempt: number) {
    dns.resolve(address, function(err: Error, addresses: string[]) {
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