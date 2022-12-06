import t from '@babel/types';

function moduleExports(expression: Expression) {
  return t.expressionStatement(
    t.assignmentExpression(
      '=',
      t.memberExpression(t.identifier('module'), t.identifier('exports')),
      expression
    )
  )
}

export default moduleExports;