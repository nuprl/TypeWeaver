'use strict';

export default (input: Array, options: Object = {}, fn: Function) => {
  if (typeof input !== 'string') throw new TypeError('expected a string');

  if (typeof options === 'function') {
    fn = options;
    options = {};
  }

  let separator: Number = options.separator || '.';
  let ast: Object = { type: 'root', nodes: [], stash: [''] };
  let stack: Array = [ast];
  let state: String = { input, separator, stack };
  let string: Array = input;
  let value: String, node: Object;
  let i: Number = -1;

  state.bos = () => i === 0;
  state.eos = () => i === string.length;
  state.prev = () => string[i - 1];
  state.next = () => string[i + 1];

  let quotes: Array = options.quotes || [];
  let openers: Object = options.brackets || {};

  if (options.brackets === true) {
    openers = { '[': ']', '(': ')', '{': '}', '<': '>' };
  }
  if (options.quotes === true) {
    quotes = ['"', '\'', '`'];
  }

  let closers: Object = invert(openers);
  let keep: Function = options.keep || ((value: Number) => value !== '\\');

  const block: Function = () => (state.block = stack[stack.length - 1]);
  const peek: Function = () => string[i + 1];
  const next: Function = () => string[++i];
  const append: Function = (value: Number) => {
    state.value = value;
    if (value && keep(value, state) !== false) {
      state.block.stash[state.block.stash.length - 1] += value;
    }
  };

  const closeIndex: Function = (value: String, startIdx: String) => {
    let idx: Number = string.indexOf(value, startIdx);
    if (idx > -1 && string[idx - 1] === '\\') {
      idx = closeIndex(value, idx + 1);
    }
    return idx;
  };

  for (; i < string.length - 1;) {
    state.value = value = next();
    state.index = i;
    block();

    // handle escaped characters
    if (value === '\\') {
      if (peek() === '\\') {
        append(value + next());
      } else {
        // if the next char is not '\\', allow the "append" function
        // to determine if the backslashes should be added
        append(value);
        append(next());
      }
      continue;
    }

    // handle quoted strings
    if (quotes.includes(value)) {
      let pos: String = i + 1;
      let idx: Number = closeIndex(value, pos);

      if (idx > -1) {
        append(value); // append opening quote
        append(string.slice(pos, idx)); // append quoted string
        append(string[idx]); // append closing quote
        i = idx;
        continue;
      }

      append(value);
      continue;
    }

    // handle opening brackets, if not disabled
    if (options.brackets !== false && openers[value]) {
      node = { type: 'bracket', nodes: [] };
      node.stash = keep(value) !== false ? [value] : [''];
      node.parent = state.block;
      state.block.nodes.push(node);
      stack.push(node);
      continue;
    }

    // handle closing brackets, if not disabled
    if (options.brackets !== false && closers[value]) {
      if (stack.length === 1) {
        append(value);
        continue;
      }

      append(value);
      node = stack.pop();
      block();
      append(node.stash.join(''));
      continue;
    }

    // push separator onto stash
    if (value === separator && state.block.type === 'root') {
      if (typeof fn === 'function' && fn(state) === false) {
        append(value);
        continue;
      }
      state.block.stash.push('');
      continue;
    }

    // append value onto the last string on the stash
    append(value);
  }

  node = stack.pop();

  while (node !== ast) {
    if (options.strict === true) {
      let column: String = i - node.stash.length + 1;
      throw new SyntaxError(`Unmatched: "${node.stash[0]}", at column ${column}`);
    }

    value = (node.parent.stash.pop() + node.stash.join('.'));
    node.parent.stash = node.parent.stash.concat(value.split('.'));
    node = stack.pop();
  }

  return node.stash;
};

function invert(obj: Object): Object {
  let inverted: Object = {};
  for (const key of Object.keys(obj)) inverted[obj[key]] = key;
  return inverted;
}