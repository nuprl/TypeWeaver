// AST walker module for Mozilla Parser API compatible trees

// A simple walk is one where you simply specify callbacks to be
// called on specific nodes. The last two arguments are optional. A
// simple use would be
//
//     walk.simple(myTree, {
//         Expression: function(node) { ... }
//     });
//
// to do something with all expressions. All Parser API node types
// can be used to identify node types, as well as Expression and
// Statement, which denote categories of nodes.
//
// The base argument can be used to pass a custom (recursive)
// walker, and state can be used to give this walked an initial
// state.

export function simple(node: TokenType, visitors: Object, baseVisitor: Object, state: RegExpValidationState, override: RegExpValidationState): Parser {
  if (!baseVisitor) baseVisitor = base
  ;(function c(node: Scope, st: String, override: String): Void {
    let type: String = override || node.type, found: Function = visitors[type]
    baseVisitor[type](node, st, c)
    if (found) found(node, st)
  })(node, state, override)
}

// An ancestor walk keeps an array of ancestor nodes (including the
// current node) and passes them to the callback as third parameter
// (and also as state parameter when no other state is present).
export function ancestor(node: TokenType, visitors: Object, baseVisitor: Object, state: RegExpValidationState, override: RegExpValidationState): Position {
  let ancestors: Array = []
  if (!baseVisitor) baseVisitor = base
  ;(function c(node: Scope, st: String, override: String): Void {
    let type: String = override || node.type, found: Function = visitors[type]
    let isNew: Boolean = node !== ancestors[ancestors.length - 1]
    if (isNew) ancestors.push(node)
    baseVisitor[type](node, st, c)
    if (found) found(node, st || ancestors, ancestors)
    if (isNew) ancestors.pop()
  })(node, state, override)
}

// A recursive walk is one where your functions override the default
// walkers. They can modify and replace the state parameter that's
// threaded through the walk, and can opt how and whether to walk
// their child nodes (by calling their third argument on these
// nodes).
export function recursive(node: TokenType, state: RegExpValidationState, funcs: RegExpValidationState, baseVisitor: String, override: RegExpValidationState): Position {
  let visitor: Object = funcs ? make(funcs, baseVisitor || undefined) : baseVisitor
  ;(function c(node: Scope, st: Function, override: String): Void {
    visitor[override || node.type](node, st, c)
  })(node, state, override)
}

function makeTest(test: RegExpValidationState): Function {
  if (typeof test === "string")
    return (type: Scope) => type === test
  else if (!test)
    return () => true
  else
    return test
}

class Found {
  constructor(node, state) { this.node = node; this.state = state }
}

// A full walk triggers the callback on each node
export function full(node: TokenType, callback: Function, baseVisitor: Object, state: RegExpValidationState, override: RegExpValidationState): Position {
  if (!baseVisitor) baseVisitor = base
  let last: String
  ;(function c(node: Scope, st: String, override: String): Void {
    let type: Number = override || node.type
    baseVisitor[type](node, st, c)
    if (last !== node) {
      callback(node, st, type)
      last = node
    }
  })(node, state, override)
}

// An fullAncestor walk is like an ancestor walk, but triggers
// the callback on each node
export function fullAncestor(node: TokenType, callback: Function, baseVisitor: Object, state: RegExpValidationState): Void {
  if (!baseVisitor) baseVisitor = base
  let ancestors: Array = [], last: String
  ;(function c(node: Scope, st: String, override: String): Void {
    let type: Number = override || node.type
    let isNew: Boolean = node !== ancestors[ancestors.length - 1]
    if (isNew) ancestors.push(node)
    baseVisitor[type](node, st, c)
    if (last !== node) {
      callback(node, st || ancestors, ancestors, type)
      last = node
    }
    if (isNew) ancestors.pop()
  })(node, state)
}

