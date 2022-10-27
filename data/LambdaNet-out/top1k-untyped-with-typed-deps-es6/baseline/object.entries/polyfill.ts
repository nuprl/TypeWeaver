'use strict';

import implementation from './implementation';

export default function getPolyfill(): Object {
	return typeof Object.entries === 'function' ? Object.entries : implementation;
};
