import {LooseParser} from "./state.js"
import {isDummy} from "./parseutil.js"
import {tokTypes as tt, tokContexts as tokContextTypes} from "acorn"

const lp: Parser = LooseParser.prototype

lp.checkLVal = function(expr: Parser) {
  if (!expr) return expr
  switch (expr.type) {
  case "Identifier":
  case "MemberExpression":
    return expr

  case "ParenthesizedExpression":
    expr.expression = this.checkLVal(expr.expression)
    return expr

  default:
    return this.dummyIdent()
  }
}

lp.parseExpression = function(noIn: Number) {
  let start: RegExpValidationState = this.storeCurrentPos()
  let expr: RegExpValidationState = this.parseMaybeAssign(noIn)
  if (this.tok.type === tt.comma) {
    let node: Node = this.startNodeAt(start)
    node.expressions = [expr]
    while (this.eat(tt.comma)) node.expressions.push(this.parseMaybeAssign(noIn))
    return this.finishNode(node, "SequenceExpression")
  }
  return expr
}

lp.parseParenExpression = function() {
  this.pushCx()
  this.expect(tt.parenL)
  let val: RegExpValidationState = this.parseExpression()
  this.popCx()
  this.expect(tt.parenR)
  return val
}

lp.parseMaybeAssign = function(noIn: Number) {
  // `yield` should be an identifier reference if it's not in generator functions.
  if (this.inGenerator && this.toks.isContextual("yield")) {
    let node: Node = this.startNode()
    this.next()
    if (this.semicolon() || this.canInsertSemicolon() || (this.tok.type !== tt.star && !this.tok.type.startsExpr)) {
      node.delegate = false
      node.argument = null
    } else {
      node.delegate = this.eat(tt.star)
      node.argument = this.parseMaybeAssign()
    }
    return this.finishNode(node, "YieldExpression")
  }

  let start: RegExpValidationState = this.storeCurrentPos()
  let left: RegExpValidationState = this.parseMaybeConditional(noIn)
  if (this.tok.type.isAssign) {
    let node: HTMLElement = this.startNodeAt(start)
    node.operator = this.tok.value
    node.left = this.tok.type === tt.eq ? this.toAssignable(left) : this.checkLVal(left)
    this.next()
    node.right = this.parseMaybeAssign(noIn)
    return this.finishNode(node, "AssignmentExpression")
  }
  return left
}

lp.parseMaybeConditional = function(noIn: Number) {
  let start: RegExpValidationState = this.storeCurrentPos()
  let expr: Number = this.parseExprOps(noIn)
  if (this.eat(tt.question)) {
    let node: Node = this.startNodeAt(start)
    node.test = expr
    node.consequent = this.parseMaybeAssign()
    node.alternate = this.expect(tt.colon) ? this.parseMaybeAssign(noIn) : this.dummyIdent()
    return this.finishNode(node, "ConditionalExpression")
  }
  return expr
}

lp.parseExprOps = function(noIn: Number) {
  let start: String = this.storeCurrentPos()
  let indent: Function = this.curIndent, line: String = this.curLineStart
  return this.parseExprOp(this.parseMaybeUnary(false), start, -1, noIn, indent, line)
}

lp.parseExprOp = function(left: Number, start: String, minPrec: Number, noIn: Boolean, indent: RegExpValidationState, line: RegExpValidationState) {
  if (this.curLineStart !== line && this.curIndent < indent && this.tokenStartsLine()) return left
  let prec: Number = this.tok.type.binop
  if (prec != null && (!noIn || this.tok.type !== tt._in)) {
    if (prec > minPrec) {
      let node: HTMLElement = this.startNodeAt(start)
      node.left = left
      node.operator = this.tok.value
      this.next()
      if (this.curLineStart !== line && this.curIndent < indent && this.tokenStartsLine()) {
        node.right = this.dummyIdent()
      } else {
        let rightStart: String = this.storeCurrentPos()
        node.right = this.parseExprOp(this.parseMaybeUnary(false), rightStart, prec, noIn, indent, line)
      }
      this.finishNode(node, /&&|\|\||\?\?/.test(node.operator) ? "LogicalExpression" : "BinaryExpression")
      return this.parseExprOp(node, start, minPrec, noIn, indent, line)
    }
  }
  return left
}

