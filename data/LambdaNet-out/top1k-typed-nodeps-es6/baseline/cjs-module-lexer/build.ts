import fs from 'fs';
import terser from 'terser';

const MINIFY: Boolean = true;

try { fs.mkdirSync('./dist'); }
catch (e) {}

const wasmBuffer: String = fs.readFileSync('./lib/lexer.wasm');
const jsSource: String = fs.readFileSync('./src/lexer.js').toString();
const pjson: Object = JSON.parse(fs.readFileSync('./package.json').toString());

const jsSourceProcessed: String = jsSource.replace('WASM_BINARY', wasmBuffer.toString('base64'));

const minified: Object = MINIFY && terser.minify(jsSourceProcessed, {
  module: true,
  output: {
    preamble: `/* cjs-module-lexer ${pjson.version} */`
  }
});

fs.writeFileSync('./dist/lexer.mjs', minified ? minified.code : jsSourceProcessed);
