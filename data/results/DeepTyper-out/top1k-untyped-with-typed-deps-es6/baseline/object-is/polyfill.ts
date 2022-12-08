'use strict';

import implementation from './implementation';

export default function getPolyfill(): any {
	return typeof Object.is === 'function' ? Object.is : implementation;
};
