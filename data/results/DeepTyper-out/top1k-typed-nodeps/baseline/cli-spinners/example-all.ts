'use strict';
const readline: any = require('readline');
const logUpdate: any = require('log-update');
const cliSpinners: any = require('.');

const spinners: string[] = Object.keys(cliSpinners);
let frame: number = 0;
let spinner: number = 0;
let next: any;
let scrutator: any;

const showNextFrame: void = () => {
	const {frames} = cliSpinners[spinners[spinner]];
	logUpdate(frames[frame++ % frames.length] + ' ' + spinners[spinner]);
};

const showNextSpinner: void = () => {
	if (next) {
		clearInterval(next);
		spinner++;
	}

	if (spinner < spinners.length) {
		const s: any = cliSpinners[spinners[spinner]];
		next = setInterval(showNextFrame, s.interval);
		scrutator = setTimeout(showNextSpinner, Math.max(s.interval * s.frames.length, 1000));
	} else {
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(0);
	}
};

readline.emitKeypressEvents(process.stdin);

process.stdin.setRawMode(true);

process.stdin.on('keypress', (str: any, key: any) => {
	if (key.ctrl && key.name === 'c') {
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(130);
	}

	if (key.name === 'return') {
		if (scrutator) {
			clearTimeout(scrutator);
			showNextSpinner();
		}
	}
});

console.log(spinners.length + ' spinners\n');
showNextSpinner();

// $ node example-all.js
// Press `Enter` to skip to the next spinner
