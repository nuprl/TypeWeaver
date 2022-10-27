export function detectNewline(string: String): String {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	const newlines: Array = string.match(/(?:\r?\n)/g) || [];

	if (newlines.length === 0) {
		return;
	}

	const crlf: Number = newlines.filter((newline: String) => newline === '\r\n').length;
	const lf: Number = newlines.length - crlf;

	return crlf > lf ? '\r\n' : '\n';
}

export function detectNewlineGraceful(string: String): Boolean {
	return (typeof string === 'string' && detectNewline(string)) || '\n';
}
