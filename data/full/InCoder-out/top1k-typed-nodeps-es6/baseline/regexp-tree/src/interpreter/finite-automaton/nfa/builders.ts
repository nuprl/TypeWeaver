/**
 * The MIT License (MIT)
 * Copyright (c) 2017-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

'use strict';

import NFA from './nfa';
import NFAState from './nfa-state';
import { EPSILON } from '../special-symbols';

// -----------------------------------------------------------------------------
// Char NFA fragment: `c`

/**
 * Char factory.
 *
 * Creates an NFA fragment for a single char.
 *
 * [in] --c--> [out]
 */
function char(c: number) {
  const inState = new NFAState();
  const outState = new NFAState({
    accepting: true,
  });

  return new NFA(inState.addTransition(c, outState), outState);
}

// -----------------------------------------------------------------------------
// Epsilon NFA fragment

/**
 * Epsilon factory.
 *
 * Creates an NFA fragment for ε (recognizes an empty string).
 *
 * [in] --ε--> [out]
 */
function e() {
  return char(EPSILON);
}

// -----------------------------------------------------------------------------
// Alteration NFA fragment: `abc`

/**
 * Creates a connection between two NFA fragments on epsilon transition.
 *
 * [in-a] --a--> [out-a] --ε--> [in-b] --b--> [out-b]
 */
function altPair(first: Pair,  second: Pair) {
  first.out.accepting = false;
  second.out.accepting = true;

  first.out.addTransition(EPSILON, second.in);

  return new NFA(first.in, second.out);
}

/**
 * Alteration factory.
 *
 * Creates a alteration NFA for (at least) two NFA-fragments.
 */
function alt(first: ST,  ...fragments: T[]) {
  for (let fragment of fragments) {
    first = altPair(first, fragment);
  }
  return first;
}

// -----------------------------------------------------------------------------
// Disjunction NFA fragment: `a|b`

/**
 * Creates a disjunction choice between two fragments.
 */
function orPair(first: NFAState,  second: NFAState) {
  const inState = new NFAState();
  const outState = new NFAState();

  inState.addTransition(EPSILON, first.in);
  inState.addTransition(EPSILON, second.in);

  outState.accepting = true;
  first.out.accepting = false;
  second.out.accepting = false;

  first.out.addTransition(EPSILON, outState);
  second.out.addTransition(EPSILON, outState);

  return new NFA(inState, outState);
}

/**
 * Disjunction factory.
 *
 * Creates a disjunction NFA for (at least) two NFA-fragments.
 */
function or(first: xpression,  ...fragments: pression[]) {
  for (let fragment of fragments) {
    first = orPair(first, fragment);
  }
  return first;
}

// -----------------------------------------------------------------------------
// Kleene-closure

/**
 * Kleene star/closure.
 *
 * a*
 */
function repExplicit(fragment: NFAState) {
  const inState = new NFAState();
  const outState = new NFAState({
    accepting: true,
  });

  // 0 or more.
  inState.addTransition(EPSILON, fragment.in);
  inState.addTransition(EPSILON, outState);

  fragment.out.accepting = false;
  fragment.out.addTransition(EPSILON, outState);
  outState.addTransition(EPSILON, fragment.in);

  return new NFA(inState, outState);
}

/**
 * Optimized Kleene-star: just adds ε-transitions from
 * input to the output, and back.
 */
function rep(fragment: string | RegExp) {
  fragment.in.addTransition(EPSILON, fragment.out);
  fragment.out.addTransition(EPSILON, fragment.in);
  return fragment;
}

/**
 * Optimized Plus: just adds ε-transitions from
 * the output to the input.
 */
function plusRep(fragment: Fragment) {
  fragment.out.addTransition(EPSILON, fragment.in);
  return fragment;
}

/**
 * Optimized ? repetition: just adds ε-transitions from
 * the input to the output.
 */
function questionRep(fragment: Fragment) {
  fragment.in.addTransition(EPSILON, fragment.out);
  return fragment;
}

export default {
  alt,
  char,
  e,
  or,
  rep,
  repExplicit,
  plusRep,
  questionRep,
};