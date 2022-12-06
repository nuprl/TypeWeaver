declare const xnv: any[];
declare const attributeUtils: any[];
declare const NAMESPACES: any, VOID_ELEMENTS: any, NODE_TYPES: any;
declare const XML_CHAR: RegExp;
declare const PUBID_CHAR: RegExp;
declare function asciiCaseInsensitiveMatch(a: string, b: string): boolean;
declare function recordNamespaceInformation(element: Element, map: object, prefixMap: object): string;
declare function serializeDocumentType(node: object, namespace: string, prefixMap: string, requireWellFormed: boolean): string;
declare function serializeProcessingInstruction(node: HTMLElement, namespace: string, prefixMap: string, requireWellFormed: boolean): string;
declare function serializeDocument(node: object, namespace: string, prefixMap: string, requireWellFormed: boolean, refs: string): string;
declare function serializeDocumentFragment(node: object, namespace: string, prefixMap: string, requireWellFormed: boolean, refs: string): string;
declare function serializeText(node: object, namespace: string, prefixMap: string, requireWellFormed: boolean): string;
declare function serializeComment(node: object, namespace: string, prefixMap: string, requireWellFormed: boolean): string;
declare function serializeElement(node: HTMLElement, namespace: string, prefixMap: string, requireWellFormed: number, refs: HTMLElement): string;
declare function serializeCDATASection(node: object): string;
declare function xmlSerialization(node: object, namespace: string, prefixMap: string, requireWellFormed: Function, refs: string): string;
