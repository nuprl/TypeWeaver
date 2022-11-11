export function detectNewline(string: ring | Buffer) {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	const newlines = string.match(/(?:\r?\n)/g) || [];

	if (newlines.length === 0) {
		return;
	}

	const crlf = newlines.filter(newline => newline === '\r\n').length;
	const lf = newlines.length - crlf;

	return crlf > lf ? '\r\n' : '\n';
}

export function detectNewlineGraceful(string: string | null | undefined) {
	return (typeof string === 'string' && detectNewline(string)) || '\n';
}