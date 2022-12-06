import regenerate from 'regenerate';
import fs from 'fs';

// Characters with special meaning in CSS, except for quotes and backslashes
// (they get a separate regex)
var set = regenerate().add(
	' ', '!', '#', '$', '%', '&', '(', ')', '*', '+', ',', '.', '/', ';', '<', ':',
	'=', '>', '?', '@', '[', ']', '^', '`', '{', '|', '}', '~', '"', '\'', '\\'
);

export default {
	'anySingleEscape': set.toString(),
	'singleEscapes': set.remove('\\').toString(),
	'version': JSON.parse(fs.readFileSync('package.json', 'utf8')).version
};
