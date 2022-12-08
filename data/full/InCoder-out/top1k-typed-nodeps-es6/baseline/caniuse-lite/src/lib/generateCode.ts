import generate from '@babel/generator';
import t from '@babel/types';

function generateCode(programStatements: ProgramStatement[]) {
  let { code } = generate(t.program(programStatements), { minified: true })

  return `${code}\n`
}

export default generateCode;