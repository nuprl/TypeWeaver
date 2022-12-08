import minIndent from 'min-indent';

export default function stripIndent(string): string {
	const indent: string = minIndent(string);

	if (indent === 0) {
		return string;
	}

	const regex: RegExp = new RegExp(`^[ \\t]{${indent}}`, 'gm');

	return string.replace(regex, '');
}
