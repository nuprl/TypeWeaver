declare const regexpTree: {
    parser: {
        setOptions(options: any): any;
        getOptions(): any;
        parse(string: any, parseOptions: any): any;
        setTokenizer(customTokenizer: any): any;
        getTokenizer(): any;
        onParseBegin(string: any, tokenizer: any, options: any): void;
        onParseEnd(parsed: any): void;
        onShift(token: any): any;
    };
    fa: {
        NFA: typeof import("./interpreter/finite-automaton/nfa/nfa").default;
        DFA: typeof import("./interpreter/finite-automaton/dfa/dfa").default;
        builders: {
            alt: (first: any, ...fragments: any[]) => any;
            char: (c: string) => import("./interpreter/finite-automaton/nfa/nfa").default;
            e: () => import("./interpreter/finite-automaton/nfa/nfa").default;
            or: (first: Function, ...fragments: Function[]) => Function;
            rep: (fragment: string) => string;
            repExplicit: (fragment: Fragment) => import("./interpreter/finite-automaton/nfa/nfa").default;
            plusRep: (fragment: string) => string;
            questionRep: (fragment: string) => string;
        };
        toNFA(regexp: any): any;
        toDFA(regexp: any): import("./interpreter/finite-automaton/dfa/dfa").default;
        test(regexp: any, string: any): any;
    };
    TransformResult: {
        new (ast: any, extra?: any): {
            getAST(): any;
            setExtra(extra: any): void;
            getExtra(): any;
            toRegExp(): any;
            getSource(): any;
            getFlags(): any;
            toString(): any;
        };
    };
    parse(regexp: any, options: any): any;
    traverse(ast: any, handlers: any, options: any): void;
    transform(regexp: any, handlers: any): {
        getAST(): any;
        setExtra(extra: any): void;
        getExtra(): any;
        toRegExp(): any;
        getSource(): any;
        getFlags(): any;
        toString(): any;
    };
    generate(ast: any): any;
    toRegExp(regexp: any): RegExp;
    optimize(regexp: any, whitelist: any, { blacklist }?: {
        blacklist: any;
    }): {
        getAST(): any;
        setExtra(extra: any): void;
        getExtra(): any;
        toRegExp(): any;
        getSource(): any;
        getFlags(): any;
        toString(): any;
    };
    compatTranspile(regexp: any, whitelist: any): any;
    exec(re: any, string: any): any;
};
export default regexpTree;
