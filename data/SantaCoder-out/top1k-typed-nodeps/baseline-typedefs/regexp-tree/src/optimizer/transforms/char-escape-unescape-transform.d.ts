declare function shouldUnescape(path: string, hasXFlag: boolean): boolean;
declare function preservesInCharClass(value: string, index: number, parent: RegExp): boolean;
declare function preservesEscape(value: string, index: number, parent: Node, hasXFlag: boolean): boolean;
declare function consumeNumbers(startIndex: number, parent: Node, rtl: boolean): number;
declare function isSimpleChar(node: Node, value: string): boolean;
declare function preservesOpeningCurlyBraceEscape(index: number, parent: Node): boolean;
declare function preservesClosingCurlyBraceEscape(index: number, parent: Node): boolean;
