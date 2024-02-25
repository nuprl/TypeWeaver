declare namespace _default {
    export { alt };
    export { char };
    export { e };
    export { or };
    export { rep };
    export { repExplicit };
    export { plusRep };
    export { questionRep };
}
export default _default;
/**
 * Alteration factory.
 *
 * Creates a alteration NFA for (at least) two NFA-fragments.
 */
declare function alt(first: any, ...fragments: any[]): any;
/**
 * Char factory.
 *
 * Creates an NFA fragment for a single char.
 *
 * [in] --c--> [out]
 */
declare function char(c: any): NFA;
/**
 * Epsilon factory.
 *
 * Creates an NFA fragment for ε (recognizes an empty string).
 *
 * [in] --ε--> [out]
 */
declare function e(): NFA;
/**
 * Disjunction factory.
 *
 * Creates a disjunction NFA for (at least) two NFA-fragments.
 */
declare function or(first: any, ...fragments: any[]): any;
/**
 * Optimized Kleene-star: just adds ε-transitions from
 * input to the output, and back.
 */
declare function rep(fragment: any): any;
/**
 * Kleene star/closure.
 *
 * a*
 */
declare function repExplicit(fragment: any): NFA;
/**
 * Optimized Plus: just adds ε-transitions from
 * the output to the input.
 */
declare function plusRep(fragment: any): any;
/**
 * Optimized ? repetition: just adds ε-transitions from
 * the input to the output.
 */
declare function questionRep(fragment: any): any;
import NFA from "./nfa";
