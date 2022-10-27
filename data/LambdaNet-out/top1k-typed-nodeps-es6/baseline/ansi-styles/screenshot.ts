import process from 'node:process';
import ansiStyles from './index.js';

const width: Number = 55;
let lineLength: Number = 0;

for (const [key, value] of Object.entries(ansiStyles)) {
	let code: String = value.open;
	let projectedLength: Number = lineLength + key.length + 1;

	// We skip `overline` as almost no terminal supports it so we cannot show it off.
	if (
		key === 'reset'
			|| key === 'hidden'
			|| key === 'grey'
			|| key === 'bgGray'
			|| key === 'bgGrey'
			|| key === 'overline'
			|| key.endsWith('Bright')
	) {
		continue;
	}

	if (/^bg[^B]/.test(key)) {
		code = ansiStyles.black.open + code;
	}

	if (width < projectedLength) {
		process.stdout.write('\n');
		lineLength = 0;
		projectedLength = key.length + 1;
	}

	process.stdout.write(code + key + ansiStyles.reset.close + ' ');
	lineLength = projectedLength;
}
