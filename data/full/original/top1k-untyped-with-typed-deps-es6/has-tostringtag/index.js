'use strict';

import hasSymbols from 'has-symbols';

export default function hasToStringTag() {
	return hasSymbols() && typeof Symbol.toStringTag === 'symbol';
};
