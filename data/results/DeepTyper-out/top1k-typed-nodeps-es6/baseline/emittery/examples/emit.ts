#!/usr/bin/env node
import Emittery from '../index.js';

const myEmitter: any = new Emittery();

// Register listener
myEmitter.on('event', () => {
	console.log('an event occurred!');
});

myEmitter.onAny((eventName: string) => {
	console.log('`%s` event occurred!', eventName);
});

// Emit event in next tick
myEmitter.emit('event');

// Prints:
// 		an event occurred!
// 		`event` event occurred!
