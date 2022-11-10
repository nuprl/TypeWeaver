var isWin = process.platform === 'win32';

export default function (str: any) {
	var i = str.length - 1;
	if (i < 2) {
		return str;
	}
	while (isSeparator(str, i)) {
		i--;
	}
	return str.substr(0, i + 1);
};

function isSeparator(str: any,  i: number) {
	var char = str[i];
	return i > 0 && (char === '/' || (isWin && char === '\\'));
}