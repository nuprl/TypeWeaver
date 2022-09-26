# GenSync
## Async-Await for the modern Node, using generators!

```js
'use strict';

const A = require('gensync');

const resolvedPromise = () => Promise.resolve(5);
const rejectedPromise = () => Promise.reject(5);


const add = A.sync(function* (a, b) {
	let val = yield A.wait(resolvedPromise());
	try {
		val += a + b;
		val += yield A.wait(rejectedPromise());
	} catch (err) {
		if (err === 5) {
			val -= err;
		} else {
			val = 'meow';
		}
	}
	return val;
});

const main = A.sync(function* () {
	console.log(yield A.wait(add(2, 7)));
});

main(); // 9
```