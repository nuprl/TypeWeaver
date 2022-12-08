'use strict';
const {constants: BufferConstants} = require('buffer');
const stream: any = require('stream');
const {promisify} = require('util');
const bufferStream: any = require('./buffer-stream');

const streamPipelinePromisified: any = promisify(stream.pipeline);

class MaxBufferError extends Error {
	constructor() {
		super('maxBuffer exceeded');
		this.name = 'MaxBufferError';
	}
}

async function getStream(inputStream: any, options: any): Promise {
	if (!inputStream) {
		throw new Error('Expected a stream');
	}

	options = {
		maxBuffer: Infinity,
		...options
	};

	const {maxBuffer} = options;
	const stream: any = bufferStream(options);

	await new Promise((resolve: void, reject: void) => {
		const rejectPromise: any = (error: any) => {
			// Don't retrieve an oversized buffer.
			if (error && stream.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
				error.bufferedData = stream.getBufferedValue();
			}

			reject(error);
		};

		(async () => {
			try {
				await streamPipelinePromisified(inputStream, stream);
				resolve();
			} catch (error) {
				rejectPromise(error);
			}
		})();

		stream.on('data', () => {
			if (stream.getBufferedLength() > maxBuffer) {
				rejectPromise(new MaxBufferError());
			}
		});
	});

	return stream.getBufferedValue();
}

module.exports = getStream;
module.exports.buffer = (stream: any, options: any) => getStream(stream, {...options, encoding: 'buffer'});
module.exports.array = (stream: any, options: any) => getStream(stream, {...options, array: true});
module.exports.MaxBufferError = MaxBufferError;
