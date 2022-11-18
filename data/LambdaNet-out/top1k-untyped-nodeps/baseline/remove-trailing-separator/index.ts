var isWin: boolean = process.platform === 'win32';

module.exports = function (str: string) {
	var i: number = str.length - 1;
	if (i < 2) {
		return str;
	}
	while (isSeparator(str, i)) {
		i--;
	}
	return str.substr(0, i + 1);
};

function isSeparator(str: object, i: number): boolean {
	var char: string = str[i];
	return i > 0 && (char === '/' || (isWin && char === '\\'));
}
