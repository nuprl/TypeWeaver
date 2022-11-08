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

const pp = Parser.prototype

pp.startNode = function() {
  return new Node(this, this.start, this.startLoc)
}

pp.startNodeAt = function(pos: number,  loc: number) {
  return new Node(this, pos, loc)
}

// Finish an AST node, adding `type` and `end` properties.

function finishNodeAt(node: Node,  type: NodeType,  pos: number,  loc: number) {
  node.type = type
  node.end = pos
  if (this.options.locations)
    node.loc.end = loc
  if (this.options.ranges)
    node.range[1] = pos
  return node
}

pp.finishNode = function(node: Node,  type: string) {
  return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc)
}

// Finish node at given position

pp.finishNodeAt = function(node: Node,  type: TokenType,  pos: number,  loc: number) {
  return finishNodeAt.call(this, node, type, pos, loc)
}

pp.copyNode = function(node: Node) {
  let newNode = new Node(this, node.start, this.startLoc)
  for (let prop in node) newNode[prop] = node[prop]
  return newNode
}