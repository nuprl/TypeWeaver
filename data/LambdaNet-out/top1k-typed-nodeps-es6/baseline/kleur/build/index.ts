import fs from 'fs';

function transform(file: String, next: String): Void {
	console.log('convert "%s" ~> "%s"', file, next);

	let code: String = fs.readFileSync(file, 'utf8');
	code = code.replace('export default', 'module.exports =');
	code = code.replace(/export const /g, 'exports.');
	code = code.replace('exports.$ =', 'const $ = exports.$ =');
	fs.writeFileSync(next, code, 'utf8');
}

transform('index.mjs', 'index.js');
transform('colors.mjs', 'colors.js');
