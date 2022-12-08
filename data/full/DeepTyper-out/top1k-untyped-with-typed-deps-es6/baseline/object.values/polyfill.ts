'use strict';

import implementation from './implementation';

export default function getPolyfill(): boolean {
	return typeof Object.values === 'function' ? Object.values : implementation;
};
