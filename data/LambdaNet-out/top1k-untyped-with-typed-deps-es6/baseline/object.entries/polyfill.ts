'use strict';

import implementation from './implementation';

export default function getPolyfill(): object {
	return typeof Object.entries === 'function' ? Object.entries : implementation;
};