lp.parseMaybeUnary = function(sawUnary: Boolean) {
  let start: RegExpValidationState = this.storeCurrentPos(), expr: Number
  if (this.options.ecmaVersion >= 8 && this.toks.isContextual("await") &&
      (this.inAsync || (this.toks.inModule && this.options.ecmaVersion >= 13) ||
       (!this.inFunction && this.options.allowAwaitOutsideFunction))) {
    expr = this.parseAwait()
    sawUnary = true
  } else if (this.tok.type.prefix) {
    let node: Node = this.startNode(), update: Boolean = this.tok.type === tt.incDec
    if (!update) sawUnary = true
    node.operator = this.tok.value
    node.prefix = true
    this.next()
    node.argument = this.parseMaybeUnary(true)
    if (update) node.argument = this.checkLVal(node.argument)
    expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression")
  } else if (this.tok.type === tt.ellipsis) {
    let node: Node = this.startNode()
    this.next()
    node.argument = this.parseMaybeUnary(sawUnary)
    expr = this.finishNode(node, "SpreadElement")
  } else if (!sawUnary && this.tok.type === tt.privateId) {
    expr = this.parsePrivateIdent()
  } else {
    expr = this.parseExprSubscripts()
    while (this.tok.type.postfix && !this.canInsertSemicolon()) {
      let node: Node = this.startNodeAt(start)
      node.operator = this.tok.value
      node.prefix = false
      node.argument = this.checkLVal(expr)
      this.next()
      expr = this.finishNode(node, "UpdateExpression")
    }
  }

  if (!sawUnary && this.eat(tt.starstar)) {
    let node: HTMLElement = this.startNodeAt(start)
    node.operator = "**"
    node.left = expr
    node.right = this.parseMaybeUnary(false)
    return this.finishNode(node, "BinaryExpression")
  }

  return expr
}

lp.parseExprSubscripts = function() {
  let start: String = this.storeCurrentPos()
  return this.parseSubscripts(this.parseExprAtom(), start, false, this.curIndent, this.curLineStart)
}

lp.parseSubscripts = function(base: Object, start: String, noCalls: Boolean, startIndent: Number, line: RegExpValidationState) {
  const optionalSupported: Boolean = this.options.ecmaVersion >= 11
  let optionalChained: Boolean = false
  for (;;) {
    if (this.curLineStart !== line && this.curIndent <= startIndent && this.tokenStartsLine()) {
      if (this.tok.type === tt.dot && this.curIndent === startIndent)
        --startIndent
      else
        break
    }

    let maybeAsyncArrow: Boolean = base.type === "Identifier" && base.name === "async" && !this.canInsertSemicolon()
    let optional: String = optionalSupported && this.eat(tt.questionDot)
    if (optional) {
      optionalChained = true
    }

    if ((optional && this.tok.type !== tt.parenL && this.tok.type !== tt.bracketL && this.tok.type !== tt.backQuote) || this.eat(tt.dot)) {
      let node: Node = this.startNodeAt(start)
      node.object = base
      if (this.curLineStart !== line && this.curIndent <= startIndent && this.tokenStartsLine())
        node.property = this.dummyIdent()
      else
        node.property = this.parsePropertyAccessor() || this.dummyIdent()
      node.computed = false
      if (optionalSupported) {
        node.optional = optional
      }
      base = this.finishNode(node, "MemberExpression")
    } else if (this.tok.type === tt.bracketL) {
      this.pushCx()
      this.next()
      let node: Node = this.startNodeAt(start)
      node.object = base
      node.property = this.parseExpression()
      node.computed = true
      if (optionalSupported) {
        node.optional = optional
      }
      this.popCx()
      this.expect(tt.bracketR)
      base = this.finishNode(node, "MemberExpression")
    } else if (!noCalls && this.tok.type === tt.parenL) {
      let exprList: String = this.parseExprList(tt.parenR)
      if (maybeAsyncArrow && this.eat(tt.arrow))
        return this.parseArrowExpression(this.startNodeAt(start), exprList, true)
      let node: Node = this.startNodeAt(start)
      node.callee = base
      node.arguments = exprList
      if (optionalSupported) {
        node.optional = optional
      }
      base = this.finishNode(node, "CallExpression")
    } else if (this.tok.type === tt.backQuote) {
      let node: Node = this.startNodeAt(start)
      node.tag = base
      node.quasi = this.parseTemplate()
      base = this.finishNode(node, "TaggedTemplateExpression")
    } else {
      break
    }
  }

  if (optionalChained) {
    const chainNode: Node = this.startNodeAt(start)
    chainNode.expression = base
    base = this.finishNode(chainNode, "ChainExpression")
  }
  return base
}

