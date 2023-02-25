import dns from 'dns';
import retry from '../lib/retry';

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
    dns.resolve(address, function(err: Error, addresses: Address[]) {
      if (operation.retry(err)) {
        return;
      }

      cb(operation.mainError(), operation.errors(), addresses);
    });
  });
}

faultTolerantResolve('nodejs.org', function(err: Error, errors: Error[], addresses: string[]) {
  console.warn('err:');
  console.log(err);

  console.warn('addresses:');
  console.log(addresses);
});