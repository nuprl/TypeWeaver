/* global jest */

const createMappingsSerializer: Function = jest.requireActual(
	"../createMappingsSerializer"
);

export default (options: object) => {
	const fn: Function = createMappingsSerializer(options);
	let lastLine: number = 1;
	let lastColumn: number = -1;
	return (
		generatedLine: number,
		generatedColumn: number,
		sourceIndex: number,
		originalLine: number,
		originalColumn: number,
		nameIndex: number
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
