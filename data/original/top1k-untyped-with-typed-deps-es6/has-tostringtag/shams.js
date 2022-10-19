'use strict';

import hasSymbols from 'has-symbols/shams';

export default function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};
