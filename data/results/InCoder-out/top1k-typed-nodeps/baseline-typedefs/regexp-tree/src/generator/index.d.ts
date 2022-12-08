declare const generator: {
    RegExp(node: any): string;
    Alternative(node: any): any;
    Disjunction(node: any): string;
    Group(node: any): string;
    Backreference(node: any): string;
    Assertion(node: any): any;
    CharacterClass(node: any): string;
    ClassRange(node: any): string;
    Repetition(node: any): string;
    Quantifier(node: any): string;
    Char(node: any): any;
    UnicodeProperty(node: any): string;
};
