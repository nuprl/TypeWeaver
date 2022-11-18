'use strict';

const defaultExtension: any[] = require('./default-extension.js');
const testFileExtensions: string = defaultExtension
	.map((extension: any[]) => extension.slice(1))
	.join(',');

module.exports = [
	'coverage/**',
	'packages/*/test{,s}/**',
	'**/*.d.ts',
	'test{,s}/**',
	`test{,-*}.{${testFileExtensions}}`,
	`**/*{.,-}test.{${testFileExtensions}}`,
	'**/__tests__/**',

	/* Exclude common development tool configuration files */
	'**/{ava,babel,nyc}.config.{js,cjs,mjs}',
	'**/jest.config.{js,cjs,mjs,ts}',
	'**/{karma,rollup,webpack}.config.js',
	'**/.{eslint,mocha}rc.{js,cjs}'
];
