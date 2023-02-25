export function isStream(stream: any) {
	return stream !== null
		&& typeof stream === 'object'
		&& typeof stream.pipe === 'function';
}

export function isWritableStream(stream: Readable) {
	return isStream(stream)
		&& stream.writable !== false
		&& typeof stream._write === 'function'
		&& typeof stream._writableState === 'object';
}

export function isReadableStream(stream: ReadableStream) {
	return isStream(stream)
		&& stream.readable !== false
		&& typeof stream._read === 'function'
		&& typeof stream._readableState === 'object';
}

export function isDuplexStream(stream: Readable) {
	return isWritableStream(stream)
		&& isReadableStream(stream);
}

export function isTransformStream(stream: Readable) {
	return isDuplexStream(stream)
		&& typeof stream._transform === 'function';
}