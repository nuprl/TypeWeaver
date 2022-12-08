export default function stripFinalNewline(input: string): boolean {
	const LF: string = typeof input === 'string' ? '\n' : '\n'.charCodeAt();
	const CR: number = typeof input === 'string' ? '\r' : '\r'.charCodeAt();

	if (input[input.length - 1] === LF) {
		input = input.slice(0, -1);
	}

	if (input[input.length - 1] === CR) {
		input = input.slice(0, -1);
	}

	return input;
}
