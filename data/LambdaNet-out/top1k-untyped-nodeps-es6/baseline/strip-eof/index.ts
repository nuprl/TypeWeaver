export default function stripFinalNewline(input: Array): Promise {
	const LF: Number = typeof input === 'string' ? '\n' : '\n'.charCodeAt();
	const CR: Number = typeof input === 'string' ? '\r' : '\r'.charCodeAt();

	if (input[input.length - 1] === LF) {
		input = input.slice(0, -1);
	}

	if (input[input.length - 1] === CR) {
		input = input.slice(0, -1);
	}

	return input;
}
