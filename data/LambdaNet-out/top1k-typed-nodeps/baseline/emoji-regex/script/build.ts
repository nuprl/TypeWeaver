const fs: String = require('fs');

const input: String = fs.readFileSync('./src/index.js', 'utf8').toString().trim();
const pattern: String = fs.readFileSync('./node_modules/emoji-test-regex-pattern/dist/latest/javascript.txt', 'utf8').toString().trim();
const output: String = input.replace('<% pattern %>', pattern) + '\n';

fs.writeFileSync('./index.js', output);
