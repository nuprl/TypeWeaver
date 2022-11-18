const pEachSeries: HTMLElement = async (iterable: object, iterator: object) => {
	let index: number = 0;

	for (const value of iterable) {
		// eslint-disable-next-line no-await-in-loop
		const returnValue: number = await iterator(await value, index++);

		if (returnValue === pEachSeries.stop) {
			break;
		}
	}

	return iterable;
};

pEachSeries.stop = Symbol('pEachSeries.stop');

export default pEachSeries;
