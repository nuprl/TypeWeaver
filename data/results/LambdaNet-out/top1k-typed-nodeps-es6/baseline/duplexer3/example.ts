#!/usr/bin/env node
import stream from 'node:stream';
import duplexer from './index.js';

const writable: HTMLElement = new stream.Writable({objectMode: true});
const readable: any[] = new stream.Readable({objectMode: true});

writable._write = function (input: HTMLInputElement, encoding: number, done: Function) {
	if (readable.push(input)) {
		return done();
	}

	readable.once('drain', done);
};

readable._read = function () {
	// Noop
};

// Simulate the readable thing closing after a bit
writable.once('finish', () => {
	setTimeout(() => {
		readable.push(null);
	}, 500);
});

const duplex: HTMLElement = duplexer(writable, readable);

duplex.on('data', (data: object) => {
	console.log('got data', JSON.stringify(data));
});

duplex.on('finish', () => {
	console.log('got finish event');
});

duplex.on('end', () => {
	console.log('got end event');
});

duplex.write('oh, hi there', () => {
	console.log('finished writing');
});

duplex.end(() => {
	console.log('finished ending');
});
