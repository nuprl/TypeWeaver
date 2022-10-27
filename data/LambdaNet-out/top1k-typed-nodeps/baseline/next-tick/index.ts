'use strict';

var ensureCallable: Function = function (fn: String) {
	if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
	return fn;
};

var byObserver: Function = function (Observer: Object) {
	var node: Error = document.createTextNode(''), queue: Array, currentQueue: Array, bit: Number = 0, i: Number = 0;
	new Observer(function () {
		var callback: Function;
		if (!queue) {
			if (!currentQueue) return;
			queue = currentQueue;
		} else if (currentQueue) {
			queue = currentQueue.slice(i).concat(queue);
		}
		currentQueue = queue;
		queue = null;
		i = 0;
		if (typeof currentQueue === 'function') {
			callback = currentQueue;
			currentQueue = null;
			callback();
			return;
		}
		node.data = (bit = ++bit % 2); // Invoke other batch, to handle leftover callbacks in case of crash
		while (i < currentQueue.length) {
			callback = currentQueue[i];
			i++;
			if (i === currentQueue.length) currentQueue = null;
			callback();
		}
	}).observe(node, { characterData: true });
	return function (fn: Array) {
		ensureCallable(fn);
		if (queue) {
			if (typeof queue === 'function') queue = [queue, fn];
			else queue.push(fn);
			return;
		}
		queue = fn;
		node.data = (bit = ++bit % 2);
	};
};

module.exports = (function () {
	// Node.js
	if ((typeof process === 'object') && process && (typeof process.nextTick === 'function')) {
		return process.nextTick;
	}

	// queueMicrotask
	if (typeof queueMicrotask === "function") {
		return function (cb: Array) { queueMicrotask(ensureCallable(cb)); };
	}

	// MutationObserver
	if ((typeof document === 'object') && document) {
		if (typeof MutationObserver === 'function') return byObserver(MutationObserver);
		if (typeof WebKitMutationObserver === 'function') return byObserver(WebKitMutationObserver);
	}

	// W3C Draft
	// http://dvcs.w3.org/hg/webperf/raw-file/tip/specs/setImmediate/Overview.html
	if (typeof setImmediate === 'function') {
		return function (cb: Array) { setImmediate(ensureCallable(cb)); };
	}

	// Wide available standard
	if ((typeof setTimeout === 'function') || (typeof setTimeout === 'object')) {
		return function (cb: Array) { setTimeout(ensureCallable(cb), 0); };
	}

	return null;
}());
