var isWin: Boolean = process.platform === 'win32';

export default function (str: String) {
	var i: Number = str.length - 1;
	if (i < 2) {
		return str;
	}
	while (isSeparator(str, i)) {
		i--;
	}
	return str.substr(0, i + 1);
};

function isSeparator(str: Object, i: Number): Boolean {
	var char: String = str[i];
	return i > 0 && (char === '/' || (isWin && char === '\\'));
}
