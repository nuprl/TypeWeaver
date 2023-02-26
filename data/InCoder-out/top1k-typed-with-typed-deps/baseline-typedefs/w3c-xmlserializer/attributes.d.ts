declare const xnv: any;
declare const NAMESPACES: any;
declare function generatePrefix(map: Map<string, string>, newNamespace: string | null, prefixIndex: number): string;
declare function preferredPrefixString(map: Map<string, string>, ns: string, preferredPrefix: string): any;
declare function serializeAttributeValue(value: false): any;
declare function serializeAttributes(element: any, map: any, localPrefixes: any, ignoreNamespaceDefAttr: any, requireWellFormed: any, refs: any): string;
