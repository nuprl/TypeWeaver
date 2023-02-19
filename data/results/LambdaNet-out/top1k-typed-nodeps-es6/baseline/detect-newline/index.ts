export function detectNewline(string: string): string {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	const newlines: any[] = string.match(/(?:\r?\n)/g) || [];

	if (newlines.length === 0) {
		return;
	}

	const crlf: number = newlines.filter((newline: string) => newline === '\r\n').length;
	const lf: number = newlines.length - crlf;

	return crlf > lf ? '\r\n' : '\n';
}

export function detectNewlineGraceful(string: string): boolean {
	return (typeof string === 'string' && detectNewline(string)) || '\n';
}
