'use strict';
const logUpdate: any = require('log-update');
const cliSpinners: any = require('.');

const spinner: any = cliSpinners[process.argv[2] || 'dots'];
let i: number = 0;

setInterval(() => {
	const {frames} = spinner;
	logUpdate(frames[i = ++i % frames.length] + ' Unicorns');
}, spinner.interval);

// $ node example.js nameOfSpinner
