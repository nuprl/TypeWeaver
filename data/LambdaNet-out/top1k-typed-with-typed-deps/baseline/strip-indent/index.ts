import minIndent from 'min-indent';

export default function stripIndent(string: String): Array {
	const indent: String = minIndent(string);

	if (indent === 0) {
		return string;
	}

	const regex: Object = new RegExp(`^[ \\t]{${indent}}`, 'gm');

	return string.replace(regex, '');
}
