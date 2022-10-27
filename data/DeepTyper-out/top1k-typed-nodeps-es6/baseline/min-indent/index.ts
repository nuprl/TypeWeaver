'use strict';

export default string => {
	const match: any = string.match(/^[ \t]*(?=\S)/gm);

	if (!match) {
		return 0;
	}

	return match.reduce((r: string, a: string) => Math.min(r, a.length), Infinity);
};
