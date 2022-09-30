"use strict";

// copy/pasted, and adjusted, from: https://github.com/acornjs/acorn-class-fields/blob/master/run_test262.js

import path from 'path';
import run from 'test262-parser-runner';
import acorn from 'acorn';
const Parser: any = acorn.Parser.extend(require(".").importAssertions);

const unsupportedFeatures: any[] = [];

const implementedFeatures: string[] = ["import-assertions", "json-modules"];

const whitelist: string[] = [
  // 10 invalid programs did not produce a parsing error (without a corresponding entry in the whitelist file):
  "language/import/json-invalid.js (default)",
  "language/import/json-invalid.js (strict mode)",
  "language/import/json-named-bindings.js (default)",
  "language/import/json-named-bindings.js (strict mode)",
  "language/module-code/early-dup-assert-key-export.js (default)",
  "language/module-code/early-dup-assert-key-export.js (strict mode)",
  "language/module-code/early-dup-assert-key-import-nobinding.js (default)",
  "language/module-code/early-dup-assert-key-import-nobinding.js (strict mode)",
  "language/module-code/early-dup-assert-key-import-withbinding.js (default)",
  "language/module-code/early-dup-assert-key-import-withbinding.js (strict mode)",

  // 113 valid programs produced a parsing error (without a corresponding entry in the whitelist file):
  "language/module-code/import-assertion-newlines.js (default)",
  "language/module-code/import-assertion-newlines.js (strict mode)",
  "language/expressions/dynamic-import/2nd-param-assert-enumeration-abrupt.js (default)",
  "language/expressions/dynamic-import/2nd-param-assert-enumeration-abrupt.js (strict mode)",
  "language/expressions/dynamic-import/2nd-param-assert-enumeration.js (default)",
  "language/expressions/dynamic-import/2nd-param-assert-enumeration.js (strict mode)",
  "language/expressions/dynamic-import/2nd-param-await-expr.js (default)",
  "language/expressions/dynamic-import/2nd-param-await-expr.js (strict mode)",
  "language/expressions/dynamic-import/2nd-param-await-ident.js (default)",
  "language/expressions/dynamic-import/2nd-param-await-ident.js (strict mode)",
  "language/expressions/dynamic-import/2nd-param-evaluation-abrupt-return.js (default)",
  "language/expressions/dynamic-import/2nd-param-evaluation-abrupt-return.js (strict mode)",
  "language/expressions/dynamic-import/2nd-param-evaluation-abrupt-throw.js (default)",
  "language/expressions/dynamic-import/2nd-param-evaluation-abrupt-throw.js (strict mode)",
  "language/expressions/dynamic-import/2nd-param-evaluation-sequence.js (default)",
  "language/expressions/dynamic-import/2nd-param-evaluation-sequence.js (strict mode)",
  "language/expressions/dynamic-import/2nd-param-get-assert-error.js (default)",
  "language/expressions/dynamic-import/2nd-param-get-assert-error.js (strict mode)",
  "language/expressions/dynamic-import/2nd-param-in.js (default)",
  "language/expressions/dynamic-import/2nd-param-in.js (strict mode)",
  "language/expressions/dynamic-import/2nd-param-non-object.js (default)",
  "language/expressions/dynamic-import/2nd-param-non-object.js (strict mode)",
  "language/expressions/dynamic-import/2nd-param-trailing-comma-fulfill.js (default)",
  "language/expressions/dynamic-import/2nd-param-trailing-comma-fulfill.js (strict mode)",
  "language/expressions/dynamic-import/2nd-param-trailing-comma-reject.js (default)",
  "language/expressions/dynamic-import/2nd-param-trailing-comma-reject.js (strict mode)",
  "language/expressions/dynamic-import/2nd-param-yield-expr.js (default)",
  "language/expressions/dynamic-import/2nd-param-yield-expr.js (strict mode)",
  "language/expressions/dynamic-import/2nd-param-yield-ident-valid.js (default)",
  "language/expressions/dynamic-import/trailing-comma-fulfill.js (default)",
  "language/expressions/dynamic-import/trailing-comma-fulfill.js (strict mode)",
  "language/expressions/dynamic-import/trailing-comma-reject.js (default)",
  "language/expressions/dynamic-import/trailing-comma-reject.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-arrow-assignment-expression-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-arrow-assignment-expression-trailing-comma-first.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-arrow-assignment-expression-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-arrow-assignment-expression-trailing-comma-second.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-arrow-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-arrow-trailing-comma-first.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-arrow-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-arrow-trailing-comma-second.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-arrow-function-await-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-arrow-function-await-trailing-comma-first.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-arrow-function-await-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-arrow-function-await-trailing-comma-second.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-arrow-function-return-await-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-arrow-function-return-await-trailing-comma-first.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-arrow-function-return-await-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-arrow-function-return-await-trailing-comma-second.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-function-await-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-function-await-trailing-comma-first.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-function-await-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-function-await-trailing-comma-second.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-function-return-await-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-function-return-await-trailing-comma-first.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-function-return-await-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-function-return-await-trailing-comma-second.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-function-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-function-trailing-comma-first.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-function-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-function-trailing-comma-second.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-gen-await-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-gen-await-trailing-comma-first.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-gen-await-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-async-gen-await-trailing-comma-second.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-block-labeled-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-block-labeled-trailing-comma-first.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-block-labeled-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-block-labeled-trailing-comma-second.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-block-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-block-trailing-comma-first.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-block-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-block-trailing-comma-second.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-do-while-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-do-while-trailing-comma-first.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-do-while-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-do-while-trailing-comma-second.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-else-braceless-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-else-braceless-trailing-comma-first.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-else-braceless-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-else-braceless-trailing-comma-second.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-else-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-else-trailing-comma-first.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-else-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-else-trailing-comma-second.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-function-return-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-function-return-trailing-comma-first.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-function-return-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-function-return-trailing-comma-second.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-function-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-function-trailing-comma-first.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-function-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-function-trailing-comma-second.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-if-braceless-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-if-braceless-trailing-comma-first.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-if-braceless-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-if-braceless-trailing-comma-second.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-if-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-if-trailing-comma-first.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-if-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-if-trailing-comma-second.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-while-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-while-trailing-comma-first.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-while-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-while-trailing-comma-second.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/nested-with-expression-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-with-expression-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-with-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/nested-with-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/top-level-trailing-comma-first.js (default)",
  "language/expressions/dynamic-import/syntax/valid/top-level-trailing-comma-first.js (strict mode)",
  "language/expressions/dynamic-import/syntax/valid/top-level-trailing-comma-second.js (default)",
  "language/expressions/dynamic-import/syntax/valid/top-level-trailing-comma-second.js (strict mode)",
];

run(
  (content: string, options: any) =>
    Parser.parse(content, { sourceType: options.sourceType, ecmaVersion: 13 }),
  {
    testsDirectory: path.dirname(require.resolve("test262/package.json")),
    skip: (test: any) =>
      !test.attrs.features ||
      !implementedFeatures.some((f: string) => test.attrs.features.includes(f)) ||
      unsupportedFeatures.some((f: string) => test.attrs.features.includes(f)),
    whitelist,
  }
);
