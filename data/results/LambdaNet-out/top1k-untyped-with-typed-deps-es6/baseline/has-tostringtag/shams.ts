'use strict';

import hasSymbols from 'has-symbols/shams';

export default function hasToStringTagShams(): boolean {
	return hasSymbols() && !!Symbol.toStringTag;
};
