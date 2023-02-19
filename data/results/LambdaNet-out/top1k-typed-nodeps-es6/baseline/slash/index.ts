export default function slash(path: string): string {
	const isExtendedLengthPath: number = /^\\\\\?\\/.test(path);
	const hasNonAscii: boolean = /[^\u0000-\u0080]+/.test(path); // eslint-disable-line no-control-regex

	if (isExtendedLengthPath || hasNonAscii) {
		return path;
	}

	return path.replace(/\\/g, '/');
}
