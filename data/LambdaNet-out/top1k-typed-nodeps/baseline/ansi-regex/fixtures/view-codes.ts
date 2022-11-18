import ansiCodes from './ansi-codes.js';
import ansiRegex from '../index.js';

const allCodes: object = {};
const supported: any[] = [];
const unsupported: any[] = [];

function addCodesToTest(codes: any[]): Void {
	for (const [key, value] of Object.entries(codes)) {
		allCodes[key] = value;
	}
}

function identifySupportedCodes(): Void {
	let codeSupport: Function = {};

	for (const [code, value] of Object.keys(allCodes)) {
		codeSupport = {
			code,
			matches: `\u001B${code}`.match(ansiRegex()),
			description: value[0]
		};

		if (codeSupport.matches !== null && codeSupport.matches[0] === `\u001B${code}`) {
			supported.push(codeSupport);
		} else {
			unsupported.push(codeSupport);
		}
	}
}

function displaySupport(): Void {
	process.stdout.write('\u001B[32m');

	console.log('SUPPORTED');
	for (const element of supported) {
		console.log(element);
	}

	process.stdout.write('\u001B[31m');
	console.log('UNSUPPORTED');

	for (const element of unsupported) {
		console.log(element);
	}

	process.stdout.write('\u001B[0m');
}

addCodesToTest(ansiCodes.vt52Codes);
addCodesToTest(ansiCodes.ansiCompatible);
addCodesToTest(ansiCodes.commonCodes);
addCodesToTest(ansiCodes.otherCodes);

identifySupportedCodes();
displaySupport();
