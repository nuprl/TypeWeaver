/**
 * Alteration factory.
 *
 * Creates a alteration NFA for (at least) two NFA-fragments.
 */
export function alt(first: any, ...fragments: any[]): any;
/**
 * Char factory.
 *
 * Creates an NFA fragment for a single char.
 *
 * [in] --c--> [out]
 */
export function char(c: any): NFA;
/**
 * Epsilon factory.
 *
 * Creates an NFA fragment for ε (recognizes an empty string).
 *
 * [in] --ε--> [out]
 */
export function e(): NFA;
/**
 * Disjunction factory.
 *
 * Creates a disjunction NFA for (at least) two NFA-fragments.
 */
export function or(first: any, ...fragments: any[]): any;
/**
 * Optimized Kleene-star: just adds ε-transitions from
 * input to the output, and back.
 */
export function rep(fragment: any): any;
/**
 * Kleene star/closure.
 *
 * a*
 */
export function repExplicit(fragment: any): NFA;
/**
 * Optimized Plus: just adds ε-transitions from
 * the output to the input.
 */
export function plusRep(fragment: any): any;
/**
 * Optimized ? repetition: just adds ε-transitions from
 * the input to the output.
 */
export function questionRep(fragment: any): any;
import NFA = require("./nfa");