// Find a node with a given start, end, and type (all are optional,
// null can be used as wildcard). Returns a {node, state} object, or
// undefined when it doesn't find a matching node.
export function findNodeAt(node: TokenType, start: Number, end: Number, test: Function, baseVisitor: Object, state: RegExpValidationState): Void {
  if (!baseVisitor) baseVisitor = base
  test = makeTest(test)
  try {
    (function c(node: Scope, st: String, override: String): Void {
      let type: Number = override || node.type
      if ((start == null || node.start <= start) &&
          (end == null || node.end >= end))
        baseVisitor[type](node, st, c)
      if ((start == null || node.start === start) &&
          (end == null || node.end === end) &&
          test(type, node))
        throw new Found(node, st)
    })(node, state)
  } catch (e) {
    if (e instanceof Found) return e
    throw e
  }
}

// Find the innermost node of a given type that contains the given
// position. Interface similar to findNodeAt.
export function findNodeAround(node: TokenType, pos: Number, test: Function, baseVisitor: Object, state: RegExpValidationState): Void {
  test = makeTest(test)
  if (!baseVisitor) baseVisitor = base
  try {
    (function c(node: Scope, st: String, override: String): Void {
      let type: Number = override || node.type
      if (node.start > pos || node.end < pos) return
      baseVisitor[type](node, st, c)
      if (test(type, node)) throw new Found(node, st)
    })(node, state)
  } catch (e) {
    if (e instanceof Found) return e
    throw e
  }
}

// Find the outermost matching node after a given position.
export function findNodeAfter(node: TokenType, pos: Number, test: Function, baseVisitor: Object, state: RegExpValidationState): Void {
  test = makeTest(test)
  if (!baseVisitor) baseVisitor = base
  try {
    (function c(node: Scope, st: String, override: String): Void {
      if (node.end < pos) return
      let type: Number = override || node.type
      if (node.start >= pos && test(type, node)) throw new Found(node, st)
      baseVisitor[type](node, st, c)
    })(node, state)
  } catch (e) {
    if (e instanceof Found) return e
    throw e
  }
}

// Find the outermost matching node before a given position.
export function findNodeBefore(node: TokenType, pos: Number, test: Function, baseVisitor: Object, state: RegExpValidationState): Parser {
  test = makeTest(test)
  if (!baseVisitor) baseVisitor = base
  let max: RegExpValidationState
  ;(function c(node: Scope, st: String, override: String): Void {
    if (node.start > pos) return
    let type: Number = override || node.type
    if (node.end <= pos && (!max || max.node.end < node.end) && test(type, node))
      max = new Found(node, st)
    baseVisitor[type](node, st, c)
  })(node, state)
  return max
}

// Used to create a custom walker. Will fill in all missing node
// type properties with the defaults.
export function make(funcs: Object, baseVisitor: Number): Object {
  let visitor: Object = Object.create(baseVisitor || base)
  for (let type in funcs) visitor[type] = funcs[type]
  return visitor
}

function skipThrough(node: TokenType, st: Number, c: Function): Void { c(node, st) }
function ignore(_node: TokenType, _st: Array, _c: Number): Void {}

// Node walkers.

export const base: Parser = {}

base.Program = base.BlockStatement = base.StaticBlock = (node: Scope, st: Array, c: Function) => {
  for (let stmt of node.body)
    c(stmt, st, "Statement")
}
base.Statement = skipThrough
base.EmptyStatement = ignore
base.ExpressionStatement = base.ParenthesizedExpression = base.ChainExpression =
  (node: Scope, st: Array, c: Function) => c(node.expression, st, "Expression")
