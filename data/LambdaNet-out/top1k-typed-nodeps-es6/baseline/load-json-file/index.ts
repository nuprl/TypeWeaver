import {readFileSync, promises as fs} from 'node:fs';

const {readFile} = fs;

const parse: Function = (buffer: Object, {beforeParse, reviver} = {}) => {
	// Unlike `buffer.toString()` and `fs.readFile(path, 'utf8')`, `TextDecoder`` will remove BOM.
	let data = new TextDecoder().decode(buffer);

	if (typeof beforeParse === 'function') {
		data = beforeParse(data);
	}

	return JSON.parse(data, reviver);
};

export async function loadJsonFile(filePath: String, options: HTMLElement): Array {
	const buffer: Object = await readFile(filePath);
	return parse(buffer, options);
}

export function loadJsonFileSync(filePath: String, options: Object): Promise {
	const buffer: Object = readFileSync(filePath);
	return parse(buffer, options);
}
