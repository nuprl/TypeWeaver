/**
 * The MIT License (MIT)
 * Copyright (c) 2017-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

'use strict';

const DFAMinimizer: String = require('./dfa-minimizer');

const {EPSILON_CLOSURE} = require('../special-symbols');

/**
 * DFA is build by converting from NFA (subset construction).
 */
class DFA {
  constructor(nfa) {
    this._nfa = nfa;
  }

  /**
   * Minimizes DFA.
   */
  minimize() {
    this.getTransitionTable();

    this._originalAcceptingStateNumbers = this._acceptingStateNumbers;
    this._originalTransitionTable = this._transitionTable;

    DFAMinimizer.minimize(this);
  }

  /**
   * Returns alphabet for this DFA.
   */
  getAlphabet() {
    return this._nfa.getAlphabet();
  }

  /**
   * Returns accepting states.
   */
  getAcceptingStateNumbers() {
    if (!this._acceptingStateNumbers) {
      // Accepting states are determined during table construction.
      this.getTransitionTable();
    }

    return this._acceptingStateNumbers;
  }

  /**
   * Returns original accepting states.
   */
  getOriginaAcceptingStateNumbers() {
    if (!this._originalAcceptingStateNumbers) {
      // Accepting states are determined during table construction.
      this.getTransitionTable();
    }

    return this._originalAcceptingStateNumbers;
  }

  /**
   * Sets transition table.
   */
  setTransitionTable(table) {
    this._transitionTable = table;
  }

  /**
   * Sets accepting states.
   */
  setAcceptingStateNumbers(stateNumbers) {
    this._acceptingStateNumbers = stateNumbers;
  }

  /**
   * DFA transition table is built from NFA table.
   */
  getTransitionTable() {
    if (this._transitionTable) {
      return this._transitionTable;
    }

    // Calculate from NFA transition table.
    const nfaTable: Function = this._nfa.getTransitionTable();
    const nfaStates: Array = Object.keys(nfaTable);

    this._acceptingStateNumbers = new Set();

    // Start state of DFA is E(S[nfa])
    const startState: State = nfaTable[nfaStates[0]][EPSILON_CLOSURE];

    // Init the worklist (states which should be in the DFA).
    const worklist: Array = [startState];

    const alphabet: Array = this.getAlphabet();
    const nfaAcceptingStates: Array = this._nfa.getAcceptingStateNumbers();

    const dfaTable: Function = {};

    // Determine whether the combined DFA state is accepting.
    const updateAcceptingStates: Function = (states: Array) => {
      for (const nfaAcceptingState of nfaAcceptingStates) {
        // If any of the states from NFA is accepting, DFA's
        // state is accepting as well.
        if (states.indexOf(nfaAcceptingState) !== -1) {
          this._acceptingStateNumbers.add(states.join(','));
          break;
        }
      }
    };

    while (worklist.length > 0) {
      const states: Array = worklist.shift();
      const dfaStateLabel: String = states.join(',');
      dfaTable[dfaStateLabel] = {};

      for (const symbol of alphabet) {
        let onSymbol: Array = [];

        // Determine whether the combined state is accepting.
        updateAcceptingStates(states);

        for (const state of states) {
          const nfaStatesOnSymbol: String = nfaTable[state][symbol];
          if (!nfaStatesOnSymbol) {
            continue;
          }

          for (const nfaStateOnSymbol of nfaStatesOnSymbol) {
            if (!nfaTable[nfaStateOnSymbol]) {
              continue;
            }
            onSymbol.push(...nfaTable[nfaStateOnSymbol][EPSILON_CLOSURE]);
          }
        }

        const dfaStatesOnSymbolSet: Map = new Set(onSymbol);
        const dfaStatesOnSymbol: Array = [...dfaStatesOnSymbolSet];

        if (dfaStatesOnSymbol.length > 0) {
          const dfaOnSymbolStr: String = dfaStatesOnSymbol.join(',');

          dfaTable[dfaStateLabel][symbol] = dfaOnSymbolStr;

          if (!dfaTable.hasOwnProperty(dfaOnSymbolStr)) {
            worklist.unshift(dfaStatesOnSymbol);
          }
        }
      }
    }

    return (this._transitionTable = this._remapStateNumbers(dfaTable));
  }

  /**
   * Remaps state numbers in the resulting table:
   * combined states '1,2,3' -> 1, '3,4' -> 2, etc.
   */
  _remapStateNumbers(calculatedDFATable) {
    const newStatesMap: Object = {};

    this._originalTransitionTable = calculatedDFATable;
    const transitionTable: Object = {};

    Object.keys(calculatedDFATable).forEach((originalNumber: Number, newNumber: Number) => {
      newStatesMap[originalNumber] = newNumber + 1;
    });

    for (const originalNumber in calculatedDFATable) {
      const originalRow: Object = calculatedDFATable[originalNumber];
      const row: Object = {};

      for (const symbol in originalRow) {
        row[symbol] = newStatesMap[originalRow[symbol]];
      }

      transitionTable[newStatesMap[originalNumber]] = row;
    }

    // Remap accepting states.
    this._originalAcceptingStateNumbers = this._acceptingStateNumbers;
    this._acceptingStateNumbers = new Set();

    for (const originalNumber of this._originalAcceptingStateNumbers) {
      this._acceptingStateNumbers.add(newStatesMap[originalNumber]);
    }

    return transitionTable;
  }

  /**
   * Returns original DFA table, where state numbers
   * are combined numbers from NFA.
   */
  getOriginalTransitionTable() {
    if (!this._originalTransitionTable) {
      // Original table is determined during table construction.
      this.getTransitionTable();
    }
    return this._originalTransitionTable;
  }

  /**
   * Checks whether this DFA accepts a string.
   */
  matches(string) {
    let state: Number = 1;
    let i: Number = 0;
    const table: Object = this.getTransitionTable();

    while (string[i]) {
      state = table[state][string[i++]];
      if (!state) {
        return false;
      }
    }

    if (!this.getAcceptingStateNumbers().has(state)) {
      return false;
    }

    return true;
  }
}

module.exports = DFA;
