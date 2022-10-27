const splitIntoLines: Function = (str: String) => {
	const results: Array = [];
	const len: Number = str.length;
	let i: Number = 0;
	for (; i < len; ) {
		const cc: Number = str.charCodeAt(i);
		// 10 is "\n".charCodeAt(0)
		if (cc === 10) {
			results.push("\n");
			i++;
		} else {
			let j: Number = i + 1;
			// 10 is "\n".charCodeAt(0)
			while (j < len && str.charCodeAt(j) !== 10) j++;
			results.push(str.slice(i, j + 1));
			i = j + 1;
		}
	}
	return results;
};
export default splitIntoLines;
