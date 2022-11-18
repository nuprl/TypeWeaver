import stream from 'node:stream';

export function DuplexWrapper(options: object, writable: Request, readable: object): Void {
	if (typeof readable === 'undefined') {
		readable = writable;
		writable = options;
		options = undefined;
	}

	stream.Duplex.call(this, options);

	if (typeof readable.read !== 'function') {
		readable = (new stream.Readable(options)).wrap(readable);
	}

	this._writable = writable;
	this._readable = readable;
	this._waiting = false;

	writable.once('finish', () => {
		this.end();
	});

	this.once('finish', () => {
		writable.end();
	});

	readable.on('readable', () => {
		if (this._waiting) {
			this._waiting = false;
			this._read();
		}
	});

	readable.once('end', () => {
		this.push(null);
	});

	if (!options || typeof options.bubbleErrors === 'undefined' || options.bubbleErrors) {
		writable.on('error', (error: object) => {
			this.emit('error', error);
		});

		readable.on('error', (error: object) => {
			this.emit('error', error);
		});
	}
}

DuplexWrapper.prototype = Object.create(stream.Duplex.prototype, {constructor: {value: DuplexWrapper}});

DuplexWrapper.prototype._write = function (input: HTMLInputElement, encoding: string, done: string) {
	this._writable.write(input, encoding, done);
};

DuplexWrapper.prototype._read = function () {
	let buffer: Function;
	let readCount: number = 0;
	while ((buffer = this._readable.read()) !== null) {
		this.push(buffer);
		readCount++;
	}

	if (readCount === 0) {
		this._waiting = true;
	}
};

export default function duplexer(options: object, writable: object, readable: string): string {
	return new DuplexWrapper(options, writable, readable);
}
