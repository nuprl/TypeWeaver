/* global jest */

const createMappingsSerializer: Function = jest.requireActual(
	"../createMappingsSerializer"
);

module.exports = (options: Object) => {
	const fn: Function = createMappingsSerializer(options);
	let lastLine: Number = 1;
	let lastColumn: Number = -1;
	return (
		generatedLine: Number,
		generatedColumn: Number,
		sourceIndex: Number,
		originalLine: Number,
		originalColumn: Number,
		nameIndex: Number
	) => {
		if (
			generatedLine >= lastLine &&
			generatedColumn > (generatedLine === lastLine ? lastColumn : -1) &&
			(sourceIndex === -1
				? originalLine === -1 && originalColumn === -1 && nameIndex === -1
				: sourceIndex >= 0 &&
				  originalLine >= 1 &&
				  originalColumn >= 0 &&
				  nameIndex >= -1)
		) {
			lastLine = generatedLine;
			lastColumn = generatedColumn;
			return fn(
				generatedLine,
				generatedColumn,
				sourceIndex,
				originalLine,
				originalColumn,
				nameIndex
			);
		}
		throw new Error(`Invalid mapping passed to mapping serializer:
generatedLine = ${generatedLine} (lastLine = ${lastLine}),
generatedColumn = ${generatedColumn} (lastColumn = ${lastColumn}),
sourceIndex = ${sourceIndex},
originalLine = ${originalLine},
originalColumn = ${originalColumn},
nameIndex = ${nameIndex}`);
	};
};