base.IfStatement = (node: Scope, st: String, c: Function) => {
  c(node.test, st, "Expression")
  c(node.consequent, st, "Statement")
  if (node.alternate) c(node.alternate, st, "Statement")
}
base.LabeledStatement = (node: Scope, st: String, c: Function) => c(node.body, st, "Statement")
base.BreakStatement = base.ContinueStatement = ignore
base.WithStatement = (node: Scope, st: String, c: Function) => {
  c(node.object, st, "Expression")
  c(node.body, st, "Statement")
}
base.SwitchStatement = (node: Scope, st: String, c: Function) => {
  c(node.discriminant, st, "Expression")
  for (let cs of node.cases) {
    if (cs.test) c(cs.test, st, "Expression")
    for (let cons of cs.consequent)
      c(cons, st, "Statement")
  }
}
base.SwitchCase = (node: Scope, st: String, c: Function) => {
  if (node.test) c(node.test, st, "Expression")
  for (let cons of node.consequent)
    c(cons, st, "Statement")
}
base.ReturnStatement = base.YieldExpression = base.AwaitExpression = (node: Scope, st: Array, c: Function) => {
  if (node.argument) c(node.argument, st, "Expression")
}
base.ThrowStatement = base.SpreadElement =
  (node: Scope, st: Array, c: Function) => c(node.argument, st, "Expression")
base.TryStatement = (node: Scope, st: String, c: Function) => {
  c(node.block, st, "Statement")
  if (node.handler) c(node.handler, st)
  if (node.finalizer) c(node.finalizer, st, "Statement")
}
base.CatchClause = (node: Scope, st: String, c: Function) => {
  if (node.param) c(node.param, st, "Pattern")
  c(node.body, st, "Statement")
}
base.WhileStatement = base.DoWhileStatement = (node: Scope, st: Number, c: Function) => {
  c(node.test, st, "Expression")
  c(node.body, st, "Statement")
}
base.ForStatement = (node: Scope, st: String, c: Function) => {
  if (node.init) c(node.init, st, "ForInit")
  if (node.test) c(node.test, st, "Expression")
  if (node.update) c(node.update, st, "Expression")
  c(node.body, st, "Statement")
}
base.ForInStatement = base.ForOfStatement = (node: String, st: String, c: Function) => {
  c(node.left, st, "ForInit")
  c(node.right, st, "Expression")
  c(node.body, st, "Statement")
}
base.ForInit = (node: TokenType, st: Number, c: Function) => {
  if (node.type === "VariableDeclaration") c(node, st)
  else c(node, st, "Expression")
}
base.DebuggerStatement = ignore

base.FunctionDeclaration = (node: TokenType, st: String, c: Function) => c(node, st, "Function")
base.VariableDeclaration = (node: Scope, st: String, c: Function) => {
  for (let decl of node.declarations)
    c(decl, st)
}
base.VariableDeclarator = (node: Scope, st: String, c: Function) => {
  c(node.id, st, "Pattern")
  if (node.init) c(node.init, st, "Expression")
}

base.Function = (node: Scope, st: String, c: Function) => {
  if (node.id) c(node.id, st, "Pattern")
  for (let param of node.params)
    c(param, st, "Pattern")
  c(node.body, st, node.expression ? "Expression" : "Statement")
}

base.Pattern = (node: Scope, st: String, c: Function) => {
  if (node.type === "Identifier")
    c(node, st, "VariablePattern")
  else if (node.type === "MemberExpression")
    c(node, st, "MemberPattern")
  else
    c(node, st)
}
base.VariablePattern = ignore
base.MemberPattern = skipThrough
base.RestElement = (node: Scope, st: String, c: Function) => c(node.argument, st, "Pattern")
base.ArrayPattern = (node: Scope, st: String, c: Function) => {
  for (let elt of node.elements) {
    if (elt) c(elt, st, "Pattern")
  }
}
base.ObjectPattern = (node: Scope, st: String, c: Function) => {
  for (let prop of node.properties) {
    if (prop.type === "Property") {
      if (prop.computed) c(prop.key, st, "Expression")
      c(prop.value, st, "Pattern")
    } else if (prop.type === "RestElement") {
      c(prop.argument, st, "Pattern")
    }
  }
}

