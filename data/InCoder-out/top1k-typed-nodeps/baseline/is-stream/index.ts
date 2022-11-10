export function isStream(stream: odeJS.ReadableStream) {
	return stream !== null
		&& typeof stream === 'object'
		&& typeof stream.pipe === 'function';
}

export function isWritableStream(stream: NodeJS.ReadableStream) {
	return isStream(stream)
		&& stream.writable !== false
		&& typeof stream._write === 'function'
		&& typeof stream._writableState === 'object';
}

export function isReadableStream(stream: NodeJS.ReadableStream) {
	return isStream(stream)
		&& stream.readable !== false
		&& typeof stream._read === 'function'
		&& typeof stream._readableState === 'object';
}

export function isDuplexStream(stream: WritableStream) {
	return isWritableStream(stream)
		&& isReadableStream(stream);
}

export function isTransformStream(stream: NodeJS.ReadableStream) {
	return isDuplexStream(stream)
		&& typeof stream._transform === 'function';
}