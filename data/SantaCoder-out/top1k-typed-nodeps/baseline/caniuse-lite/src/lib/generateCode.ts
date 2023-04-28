const generate = require('@babel/generator').default
const t = require('@babel/types')

function generateCode(programStatements: t.Statement[]) {
  let { code } = generate(t.program(programStatements), { minified: true })

  return `${code}\n`
}

module.exports = generateCode