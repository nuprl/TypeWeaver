'use strict';

import GetIntrinsic from 'get-intrinsic';
import callBound from 'call-bind/callBound';
import inspect from 'object-inspect';

var $TypeError: object = GetIntrinsic('%TypeError%');
var $WeakMap: object = GetIntrinsic('%WeakMap%', true);
var $Map: object = GetIntrinsic('%Map%', true);

var $weakMapGet: Function = callBound('WeakMap.prototype.get', true);
var $weakMapSet: Function = callBound('WeakMap.prototype.set', true);
var $weakMapHas: Function = callBound('WeakMap.prototype.has', true);
var $mapGet: Function = callBound('Map.prototype.get', true);
var $mapSet: Function = callBound('Map.prototype.set', true);
var $mapHas: Function = callBound('Map.prototype.has', true);

/*
* This function traverses the list returning the node corresponding to the given key.
*
* That node is also moved to the head of the list, so that if it's accessed again we don't need to traverse the whole list. By doing so, all the recently used nodes can be accessed relatively quickly.
*/
var listGetNode: Function = function (list: object, key: string) { // eslint-disable-line consistent-return
	for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
		if (curr.key === key) {
			prev.next = curr.next;
			curr.next = list.next;
			list.next = curr; // eslint-disable-line no-param-reassign
			return curr;
		}
	}
};

var listGet: Function = function (objects: any[], key: string) {
	var node: object = listGetNode(objects, key);
	return node && node.value;
};
var listSet: Function = function (objects: object, key: string, value: number) {
	var node: object = listGetNode(objects, key);
	if (node) {
		node.value = value;
	} else {
		// Prepend the new node to the beginning of the list
		objects.next = { // eslint-disable-line no-param-reassign
			key: key,
			next: objects.next,
			value: value
		};
	}
};
var listHas: Function = function (objects: any[], key: string) {
	return !!listGetNode(objects, key);
};

export default function getSideChannel(): object {
	var $wm: Function;
	var $m: string;
	var $o: object;
	var channel: object = {
		assert: function (key: string) {
			if (!channel.has(key)) {
				throw new $TypeError('Side channel does not contain ' + inspect(key));
			}
		},
		get: function (key: string) { // eslint-disable-line consistent-return
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapGet($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapGet($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listGet($o, key);
				}
			}
		},
		has: function (key: string) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapHas($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapHas($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listHas($o, key);
				}
			}
			return false;
		},
		set: function (key: string, value: string) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if (!$wm) {
					$wm = new $WeakMap();
				}
				$weakMapSet($wm, key, value);
			} else if ($Map) {
				if (!$m) {
					$m = new $Map();
				}
				$mapSet($m, key, value);
			} else {
				if (!$o) {
					// Initialize the linked list as an empty node, so that we don't have to special-case handling of the first node: we can always refer to it as (previous node).next, instead of something like (list).head
					$o = { key: {}, next: null };
				}
				listSet($o, key, value);
			}
		}
	};
	return channel;
};
