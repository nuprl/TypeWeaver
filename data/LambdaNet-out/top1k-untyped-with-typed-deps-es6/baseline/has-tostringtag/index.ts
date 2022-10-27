'use strict';

import hasSymbols from 'has-symbols';

export default function hasToStringTag(): Boolean {
	return hasSymbols() && typeof Symbol.toStringTag === 'symbol';
};
