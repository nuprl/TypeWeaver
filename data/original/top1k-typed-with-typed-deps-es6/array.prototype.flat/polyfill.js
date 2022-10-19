'use strict';

import implementation from './implementation';

export default function getPolyfill() {
	return Array.prototype.flat || implementation;
};
