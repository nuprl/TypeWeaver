const YES_MATCH_SCORE_THRESHOLD: number = 2;
const NO_MATCH_SCORE_THRESHOLD: number = 1.25;

const yMatch: any = new Map([
	[5, 0.25],
	[6, 0.25],
	[7, 0.25],
	['t', 0.75],
	['y', 1],
	['u', 0.75],
	['g', 0.25],
	['h', 0.25],
	['j', 0.25],
]);

// eslint-disable-next-line unicorn/prevent-abbreviations
const eMatch: any = new Map([
	[2, 0.25],
	[3, 0.25],
	[4, 0.25],
	['w', 0.75],
	['e', 1],
	['r', 0.75],
	['s', 0.25],
	['d', 0.25],
	['f', 0.25],
]);

const sMatch: any = new Map([
	['q', 0.25],
	['w', 0.25],
	['e', 0.25],
	['a', 0.75],
	['s', 1],
	['d', 0.75],
	['z', 0.25],
	['x', 0.25],
	['c', 0.25],
]);

const nMatch: any = new Map([
	['h', 0.25],
	['j', 0.25],
	['k', 0.25],
	['b', 0.75],
	['n', 1],
	['m', 0.75],
]);

const oMatch: any = new Map([
	[9, 0.25],
	[0, 0.25],
	['i', 0.75],
	['o', 1],
	['p', 0.75],
	['k', 0.25],
	['l', 0.25],
]);

function getYesMatchScore(value: any): any {
	// eslint-disable-next-line unicorn/prevent-abbreviations
	const [y, e, s] = value;
	let score: number = 0;

	if (yMatch.has(y)) {
		score += yMatch.get(y);
	}

	if (eMatch.has(e)) {
		score += eMatch.get(e);
	}

	if (sMatch.has(s)) {
		score += sMatch.get(s);
	}

	return score;
}

function getNoMatchScore(value: string): any {
	const [n, o] = value;
	let score: number = 0;

	if (nMatch.has(n)) {
		score += nMatch.get(n);
	}

	if (oMatch.has(o)) {
		score += oMatch.get(o);
	}

	return score;
}

export default function lenient(input: string, default_: number): boolean {
	if (getYesMatchScore(input) >= YES_MATCH_SCORE_THRESHOLD) {
		return true;
	}

	if (getNoMatchScore(input) >= NO_MATCH_SCORE_THRESHOLD) {
		return false;
	}

	return default_;
}