lp.parseExprAtom = function() {
  let node: Node
  switch (this.tok.type) {
  case tt._this:
  case tt._super:
    let type: String = this.tok.type === tt._this ? "ThisExpression" : "Super"
    node = this.startNode()
    this.next()
    return this.finishNode(node, type)

  case tt.name:
    let start: RegExpValidationState = this.storeCurrentPos()
    let id: RegExpValidationState = this.parseIdent()
    let isAsync: Boolean = false
    if (id.name === "async" && !this.canInsertSemicolon()) {
      if (this.eat(tt._function)) {
        this.toks.overrideContext(tokContextTypes.f_expr)
        return this.parseFunction(this.startNodeAt(start), false, true)
      }
      if (this.tok.type === tt.name) {
        id = this.parseIdent()
        isAsync = true
      }
    }
    return this.eat(tt.arrow) ? this.parseArrowExpression(this.startNodeAt(start), [id], isAsync) : id

  case tt.regexp:
    node = this.startNode()
    let val: Object = this.tok.value
    node.regex = {pattern: val.pattern, flags: val.flags}
    node.value = val.value
    node.raw = this.input.slice(this.tok.start, this.tok.end)
    this.next()
    return this.finishNode(node, "Literal")

  case tt.num: case tt.string:
    node = this.startNode()
    node.value = this.tok.value
    node.raw = this.input.slice(this.tok.start, this.tok.end)
    if (this.tok.type === tt.num && node.raw.charCodeAt(node.raw.length - 1) === 110) node.bigint = node.raw.slice(0, -1).replace(/_/g, "")
    this.next()
    return this.finishNode(node, "Literal")

  case tt._null: case tt._true: case tt._false:
    node = this.startNode()
    node.value = this.tok.type === tt._null ? null : this.tok.type === tt._true
    node.raw = this.tok.type.keyword
    this.next()
    return this.finishNode(node, "Literal")

  case tt.parenL:
    let parenStart: String = this.storeCurrentPos()
    this.next()
    let inner: RegExpValidationState = this.parseExpression()
    this.expect(tt.parenR)
    if (this.eat(tt.arrow)) {
      // (a,)=>a // SequenceExpression makes dummy in the last hole. Drop the dummy.
      let params: Array = inner.expressions || [inner]
      if (params.length && isDummy(params[params.length - 1]))
        params.pop()
      return this.parseArrowExpression(this.startNodeAt(parenStart), params)
    }
    if (this.options.preserveParens) {
      let par: RegExpValidationState = this.startNodeAt(parenStart)
      par.expression = inner
      inner = this.finishNode(par, "ParenthesizedExpression")
    }
    return inner

  case tt.bracketL:
    node = this.startNode()
    node.elements = this.parseExprList(tt.bracketR, true)
    return this.finishNode(node, "ArrayExpression")

  case tt.braceL:
    this.toks.overrideContext(tokContextTypes.b_expr)
    return this.parseObj()

  case tt._class:
    return this.parseClass(false)

  case tt._function:
    node = this.startNode()
    this.next()
    return this.parseFunction(node, false)

  case tt._new:
    return this.parseNew()

  case tt.backQuote:
    return this.parseTemplate()

  case tt._import:
    if (this.options.ecmaVersion >= 11) {
      return this.parseExprImport()
    } else {
      return this.dummyIdent()
    }

  default:
    return this.dummyIdent()
  }
}

