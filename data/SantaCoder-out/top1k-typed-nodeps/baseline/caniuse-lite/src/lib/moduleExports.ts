const t = require('@babel/types')

function moduleExports(expression: string) {
  return t.expressionStatement(
    t.assignmentExpression(
      '=',
      t.memberExpression(t.identifier('module'), t.identifier('exports')),
      expression
    )
  )
}

module.exports = moduleExports