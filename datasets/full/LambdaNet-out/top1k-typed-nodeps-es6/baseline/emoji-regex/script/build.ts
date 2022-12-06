import fs from 'fs';

const input: string = fs.readFileSync('./src/index.js', 'utf8').toString().trim();
const pattern: string = fs.readFileSync('./node_modules/emoji-test-regex-pattern/dist/latest/javascript.txt', 'utf8').toString().trim();
const output: string = input.replace('<% pattern %>', pattern) + '\n';

fs.writeFileSync('./index.js', output);
