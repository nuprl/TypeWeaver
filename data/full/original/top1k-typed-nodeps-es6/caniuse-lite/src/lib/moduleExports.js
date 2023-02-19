import t from '@babel/types';

function moduleExports(expression) {
  return t.expressionStatement(
    t.assignmentExpression(
      '=',
      t.memberExpression(t.identifier('module'), t.identifier('exports')),
      expression
    )
  )
}

export default moduleExports;