base.Expression = skipThrough
base.ThisExpression = base.Super = base.MetaProperty = ignore
base.ArrayExpression = (node: Scope, st: String, c: Function) => {
  for (let elt of node.elements) {
    if (elt) c(elt, st, "Expression")
  }
}
base.ObjectExpression = (node: Scope, st: String, c: Function) => {
  for (let prop of node.properties)
    c(prop, st)
}
base.FunctionExpression = base.ArrowFunctionExpression = base.FunctionDeclaration
base.SequenceExpression = (node: Scope, st: String, c: Function) => {
  for (let expr of node.expressions)
    c(expr, st, "Expression")
}
base.TemplateLiteral = (node: Scope, st: Number, c: Function) => {
  for (let quasi of node.quasis)
    c(quasi, st)

  for (let expr of node.expressions)
    c(expr, st, "Expression")
}
base.TemplateElement = ignore
base.UnaryExpression = base.UpdateExpression = (node: Scope, st: Array, c: Function) => {
  c(node.argument, st, "Expression")
}
base.BinaryExpression = base.LogicalExpression = (node: Array, st: Number, c: Function) => {
  c(node.left, st, "Expression")
  c(node.right, st, "Expression")
}
base.AssignmentExpression = base.AssignmentPattern = (node: Array, st: Number, c: Function) => {
  c(node.left, st, "Pattern")
  c(node.right, st, "Expression")
}
base.ConditionalExpression = (node: Scope, st: String, c: Function) => {
  c(node.test, st, "Expression")
  c(node.consequent, st, "Expression")
  c(node.alternate, st, "Expression")
}
base.NewExpression = base.CallExpression = (node: Scope, st: Number, c: Function) => {
  c(node.callee, st, "Expression")
  if (node.arguments)
    for (let arg of node.arguments)
      c(arg, st, "Expression")
}
base.MemberExpression = (node: Scope, st: String, c: Function) => {
  c(node.object, st, "Expression")
  if (node.computed) c(node.property, st, "Expression")
}
base.ExportNamedDeclaration = base.ExportDefaultDeclaration = (node: Scope, st: Number, c: Function) => {
  if (node.declaration)
    c(node.declaration, st, node.type === "ExportNamedDeclaration" || node.declaration.id ? "Statement" : "Expression")
  if (node.source) c(node.source, st, "Expression")
}
base.ExportAllDeclaration = (node: Scope, st: Number, c: Function) => {
  if (node.exported)
    c(node.exported, st)
  c(node.source, st, "Expression")
}
base.ImportDeclaration = (node: TokenType, st: Number, c: Function) => {
  for (let spec of node.specifiers)
    c(spec, st)
  c(node.source, st, "Expression")
}
base.ImportExpression = (node: TokenType, st: String, c: Function) => {
  c(node.source, st, "Expression")
}
base.ImportSpecifier = base.ImportDefaultSpecifier = base.ImportNamespaceSpecifier = base.Identifier = base.PrivateIdentifier = base.Literal = ignore

base.TaggedTemplateExpression = (node: Scope, st: String, c: Function) => {
  c(node.tag, st, "Expression")
  c(node.quasi, st, "Expression")
}
base.ClassDeclaration = base.ClassExpression = (node: TokenType, st: Array, c: Function) => c(node, st, "Class")
base.Class = (node: Scope, st: String, c: Function) => {
  if (node.id) c(node.id, st, "Pattern")
  if (node.superClass) c(node.superClass, st, "Expression")
  c(node.body, st)
}
base.ClassBody = (node: Scope, st: String, c: Function) => {
  for (let elt of node.body)
    c(elt, st)
}
base.MethodDefinition = base.PropertyDefinition = base.Property = (node: Scope, st: Number, c: Function) => {
  if (node.computed) c(node.key, st, "Expression")
  if (node.value) c(node.value, st, "Expression")
}
