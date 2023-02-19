'use strict';

import implementation from './implementation';

export default function getPolyfill(): object {
	return typeof Object.is === 'function' ? Object.is : implementation;
};
