/* globals bench, set */
import fs from 'node:fs';
import stripJsonComments from './index.js';

const json: any = fs.readFileSync('sample.json', 'utf8');
const bigJson: any = fs.readFileSync('sample-big.json', 'utf8');

bench('strip JSON comments', () => {
	set('type', 'static');
	stripJsonComments(json);
});

bench('strip JSON comments without whitespace', () => {
	stripJsonComments(json, {whitespace: false});
});

bench('strip Big JSON comments', () => {
	stripJsonComments(bigJson);
});