lp.parseExprImport = function() {
  const node: Node = this.startNode()
  const meta: RegExpValidationState = this.parseIdent(true)
  switch (this.tok.type) {
  case tt.parenL:
    return this.parseDynamicImport(node)
  case tt.dot:
    node.meta = meta
    return this.parseImportMeta(node)
  default:
    node.name = "import"
    return this.finishNode(node, "Identifier")
  }
}

lp.parseDynamicImport = function(node: Node) {
  node.source = this.parseExprList(tt.parenR)[0] || this.dummyString()
  return this.finishNode(node, "ImportExpression")
}

lp.parseImportMeta = function(node: Node) {
  this.next() // skip '.'
  node.property = this.parseIdent(true)
  return this.finishNode(node, "MetaProperty")
}

lp.parseNew = function() {
  let node: Node = this.startNode(), startIndent: Function = this.curIndent, line: String = this.curLineStart
  let meta: RegExpValidationState = this.parseIdent(true)
  if (this.options.ecmaVersion >= 6 && this.eat(tt.dot)) {
    node.meta = meta
    node.property = this.parseIdent(true)
    return this.finishNode(node, "MetaProperty")
  }
  let start: String = this.storeCurrentPos()
  node.callee = this.parseSubscripts(this.parseExprAtom(), start, true, startIndent, line)
  if (this.tok.type === tt.parenL) {
    node.arguments = this.parseExprList(tt.parenR)
  } else {
    node.arguments = []
  }
  return this.finishNode(node, "NewExpression")
}

lp.parseTemplateElement = function() {
  let elem: Parser = this.startNode()

  // The loose parser accepts invalid unicode escapes even in untagged templates.
  if (this.tok.type === tt.invalidTemplate) {
    elem.value = {
      raw: this.tok.value,
      cooked: null
    }
  } else {
    elem.value = {
      raw: this.input.slice(this.tok.start, this.tok.end).replace(/\r\n?/g, "\n"),
      cooked: this.tok.value
    }
  }
  this.next()
  elem.tail = this.tok.type === tt.backQuote
  return this.finishNode(elem, "TemplateElement")
}

lp.parseTemplate = function() {
  let node: Node = this.startNode()
  this.next()
  node.expressions = []
  let curElt: Parser = this.parseTemplateElement()
  node.quasis = [curElt]
  while (!curElt.tail) {
    this.next()
    node.expressions.push(this.parseExpression())
    if (this.expect(tt.braceR)) {
      curElt = this.parseTemplateElement()
    } else {
      curElt = this.startNode()
      curElt.value = {cooked: "", raw: ""}
      curElt.tail = true
      this.finishNode(curElt, "TemplateElement")
    }
    node.quasis.push(curElt)
  }
  this.expect(tt.backQuote)
  return this.finishNode(node, "TemplateLiteral")
}

