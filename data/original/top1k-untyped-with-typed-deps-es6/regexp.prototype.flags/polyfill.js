'use strict';

import implementation from './implementation';
import { supportsDescriptors } from 'define-properties';
var $gOPD = Object.getOwnPropertyDescriptor;

export default function getPolyfill() {
	if (supportsDescriptors && (/a/mig).flags === 'gim') {
		var descriptor = $gOPD(RegExp.prototype, 'flags');
		if (
			descriptor
			&& typeof descriptor.get === 'function'
			&& typeof RegExp.prototype.dotAll === 'boolean'
			&& typeof RegExp.prototype.hasIndices === 'boolean'
		) {
			/* eslint getter-return: 0 */
			var calls = '';
			var o = {};
			Object.defineProperty(o, 'hasIndices', {
				get: function () {
					calls += 'd';
				}
			});
			Object.defineProperty(o, 'sticky', {
				get: function () {
					calls += 'y';
				}
			});
			if (calls === 'dy') {
				return descriptor.get;
			}
		}
	}
	return implementation;
};
