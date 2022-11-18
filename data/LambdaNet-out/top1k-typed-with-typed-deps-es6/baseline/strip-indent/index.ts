import minIndent from 'min-indent';

export default function stripIndent(string: string): any[] {
	const indent: string = minIndent(string);

	if (indent === 0) {
		return string;
	}

	const regex: object = new RegExp(`^[ \\t]{${indent}}`, 'gm');

	return string.replace(regex, '');
}
