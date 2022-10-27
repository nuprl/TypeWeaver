'use strict';

import implementation from './implementation';

export default function getPolyfill(): Object {
	return typeof Object.is === 'function' ? Object.is : implementation;
};
