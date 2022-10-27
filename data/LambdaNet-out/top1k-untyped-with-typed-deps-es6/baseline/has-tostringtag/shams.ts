'use strict';

import hasSymbols from 'has-symbols/shams';

export default function hasToStringTagShams(): Boolean {
	return hasSymbols() && !!Symbol.toStringTag;
};
