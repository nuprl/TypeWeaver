import {readFileSync, promises as fs} from 'node:fs';

const {readFile} = fs;

const parse: any = (buffer, {beforeParse, reviver} = {}) => {
	// Unlike `buffer.toString()` and `fs.readFile(path, 'utf8')`, `TextDecoder`` will remove BOM.
	let data: any = new TextDecoder().decode(buffer);

	if (typeof beforeParse === 'function') {
		data = beforeParse(data);
	}

	return JSON.parse(data, reviver);
};

export async function loadJsonFile(filePath: string, options: any): any {
	const buffer: any = await readFile(filePath);
	return parse(buffer, options);
}

export function loadJsonFileSync(filePath: string, options: any): any {
	const buffer: any = readFileSync(filePath);
	return parse(buffer, options);
}
