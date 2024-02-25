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
declare function alt(first: any, ...fragments: any[]): any;
declare function char(c: any): NFA;
declare function e(): NFA;
declare function or(first: any, ...fragments: any[]): any;
declare function rep(fragment: any): any;
declare function repExplicit(fragment: any): NFA;
declare function plusRep(fragment: any): any;
declare function questionRep(fragment: any): any;
import NFA from "./nfa";