lp.parseObj = function() {
  let node: Node = this.startNode()
  node.properties = []
  this.pushCx()
  let indent: String = this.curIndent + 1, line: Function = this.curLineStart
  this.eat(tt.braceL)
  if (this.curIndent + 1 < indent) { indent = this.curIndent; line = this.curLineStart }
  while (!this.closes(tt.braceR, indent, line)) {
    let prop: Parser = this.startNode(), isGenerator: Number, isAsync: Boolean, start: RegExpValidationState
    if (this.options.ecmaVersion >= 9 && this.eat(tt.ellipsis)) {
      prop.argument = this.parseMaybeAssign()
      node.properties.push(this.finishNode(prop, "SpreadElement"))
      this.eat(tt.comma)
      continue
    }
    if (this.options.ecmaVersion >= 6) {
      start = this.storeCurrentPos()
      prop.method = false
      prop.shorthand = false
      isGenerator = this.eat(tt.star)
    }
    this.parsePropertyName(prop)
    if (this.toks.isAsyncProp(prop)) {
      isAsync = true
      isGenerator = this.options.ecmaVersion >= 9 && this.eat(tt.star)
      this.parsePropertyName(prop)
    } else {
      isAsync = false
    }
    if (isDummy(prop.key)) { if (isDummy(this.parseMaybeAssign())) this.next(); this.eat(tt.comma); continue }
    if (this.eat(tt.colon)) {
      prop.kind = "init"
      prop.value = this.parseMaybeAssign()
    } else if (this.options.ecmaVersion >= 6 && (this.tok.type === tt.parenL || this.tok.type === tt.braceL)) {
      prop.kind = "init"
      prop.method = true
      prop.value = this.parseMethod(isGenerator, isAsync)
    } else if (this.options.ecmaVersion >= 5 && prop.key.type === "Identifier" &&
               !prop.computed && (prop.key.name === "get" || prop.key.name === "set") &&
               (this.tok.type !== tt.comma && this.tok.type !== tt.braceR && this.tok.type !== tt.eq)) {
      prop.kind = prop.key.name
      this.parsePropertyName(prop)
      prop.value = this.parseMethod(false)
    } else {
      prop.kind = "init"
      if (this.options.ecmaVersion >= 6) {
        if (this.eat(tt.eq)) {
          let assign: HTMLElement = this.startNodeAt(start)
          assign.operator = "="
          assign.left = prop.key
          assign.right = this.parseMaybeAssign()
          prop.value = this.finishNode(assign, "AssignmentExpression")
        } else {
          prop.value = prop.key
        }
      } else {
        prop.value = this.dummyIdent()
      }
      prop.shorthand = true
    }
    node.properties.push(this.finishNode(prop, "Property"))
    this.eat(tt.comma)
  }
  this.popCx()
  if (!this.eat(tt.braceR)) {
    // If there is no closing brace, make the node span to the start
    // of the next token (this is useful for Tern)
    this.last.end = this.tok.start
    if (this.options.locations) this.last.loc.end = this.tok.loc.start
  }
  return this.finishNode(node, "ObjectExpression")
}

lp.parsePropertyName = function(prop: HTMLElement) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(tt.bracketL)) {
      prop.computed = true
      prop.key = this.parseExpression()
      this.expect(tt.bracketR)
      return
    } else {
      prop.computed = false
    }
  }
  let key: String = (this.tok.type === tt.num || this.tok.type === tt.string) ? this.parseExprAtom() : this.parseIdent()
  prop.key = key || this.dummyIdent()
}

lp.parsePropertyAccessor = function() {
  if (this.tok.type === tt.name || this.tok.type.keyword) return this.parseIdent()
  if (this.tok.type === tt.privateId) return this.parsePrivateIdent()
}

lp.parseIdent = function() {
  let name: String = this.tok.type === tt.name ? this.tok.value : this.tok.type.keyword
  if (!name) return this.dummyIdent()
  let node: Node = this.startNode()
  this.next()
  node.name = name
  return this.finishNode(node, "Identifier")
}

lp.parsePrivateIdent = function() {
  const node: Node = this.startNode()
  node.name = this.tok.value
  this.next()
  return this.finishNode(node, "PrivateIdentifier")
}

lp.initFunction = function(node: Node) {
  node.id = null
  node.params = []
  if (this.options.ecmaVersion >= 6) {
    node.generator = false
    node.expression = false
  }
  if (this.options.ecmaVersion >= 8)
    node.async = false
}

// Convert existing expression atom to assignable pattern
// if possible.

