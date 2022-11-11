import {readFileSync, promises as fs} from 'node:fs';

const {readFile} = fs;

const parse = (buffer, {beforeParse, reviver} = {}) => {
	// Unlike `buffer.toString()` and `fs.readFile(path, 'utf8')`, `TextDecoder`` will remove BOM.
	let data = new TextDecoder().decode(buffer);

	if (typeof beforeParse === 'function') {
		data = beforeParse(data);
	}

	return JSON.parse(data, reviver);
};

export async function loadJsonFile(filePath: string | ArrayBuffer,  options: LoadJsonFileOptions) {
	const buffer = await readFile(filePath);
	return parse(buffer, options);
}

export function loadJsonFileSync(filePath: string | Buffer,  options: JsonFileOptions) {
	const buffer = readFileSync(filePath);
	return parse(buffer, options);
}