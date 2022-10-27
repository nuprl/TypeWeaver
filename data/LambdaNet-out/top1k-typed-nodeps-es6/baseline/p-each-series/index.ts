const pEachSeries: HTMLElement = async (iterable: Object, iterator: Object) => {
	let index: Number = 0;

	for (const value of iterable) {
		// eslint-disable-next-line no-await-in-loop
		const returnValue: Number = await iterator(await value, index++);

		if (returnValue === pEachSeries.stop) {
			break;
		}
	}

	return iterable;
};

pEachSeries.stop = Symbol('pEachSeries.stop');

export default pEachSeries;
