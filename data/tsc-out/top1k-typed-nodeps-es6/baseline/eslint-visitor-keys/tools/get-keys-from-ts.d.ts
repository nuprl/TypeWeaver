/**
 * [],
 *     keys: KeysStrict
 *   },
 *   exportedTsInterfaceDeclarations:
 *     Node[],
 *     keys: KeysStrict
 *   }
 * }}} VisitorKeysExport
 */
export type Node = {
    tsInterfaceDeclarations: {
        allTsInterfaceDeclarations: {};
    };
};
/**
 * Returns alphabetized keys
 * @param {KeysStrict} initialNodes Initial node list to sort
 * @returns {KeysStrict} The keys
 */
export function alphabetizeKeyInterfaces(initialNodes: KeysStrict): KeysStrict;
/**
 * Builds visitor keys based on TypeScript declaration.
 * @param {string} code TypeScript declaration file as code to parse.
 * @param {{supplementaryDeclarations: Node[]}} [options] The options
 * @returns {VisitorKeysExport} The built visitor keys
 */
export function getKeysFromTs(code: string, { supplementaryDeclarations }?: {
    supplementaryDeclarations: Node[];
}): VisitorKeysExport;
/**
 * @typedef {{tsInterfaceDeclarations: {
 *   allTsInterfaceDeclarations: {
 *     Node[],
 *     keys: KeysStrict
 *   },
 *   exportedTsInterfaceDeclarations:
 *     Node[],
 *     keys: KeysStrict
 *   }
 * }}} VisitorKeysExport
 */
/**
 * Builds visitor keys based on TypeScript declaration.
 * @param {string} file TypeScript declaration file to parse.
 * @param {{supplementaryDeclarations: Object<string, Node[]>}} options The options
 * @returns {Promise<VisitorKeysExport>} The built visitor keys
 */
export function getKeysFromTsFile(file: string, options: {
    supplementaryDeclarations: {
        [x: string]: Node[];
    };
}): Promise<VisitorKeysExport>;
