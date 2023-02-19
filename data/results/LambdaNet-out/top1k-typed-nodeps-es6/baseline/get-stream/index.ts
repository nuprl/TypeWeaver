'use strict';
import { constants as BufferConstants } from 'buffer';
import stream from 'stream';
import { promisify } from 'util';
import bufferStream from './buffer-stream';

const streamPipelinePromisified: Function = promisify(stream.pipeline);

class MaxBufferError extends Error {
	constructor() {
		super('maxBuffer exceeded');
		this.name = 'MaxBufferError';
	}
}

async function getStream(inputStream: boolean, options: object): HTMLElement {
	if (!inputStream) {
		throw new Error('Expected a stream');
	}

	options = {
		maxBuffer: Infinity,
		...options
	};

	const {maxBuffer} = options;
	const stream: string = bufferStream(options);

	await new Promise((resolve: Function, reject: Function) => {
		const rejectPromise: Function = (error: object) => {
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
module.exports.buffer = (stream: object, options: object) => getStream(stream, {...options, encoding: 'buffer'});
module.exports.array = (stream: object, options: object) => getStream(stream, {...options, array: true});
module.exports.MaxBufferError = MaxBufferError;
