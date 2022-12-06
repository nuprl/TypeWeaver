import parse from './parse';
import walk from './walk';
import stringify from './stringify';

function ValueParser(value: string): HTMLElement {
  if (this instanceof ValueParser) {
    this.nodes = parse(value);
    return this;
  }
  return new ValueParser(value);
}

ValueParser.prototype.toString = function() {
  return Array.isArray(this.nodes) ? stringify(this.nodes) : "";
};

ValueParser.prototype.walk = function(cb: any[], bubble: any[]) {
  walk(this.nodes, cb, bubble);
  return this;
};

ValueParser.unit = require("./unit");

ValueParser.walk = walk;

ValueParser.stringify = stringify;

export default ValueParser;
