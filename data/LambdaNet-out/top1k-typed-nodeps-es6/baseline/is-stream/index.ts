export function isStream(stream: String): Boolean {
	return stream !== null
		&& typeof stream === 'object'
		&& typeof stream.pipe === 'function';
}

export function isWritableStream(stream: String): Boolean {
	return isStream(stream)
		&& stream.writable !== false
		&& typeof stream._write === 'function'
		&& typeof stream._writableState === 'object';
}

export function isReadableStream(stream: String): Boolean {
	return isStream(stream)
		&& stream.readable !== false
		&& typeof stream._read === 'function'
		&& typeof stream._readableState === 'object';
}

export function isDuplexStream(stream: Array): Boolean {
	return isWritableStream(stream)
		&& isReadableStream(stream);
}

export function isTransformStream(stream: String): Boolean {
	return isDuplexStream(stream)
		&& typeof stream._transform === 'function';
}
