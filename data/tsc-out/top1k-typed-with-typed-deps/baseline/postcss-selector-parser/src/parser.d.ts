export default class Parser {
    constructor(rule: any, options?: {});
    rule: any;
    options: {
        lossy: boolean;
        safe: boolean;
    };
    position: number;
    css: any;
    tokens: any[][];
    root: Root;
    current: Selector;
    _errorGenerator(): (message: any, errorOptions: any) => any;
    attribute(): void;
    /**
     * return a node containing meaningless garbage up to (but not including) the specified token position.
     * if the token position is negative, all remaining tokens are consumed.
     *
     * This returns an array containing a single string node if all whitespace,
     * otherwise an array of comment nodes with space before and after.
     *
     * These tokens are not added to the current selector, the caller can add them or use them to amend
     * a previous node's space metadata.
     *
     * In lossy mode, this returns only comments.
     */
    parseWhitespaceEquivalentTokens(stopPosition: any): (Comment | Str)[];
    /**
     *
     * @param {*} nodes
     */
    convertWhitespaceNodesToSpace(nodes: any, requiredSpace?: boolean): {
        space: string;
        rawSpace: string;
    };
    isNamedCombinator(position?: number): boolean;
    namedCombinator(): Combinator;
    combinator(): any;
    comma(): void;
    comment(): void;
    error(message: any, opts: any): void;
    missingBackslash(): void;
    missingParenthesis(): void;
    missingSquareBracket(): void;
    unexpected(): void;
    namespace(): any;
    nesting(): void;
    parentheses(): void;
    pseudo(): void;
    space(): void;
    spaces: any;
    string(): void;
    universal(namespace: any): any;
    splitWord(namespace: any, firstCallback: any): void;
    word(namespace: any): any;
    loop(): Root;
    parse(throwOnParenthesis: any): void;
    /**
     * Helpers
     */
    expected(description: any, index: any, found: any): void;
    requiredSpace(space: any): any;
    optionalSpace(space: any): any;
    lossySpace(space: any, required: any): any;
    parseParenthesisToken(token: any): any;
    newNode(node: any, namespace: any): Selector;
    content(token?: any[]): any;
    get currToken(): any[];
    get nextToken(): any[];
    get prevToken(): any[];
    /**
     * returns the index of the next non-whitespace, non-comment token.
     * returns -1 if no meaningful token is found.
     */
    locateNextMeaningfulToken(startPosition?: number): number;
}
import Root from "./selectors/root";
import Selector from "./selectors/selector";
import Comment from "./selectors/comment";
import Str from "./selectors/string";
import Combinator from "./selectors/combinator";
