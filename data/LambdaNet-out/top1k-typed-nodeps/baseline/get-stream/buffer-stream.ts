'use strict';
const {PassThrough: PassThroughStream} = require('stream');

module.exports = (options: Object) => {
	options = {...options};

	const {array} = options;
	let {encoding} = options;
	const isBuffer: Boolean = encoding === 'buffer';
	let objectMode: Boolean = false;

	if (array) {
		objectMode = !(encoding || isBuffer);
	} else {
		encoding = encoding || 'utf8';
	}

	if (isBuffer) {
		encoding = null;
	}

	const stream: Array = new PassThroughStream({objectMode});

	if (encoding) {
		stream.setEncoding(encoding);
	}

	let length: Number = 0;
	const chunks: Array = [];

	stream.on('data', (chunk: Array) => {
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
