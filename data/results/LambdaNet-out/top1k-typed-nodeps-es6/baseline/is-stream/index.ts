export function isStream(stream: string): boolean {
	return stream !== null
		&& typeof stream === 'object'
		&& typeof stream.pipe === 'function';
}

export function isWritableStream(stream: string): boolean {
	return isStream(stream)
		&& stream.writable !== false
		&& typeof stream._write === 'function'
		&& typeof stream._writableState === 'object';
}

export function isReadableStream(stream: string): boolean {
	return isStream(stream)
		&& stream.readable !== false
		&& typeof stream._read === 'function'
		&& typeof stream._readableState === 'object';
}

export function isDuplexStream(stream: any[]): boolean {
	return isWritableStream(stream)
		&& isReadableStream(stream);
}

export function isTransformStream(stream: string): boolean {
	return isDuplexStream(stream)
		&& typeof stream._transform === 'function';
}
