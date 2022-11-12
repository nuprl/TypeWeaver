import {Parser} from "./state.js"
import {SourceLocation} from "./locutil.js"

export class Node {
  constructor(parser, pos, loc) {
    this.type = ""
    this.start = pos
    this.end = 0
    if (parser.options.locations)
      this.loc = new SourceLocation(parser, loc)
    if (parser.options.directSourceFile)
      this.sourceFile = parser.options.directSourceFile
    if (parser.options.ranges)
      this.range = [pos, 0]
  }
}

// Start an AST node, attaching a start offset.

const pp: LooseParser = Parser.prototype

pp.startNode = function() {
  return new Node(this, this.start, this.startLoc)
}

pp.startNodeAt = function(pos: Position, loc: Position) {
  return new Node(this, pos, loc)
}

// Finish an AST node, adding `type` and `end` properties.

function finishNodeAt(node: TokenType, type: String, pos: Number, loc: Number): RegExpValidationState {
  node.type = type
  node.end = pos
  if (this.options.locations)
    node.loc.end = loc
  if (this.options.ranges)
    node.range[1] = pos
  return node
}

pp.finishNode = function(node: TokenType, type: TokenType) {
  return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc)
}

// Finish node at given position

pp.finishNodeAt = function(node: TokenType, type: TokenType, pos: Position, loc: Position) {
  return finishNodeAt.call(this, node, type, pos, loc)
}

pp.copyNode = function(node: TokenType) {
  let newNode: RegExpValidationState = new Node(this, node.start, this.startLoc)
  for (let prop in node) newNode[prop] = node[prop]
  return newNode
}
