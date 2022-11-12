const fs: String = require('fs');
const terser: String = require('terser');

const MINIFY: Boolean = true;

try { fs.mkdirSync('./dist'); }
catch (e) {}

const wasmBuffer: String = fs.readFileSync('./lib/lexer.wasm');
const jsSource: String = fs.readFileSync('./src/lexer.js').toString();
const pjson: Object = JSON.parse(fs.readFileSync('./package.json').toString());

const jsSourceProcessed: String = jsSource.replace('WASM_BINARY', wasmBuffer.toString('base64'));

const minified: HTMLElement = MINIFY && terser.minify(jsSourceProcessed, {
  module: true,
  output: {
    preamble: `/* cjs-module-lexer ${pjson.version} */`
  }
});

fs.writeFileSync('./dist/lexer.mjs', minified ? minified.code : jsSourceProcessed);
