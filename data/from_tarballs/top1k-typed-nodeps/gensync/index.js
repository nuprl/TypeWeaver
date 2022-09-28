'use strict';

const awaitSymbol = Symbol('await');

function wait(promise) {
	promise[awaitSymbol] = true;
	return promise;	
}

function sync(g) {
	return function () {
		let args = Array.from(arguments);
		let it = g.apply(this, args);

		return new Promise((resolve, reject) => {
			let ret;
			(function iterate(val, err){
				try {
					ret = err ? it.throw(err) : it.next(val);
				} catch (e) {
					reject(e);
				}
		        if (ret.done === false) {
		            if (awaitSymbol in ret.value) {
		                ret.value.then(val => iterate(val)).catch(err => iterate(null, err));
		            }
		            else {
		                process.nextTick(() => iterate(ret.value));
		            }	         
		        } else if (ret.done) {
		        	resolve(ret.value);
		        } else {
		        	reject(err);
		        }
		    })();	
		});
	};
}

module.exports = {
	wait, sync
};