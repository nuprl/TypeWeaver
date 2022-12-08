import {readFileSync, promises as fs} from 'node:fs';

const {readFile} = fs;

const parse: Function = (buffer: object, {beforeParse, reviver} = {}) => {
	// Unlike `buffer.toString()` and `fs.readFile(path, 'utf8')`, `TextDecoder`` will remove BOM.
	let data = new TextDecoder().decode(buffer);

	if (typeof beforeParse === 'function') {
		data = beforeParse(data);
	}

	return JSON.parse(data, reviver);
};

export async function loadJsonFile(filePath: string, options: HTMLElement): any[] {
	const buffer: object = await readFile(filePath);
	return parse(buffer, options);
}

export function loadJsonFileSync(filePath: string, options: object): Promise {
	const buffer: object = readFileSync(filePath);
	return parse(buffer, options);
}
