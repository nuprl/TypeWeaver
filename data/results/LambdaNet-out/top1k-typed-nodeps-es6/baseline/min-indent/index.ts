'use strict';

export default (string: string) => {
	const match: any[] = string.match(/^[ \t]*(?=\S)/gm);

	if (!match) {
		return 0;
	}

	return match.reduce((r: number, a: any[]) => Math.min(r, a.length), Infinity);
};
