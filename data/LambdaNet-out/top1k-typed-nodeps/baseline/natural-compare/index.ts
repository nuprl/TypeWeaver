


/*
 * @version    1.4.0
 * @date       2015-10-26
 * @stability  3 - Stable
 * @author     Lauri Rooden (https://github.com/litejs/natural-compare-lite)
 * @license    MIT License
 */


var naturalCompare: Function = function(a: Number, b: Number) {
	var i: Number, codeA: Number
	, codeB: Number = 1
	, posA: Number = 0
	, posB: Number = 0
	, alphabet: Array = String.alphabet

	function getCode(str: String, pos: Number, code: Number): String {
		if (code) {
			for (i = pos; code = getCode(str, i), code < 76 && code > 65;) ++i;
			return +str.slice(pos - 1, i)
		}
		code = alphabet && alphabet.indexOf(str.charAt(pos))
		return code > -1 ? code + 76 : ((code = str.charCodeAt(pos) || 0), code < 45 || code > 127) ? code
			: code < 46 ? 65               // -
			: code < 48 ? code - 1
			: code < 58 ? code + 18        // 0-9
			: code < 65 ? code - 11
			: code < 91 ? code + 11        // A-Z
			: code < 97 ? code - 37
			: code < 123 ? code + 5        // a-z
			: code - 63
	}


	if ((a+="") != (b+="")) for (;codeB;) {
		codeA = getCode(a, posA++)
		codeB = getCode(b, posB++)

		if (codeA < 76 && codeB < 76 && codeA > 66 && codeB > 66) {
			codeA = getCode(a, posA, posA)
			codeB = getCode(b, posB, posA = i)
			posB = i
		}

		if (codeA != codeB) return (codeA < codeB) ? -1 : 1
	}
	return 0
}

try {
	module.exports = naturalCompare;
} catch (e) {
	String.naturalCompare = naturalCompare;
}
