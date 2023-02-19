import generate from '@babel/generator';
import t from '@babel/types';

function generateCode(programStatements) {
  let { code } = generate(t.program(programStatements), { minified: true })

  return `${code}\n`
}

export default generateCode;
