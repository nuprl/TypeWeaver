'use strict';

import implementation from './implementation';

export default function getPolyfill(): Object {
	return typeof Object.values === 'function' ? Object.values : implementation;
};
