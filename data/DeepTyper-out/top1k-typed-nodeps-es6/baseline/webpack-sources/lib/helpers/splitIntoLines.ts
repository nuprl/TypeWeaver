const splitIntoLines: any = (str: any) => {
	const results: any[] = [];
	const len: number = str.length;
	let i: number = 0;
	for (; i < len; ) {
		const cc: number = str.charCodeAt(i);
		// 10 is "\n".charCodeAt(0)
		if (cc === 10) {
			results.push("\n");
			i++;
		} else {
			let j: number = i + 1;
			// 10 is "\n".charCodeAt(0)
			while (j < len && str.charCodeAt(j) !== 10) j++;
			results.push(str.slice(i, j + 1));
			i = j + 1;
		}
	}
	return results;
};
export default splitIntoLines;
