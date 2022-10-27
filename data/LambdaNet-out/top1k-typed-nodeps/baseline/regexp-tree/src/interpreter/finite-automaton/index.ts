/**
 * The MIT License (MIT)
 * Copyright (c) 2017-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

'use strict';

const NFA: String = require('./nfa/nfa');
const DFA: String = require('./dfa/dfa');

const nfaFromRegExp: String = require('./nfa/nfa-from-regexp');
const builders: String = require('./nfa/builders');

module.exports = {

  /**
   * Export NFA and DFA classes.
   */
  NFA,
  DFA,

  /**
   * Expose builders.
   */
  builders,

  /**
   * Builds an NFA for the passed regexp.
   *
   * @param string | AST | RegExp:
   *
   *   a regular expression in different representations: a string,
   *   a RegExp object, or an AST.
   */
  toNFA(regexp) {
    return nfaFromRegExp.build(regexp);
  },

  /**
   * Builds DFA for the passed regexp.
   *
   * @param string | AST | RegExp:
   *
   *   a regular expression in different representations: a string,
   *   a RegExp object, or an AST.
   */
  toDFA(regexp) {
    return new DFA(this.toNFA(regexp));
  },

  /**
   * Returns true if regexp accepts the string.
   */
  test(regexp, string) {
    return this.toDFA(regexp).matches(string);
  },
};