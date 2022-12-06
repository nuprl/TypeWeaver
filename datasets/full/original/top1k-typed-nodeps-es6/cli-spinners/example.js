'use strict';
import logUpdate from 'log-update';
import cliSpinners from '.';

const spinner = cliSpinners[process.argv[2] || 'dots'];
let i = 0;

setInterval(() => {
	const {frames} = spinner;
	logUpdate(frames[i = ++i % frames.length] + ' Unicorns');
}, spinner.interval);

// $ node example.js nameOfSpinner