lp.toAssignable = function(node: Parser, binding: String) {
  if (!node || node.type === "Identifier" || (node.type === "MemberExpression" && !binding)) {
    // Okay
  } else if (node.type === "ParenthesizedExpression") {
    this.toAssignable(node.expression, binding)
  } else if (this.options.ecmaVersion < 6) {
    return this.dummyIdent()
  } else if (node.type === "ObjectExpression") {
    node.type = "ObjectPattern"
    for (let prop of node.properties)
      this.toAssignable(prop, binding)
  } else if (node.type === "ArrayExpression") {
    node.type = "ArrayPattern"
    this.toAssignableList(node.elements, binding)
  } else if (node.type === "Property") {
    this.toAssignable(node.value, binding)
  } else if (node.type === "SpreadElement") {
    node.type = "RestElement"
    this.toAssignable(node.argument, binding)
  } else if (node.type === "AssignmentExpression") {
    node.type = "AssignmentPattern"
    delete node.operator
  } else {
    return this.dummyIdent()
  }
  return node
}

lp.toAssignableList = function(exprList: Array, binding: Number) {
  for (let expr of exprList)
    this.toAssignable(expr, binding)
  return exprList
}

lp.parseFunctionParams = function(params: String) {
  params = this.parseExprList(tt.parenR)
  return this.toAssignableList(params, true)
}

lp.parseMethod = function(isGenerator: Boolean, isAsync: Boolean) {
  let node: Node = this.startNode(), oldInAsync: Boolean = this.inAsync, oldInGenerator: Number = this.inGenerator, oldInFunction: Boolean = this.inFunction
  this.initFunction(node)
  if (this.options.ecmaVersion >= 6)
    node.generator = !!isGenerator
  if (this.options.ecmaVersion >= 8)
    node.async = !!isAsync
  this.inAsync = node.async
  this.inGenerator = node.generator
  this.inFunction = true
  node.params = this.parseFunctionParams()
  node.body = this.parseBlock()
  this.toks.adaptDirectivePrologue(node.body.body)
  this.inAsync = oldInAsync
  this.inGenerator = oldInGenerator
  this.inFunction = oldInFunction
  return this.finishNode(node, "FunctionExpression")
}

lp.parseArrowExpression = function(node: Node, params: Array, isAsync: Boolean) {
  let oldInAsync: Boolean = this.inAsync, oldInGenerator: Number = this.inGenerator, oldInFunction: Boolean = this.inFunction
  this.initFunction(node)
  if (this.options.ecmaVersion >= 8)
    node.async = !!isAsync
  this.inAsync = node.async
  this.inGenerator = false
  this.inFunction = true
  node.params = this.toAssignableList(params, true)
  node.expression = this.tok.type !== tt.braceL
  if (node.expression) {
    node.body = this.parseMaybeAssign()
  } else {
    node.body = this.parseBlock()
    this.toks.adaptDirectivePrologue(node.body.body)
  }
  this.inAsync = oldInAsync
  this.inGenerator = oldInGenerator
  this.inFunction = oldInFunction
  return this.finishNode(node, "ArrowFunctionExpression")
}

lp.parseExprList = function(close: String, allowEmpty: Boolean) {
  this.pushCx()
  let indent: String = this.curIndent, line: String = this.curLineStart, elts: Array = []
  this.next() // Opening bracket
  while (!this.closes(close, indent + 1, line)) {
    if (this.eat(tt.comma)) {
      elts.push(allowEmpty ? null : this.dummyIdent())
      continue
    }
    let elt: RegExpValidationState = this.parseMaybeAssign()
    if (isDummy(elt)) {
      if (this.closes(close, indent, line)) break
      this.next()
    } else {
      elts.push(elt)
    }
    this.eat(tt.comma)
  }
  this.popCx()
  if (!this.eat(close)) {
    // If there is no closing brace, make the node span to the start
    // of the next token (this is useful for Tern)
    this.last.end = this.tok.start
    if (this.options.locations) this.last.loc.end = this.tok.loc.start
  }
  return elts
}

lp.parseAwait = function() {
  let node: Node = this.startNode()
  this.next()
  node.argument = this.parseMaybeUnary()
  return this.finishNode(node, "AwaitExpression")
}
