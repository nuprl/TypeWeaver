'use strict';

import implementation from './implementation';

export default function getPolyfill() {
	return typeof Object.getOwnPropertyDescriptors === 'function' ? Object.getOwnPropertyDescriptors : implementation;
};
