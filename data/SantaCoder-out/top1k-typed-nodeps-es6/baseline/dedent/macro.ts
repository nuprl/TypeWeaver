import { createMacro, MacroError } from 'babel-plugin-macros';
import dedent from './dedent.js';

export default createMacro(prevalMacros);

function prevalMacros({ references: refs, state: state, babel }: BabelState) {
  references.default.forEach(referencePath => {
    if (referencePath.parentPath.type === "TaggedTemplateExpression") {
      asTag(referencePath.parentPath.get("quasi"), state, babel);
    } else if (referencePath.parentPath.type === "CallExpression") {
      asFunction(referencePath.parentPath.get("arguments"), state, babel);
    } else {
      throw new MacroError(
        `dedent.macro can only be used as tagged template expression or function call. You tried ${
          referencePath.parentPath.type
        }.`
      );
    }
  });
}

function asTag(quasiPath: string, { file: { opts: { filename } } }: any, babel: any) {
  const string = quasiPath.parentPath.get("quasi").evaluate().value;
  const { types: t } = babel;

  quasiPath.parentPath.replaceWith(t.stringLiteral(dedent(string)));
}

function asFunction(argumentsPaths: string[], { file: { opts: { filename } } }: Babel.Options, babel: Babel.BabelOptions) {
  const string = argumentsPaths[0].evaluate().value;
  const { types: t } = babel;

  argumentsPaths[0].parentPath.replaceWith(t.stringLiteral(dedent(string)));
}