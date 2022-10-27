export default function trimNewlines(string: Array): String {
	let start: Number = 0;
	let end: Number = string.length;

	while (start < end && (string[start] === '\r' || string[start] === '\n')) {
		start++;
	}

	while (end > start && (string[end - 1] === '\r' || string[end - 1] === '\n')) {
		end--;
	}

	return (start > 0 || end < string.length) ? string.slice(start, end) : string;
}

trimNewlines.start = (string: Array) => {
	const end: Number = string.length;
	let start: Number = 0;

	while (start < end && (string[start] === '\r' || string[start] === '\n')) {
		start++;
	}

	return start > 0 ? string.slice(start, end) : string;
};

trimNewlines.end = (string: Array) => {
	let end: Number = string.length;

	while (end > 0 && (string[end - 1] === '\r' || string[end - 1] === '\n')) {
		end--;
	}

	return end < string.length ? string.slice(0, end) : string;
};
