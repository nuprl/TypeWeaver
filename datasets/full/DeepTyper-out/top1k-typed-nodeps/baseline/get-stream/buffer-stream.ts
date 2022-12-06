'use strict';
const {PassThrough: PassThroughStream} = require('stream');

module.exports = (options: any) => {
	options = {...options};

	const {array} = options;
	let {encoding} = options;
	const isBuffer: any = encoding === 'buffer';
	let objectMode: boolean = false;

	if (array) {
		objectMode = !(encoding || isBuffer);
	} else {
		encoding = encoding || 'utf8';
	}

	if (isBuffer) {
		encoding = null;
	}

	const stream: any = new PassThroughStream({objectMode});

	if (encoding) {
		stream.setEncoding(encoding);
	}

	let length: number = 0;
	const chunks: any[] = [];

	stream.on('data', (chunk: any) => {
		chunks.push(chunk);

		if (objectMode) {
			length = chunks.length;
		} else {
			length += chunk.length;
		}
	});

	stream.getBufferedValue = () => {
		if (array) {
			return chunks;
		}

		return isBuffer ? Buffer.concat(chunks, length) : chunks.join('');
	};

	stream.getBufferedLength = () => length;

	return stream;
};
