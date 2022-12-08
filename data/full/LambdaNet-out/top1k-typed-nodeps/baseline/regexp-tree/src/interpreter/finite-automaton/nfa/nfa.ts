/**
 * The MIT License (MIT)
 * Copyright (c) 2017-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

'use strict';

const {EPSILON, EPSILON_CLOSURE} = require('../special-symbols');

/**
 * NFA fragment.
 *
 * NFA sub-fragments can be combined to a larger NFAs building
 * the resulting machine. Combining the fragments is done by patching
 * edges of the in- and out-states.
 *
 * 2-states implementation, `in`, and `out`. Eventually all transitions
 * go to the same `out`, which can further be connected via ε-transition
 * with other fragment.
 */
class NFA {
  constructor(inState, outState) {
    this.in = inState;
    this.out = outState;
  }

  /**
   * Tries to recognize a string based on this NFA fragment.
   */
  matches(string) {
    return this.in.matches(string);
  }

  /**
   * Returns an alphabet for this NFA.
   */
  getAlphabet() {
    if (!this._alphabet) {
      this._alphabet = new Set();
      const table: object = this.getTransitionTable();
      for (const state in table) {
        const transitions: any[] = table[state];
        for (const symbol in transitions)
          if (symbol !== EPSILON_CLOSURE) {
            this._alphabet.add(symbol);
          }
      }
    }
    return this._alphabet;
  }

  /**
   * Returns set of accepting states.
   */
  getAcceptingStates() {
    if (!this._acceptingStates) {
      // States are determined during table construction.
      this.getTransitionTable();
    }
    return this._acceptingStates;
  }

  /**
   * Returns accepting state numbers.
   */
  getAcceptingStateNumbers() {
    if (!this._acceptingStateNumbers) {
      this._acceptingStateNumbers = new Set();
      for (const acceptingState of this.getAcceptingStates()) {
        this._acceptingStateNumbers.add(acceptingState.number);
      }
    }
    return this._acceptingStateNumbers;
  }

  /**
   * Builds and returns transition table.
   */
  getTransitionTable() {
    if (!this._transitionTable) {
      this._transitionTable = {};
      this._acceptingStates = new Set();

      const visited: Map = new Set();
      const symbols: Error = new Set();

      const visitState: Function = (state: NodePath) => {
        if (visited.has(state)) {
          return;
        }

        visited.add(state);
        state.number = visited.size;
        this._transitionTable[state.number] = {};

        if (state.accepting) {
          this._acceptingStates.add(state);
        }

        const transitions: any[] = state.getTransitions();

        for (const [symbol, symbolTransitions] of transitions) {
          let combinedState: any[] = [];
          symbols.add(symbol);
          for (const nextState of symbolTransitions) {
            visitState(nextState);
            combinedState.push(nextState.number);
          }
          this._transitionTable[state.number][symbol] = combinedState;
        }
      };

      // Traverse the graph starting from the `in`.
      visitState(this.in);

      // Append epsilon-closure column.
      visited.forEach((state: NodePath) => {
        delete this._transitionTable[state.number][EPSILON];
        this._transitionTable[state.number][EPSILON_CLOSURE] = [
          ...state.getEpsilonClosure(),
        ].map((s: object) => s.number);
      });
    }

    return this._transitionTable;
  }
}

module.exports = NFA;
