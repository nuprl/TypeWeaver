import fs from 'fs';
import terser from 'terser';

const MINIFY: boolean = true;

try { fs.mkdirSync('./dist'); }
catch (e) {}

const wasmBuffer: string = fs.readFileSync('./lib/lexer.wasm');
const jsSource: string = fs.readFileSync('./src/lexer.js').toString();
const pjson: object = JSON.parse(fs.readFileSync('./package.json').toString());

const jsSourceProcessed: string = jsSource.replace('WASM_BINARY', wasmBuffer.toString('base64'));

const minified: object = MINIFY && terser.minify(jsSourceProcessed, {
  module: true,
  output: {
    preamble: `/* cjs-module-lexer ${pjson.version} */`
  }
});

fs.writeFileSync('./dist/lexer.mjs', minified ? minified.code : jsSourceProcessed);
