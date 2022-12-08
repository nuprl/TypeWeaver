'use strict';

import hasSymbols from 'has-symbols';

export default function hasToStringTag(): boolean {
	return hasSymbols() && typeof Symbol.toStringTag === 'symbol';
};
