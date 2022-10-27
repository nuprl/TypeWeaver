export function detectNewline(string): string {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	const newlines: string[] = string.match(/(?:\r?\n)/g) || [];

	if (newlines.length === 0) {
		return;
	}

	const crlf: string[] = newlines.filter((newline: string) => newline === '\r\n').length;
	const lf: string = newlines.length - crlf;

	return crlf > lf ? '\r\n' : '\n';
}

export function detectNewlineGraceful(string): boolean {
	return (typeof string === 'string' && detectNewline(string)) || '\n';
}
