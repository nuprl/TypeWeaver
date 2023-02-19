var regenerate: Function = require('regenerate');
var fs: string = require('fs');

// Characters with special meaning in CSS, except for quotes and backslashes
// (they get a separate regex)
var set: any[] = regenerate().add(
	' ', '!', '#', '$', '%', '&', '(', ')', '*', '+', ',', '.', '/', ';', '<', ':',
	'=', '>', '?', '@', '[', ']', '^', '`', '{', '|', '}', '~', '"', '\'', '\\'
);

module.exports = {
	'anySingleEscape': set.toString(),
	'singleEscapes': set.remove('\\').toString(),
	'version': JSON.parse(fs.readFileSync('package.json', 'utf8')).version
};
