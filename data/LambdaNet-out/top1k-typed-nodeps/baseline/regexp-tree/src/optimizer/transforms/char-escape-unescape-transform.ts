/**
 * The MIT License (MIT)
 * Copyright (c) 2017-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

'use strict';

/**
 * A regexp-tree plugin to remove unnecessary escape.
 *
 * \e -> e
 *
 * [\(] -> [(]
 */
module.exports = {
  _hasXFlag: false,
  init(ast) {
    this._hasXFlag = ast.flags.includes('x');
  },
  Char(path) {
    const {node} = path;

    if (!node.escaped) {
      return;
    }

    if (shouldUnescape(path, this._hasXFlag)) {
      delete node.escaped;
    }
  },
};

function shouldUnescape(path: String, hasXFlag: String): Boolean {
  const {
    node: {value},
    index,
    parent,
  } = path;

  // In char class (, etc are allowed.
  if (parent.type !== 'CharacterClass' && parent.type !== 'ClassRange') {
    return !preservesEscape(value, index, parent, hasXFlag);
  }

  return !preservesInCharClass(value, index, parent);
}

/**
 * \], \\, \^, \-
 */
function preservesInCharClass(value: String, index: Number, parent: Object): Boolean {
  if (value === '^') {
    // Avoid [\^a] turning into [^a]
    return index === 0 && !parent.negative;
  }
  if (value === '-') {
    // Avoid [a\-z] turning into [a-z]
    return true;
  }
  return /[\]\\]/.test(value);
}

function preservesEscape(value: String, index: String, parent: String, hasXFlag: Number): Boolean {
  if (value === '{') {
    return preservesOpeningCurlyBraceEscape(index, parent);
  }

  if (value === '}') {
    return preservesClosingCurlyBraceEscape(index, parent);
  }

  if (hasXFlag && /[ #]/.test(value)) {
    return true;
  }

  return /[*[()+?^$./\\|]/.test(value);
}

function consumeNumbers(startIndex: Number, parent: Object, rtl: Boolean): Number {
  let i: Number = startIndex;
  let siblingNode: NodePath =
    (rtl ? i >= 0 : i < parent.expressions.length) && parent.expressions[i];

  while (
    siblingNode &&
    siblingNode.type === 'Char' &&
    siblingNode.kind === 'simple' &&
    !siblingNode.escaped &&
    /\d/.test(siblingNode.value)
  ) {
    rtl ? i-- : i++;
    siblingNode =
      (rtl ? i >= 0 : i < parent.expressions.length) && parent.expressions[i];
  }

  return Math.abs(startIndex - i);
}

function isSimpleChar(node: NodePath, value: Number): Boolean {
  return (
    node &&
    node.type === 'Char' &&
    node.kind === 'simple' &&
    !node.escaped &&
    node.value === value
  );
}

function preservesOpeningCurlyBraceEscape(index: Number, parent: Object): Boolean {
  // (?:\{) -> (?:{)
  if (index == null) {
    return false;
  }

  let nbFollowingNumbers: String = consumeNumbers(index + 1, parent);
  let i: String = index + nbFollowingNumbers + 1;
  let nextSiblingNode: String = i < parent.expressions.length && parent.expressions[i];

  if (nbFollowingNumbers) {
    // Avoid \{3} turning into {3}
    if (isSimpleChar(nextSiblingNode, '}')) {
      return true;
    }

    if (isSimpleChar(nextSiblingNode, ',')) {
      nbFollowingNumbers = consumeNumbers(i + 1, parent);
      i = i + nbFollowingNumbers + 1;
      nextSiblingNode = i < parent.expressions.length && parent.expressions[i];

      // Avoid \{3,} turning into {3,}
      return isSimpleChar(nextSiblingNode, '}');
    }
  }
  return false;
}

function preservesClosingCurlyBraceEscape(index: Number, parent: Object): Boolean {
  // (?:\{) -> (?:{)
  if (index == null) {
    return false;
  }

  let nbPrecedingNumbers: Number = consumeNumbers(index - 1, parent, true);
  let i: Number = index - nbPrecedingNumbers - 1;
  let previousSiblingNode: String = i >= 0 && parent.expressions[i];

  // Avoid {3\} turning into {3}
  if (nbPrecedingNumbers && isSimpleChar(previousSiblingNode, '{')) {
    return true;
  }

  if (isSimpleChar(previousSiblingNode, ',')) {
    nbPrecedingNumbers = consumeNumbers(i - 1, parent, true);
    i = i - nbPrecedingNumbers - 1;
    previousSiblingNode =
      i < parent.expressions.length && parent.expressions[i];

    // Avoid {3,\} turning into {3,}
    return nbPrecedingNumbers && isSimpleChar(previousSiblingNode, '{');
  }
  return false;
}
