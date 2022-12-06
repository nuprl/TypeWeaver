'use strict';

import implementation from './implementation';

export default function getPolyfill(): object {
	return typeof Object.values === 'function' ? Object.values : implementation;
};
