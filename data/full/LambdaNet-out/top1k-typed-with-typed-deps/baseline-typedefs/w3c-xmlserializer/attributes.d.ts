declare const xnv: any[];
declare const NAMESPACES: any;
declare function generatePrefix(map: object, newNamespace: number, prefixIndex: string): string;
declare function preferredPrefixString(map: object, ns: string, preferredPrefix: string): any[];
declare function serializeAttributeValue(value: string): string;
declare function serializeAttributes(element: Element, map: object, localPrefixes: object, ignoreNamespaceDefAttr: boolean, requireWellFormed: boolean, refs: Element): string;
