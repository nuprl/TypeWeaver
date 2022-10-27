import dns from 'dns';
import retry from '../lib/retry';

function faultTolerantResolve(address: String, cb: Function): Void {
  var opts: Object = {
    retries: 2,
    factor: 2,
    minTimeout: 1 * 1000,
    maxTimeout: 2 * 1000,
    randomize: true
  };
  var operation: HTMLElement = retry.operation(opts);

  operation.attempt(function(currentAttempt: Boolean) {
    dns.resolve(address, function(err: Array, addresses: Number) {
      if (operation.retry(err)) {
        return;
      }

      cb(operation.mainError(), operation.errors(), addresses);
    });
  });
}

faultTolerantResolve('nodejs.org', function(err: String, errors: Function, addresses: Number) {
  console.warn('err:');
  console.log(err);

  console.warn('addresses:');
  console.log(addresses);
});