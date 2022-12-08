#!/usr/bin/env node
import process from 'node:process';
import Emittery from '../index.js';

class Clock extends Emittery {
	constructor() {
		super();
		this.startedAt = 0;
		this.timer = null;
	}

	tick() {
		if (!this.timer) {
			this.emit('error', new Error('Clock has not been started'));
			return;
		}

		const now: number = Date.now();
		const duration: number = now - this.startedAt;

		this.emit('tick', {duration, now});
	}

	start() {
		if (this.timer) {
			throw new Error('Clock has already been started');
		}

		this.startedAt = Date.now();
		this.timer = setInterval(this.tick.bind(this), 1000);

		this.emit('start');
	}

	stop() {
		if (this.timer) {
			clearInterval(this.timer);
		}

		this.startedAt = 0;
		this.timer = null;

		this.emit('stop');
	}
}

function onTick({duration}) {
	console.log(Math.floor(duration / 1000));

	if (duration >= 6000) {
		stop();
	}
}

function onError(error: any): void {
	process.exitCode = 1;
	console.error(error);
	stop();
}

const timer: any = new Clock();
const offTick: any = timer.on('tick', onTick);
const offError: any = timer.on('error', onError);

function stop(): void {
	offTick();
	offError();
	timer.stop();
}

timer.start();
// Prints:
// 		1
// 		2
// 		3
// 		4
// 		5
// 		6
