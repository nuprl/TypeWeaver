export default function slash(path: String): String {
	const isExtendedLengthPath: Number = /^\\\\\?\\/.test(path);
	const hasNonAscii: Boolean = /[^\u0000-\u0080]+/.test(path); // eslint-disable-line no-control-regex

	if (isExtendedLengthPath || hasNonAscii) {
		return path;
	}

	return path.replace(/\\/g, '/');
}
