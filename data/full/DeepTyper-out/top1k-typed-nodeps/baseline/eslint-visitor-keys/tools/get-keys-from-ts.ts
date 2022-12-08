/**
 * @fileoverview Script to build our visitor keys based on TypeScript AST.
 *
 * Uses `get-keys-from-ts.js` to read the files and build the keys and then
 * merges them in alphabetical order of Node type before writing to file.
 *
 * @author Brett Zamir
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { promises } from "fs";
import { parseForESLint } from "@typescript-eslint/parser";
import esquery from "esquery";

import { getKeys, KEYS } from "../lib/index.js";

const { readFile } = promises;

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const knownTypes: Set<string> = new Set([
    "TSUndefinedKeyword",
    "TSNullKeyword",
    "TSUnknownKeyword",
    "TSBooleanKeyword",
    "TSNumberKeyword",
    "TSStringKeyword",
    "TSLiteralType", // E.g., `true`

    // Apparently used for primitives, so exempting
    "TSTypeLiteral", // E.g., `{value: {cooked, raw}}`

    "TSUnionType", // I.e., `|`
    "TSTypeReference"
]);

const notTraversableTypes: Set<any> = new Set([
    "RegExp"
]);

const notTraversableTSTypes: Set<any> = new Set([
    "TSUndefinedKeyword",
    "TSNullKeyword",
    "TSBooleanKeyword",
    "TSNumberKeyword",
    "TSStringKeyword",
    "TSBigIntKeyword",
    "TSLiteralType"
]);

const commentTypes: Set<any> = new Set([
    "Line",
    "Block"
]);

/**
 * Get the literal names out of AST
 * @param {Node} excludedItem Excluded node
 * @returns {string[]} The literal names
 */
function findOmitTypes(excludedItem: any): boolean {
    if (excludedItem.type === "TSUnionType") {
        return excludedItem.types.map((typeNode: any) => findOmitTypes(typeNode));
    }
    return excludedItem.literal.value;
}

/**
 * Checks whether property should be excluded
 * @param {string} property Property to check
 * @param {string[]} excludedProperties Properties not to allow
 * @returns {boolean} Whether or not to be excluded
 */
function isPropertyExcluded(property: string, excludedProperties: boolean): boolean {
    return excludedProperties && excludedProperties.includes(property);
}

//------------------------------------------------------------------------------
// Public APIs
//------------------------------------------------------------------------------

/**
 * Returns alphabetized keys
 * @param {KeysStrict} initialNodes Initial node list to sort
 * @returns {KeysStrict} The keys
 */
function alphabetizeKeyInterfaces(initialNodes: string): any {

    /**
     * Alphabetize
     * @param {string} typeA The first type to compare
     * @param {string} typeB The second type to compare
     * @returns {1|-1} The sorting index
     */
    function alphabetize([typeA], [typeB]) {
        return typeA < typeB ? -1 : 1;
    }
    const sortedNodeEntries: any = Object.entries(initialNodes).sort(alphabetize);

    /**
     * Get the key sorter for a given type
     * @param {string} type The type
     * @returns {(string, string) => -1|1} The sorter
     */
    function getKeySorter(type): boolean {
        const sequence: number = KEYS[type];

        /**
         * Alphabetize
         * @param {string} typeA The first type to compare
         * @param {string} typeB The second type to compare
         * @returns {1|-1} The sorting index
         */
        return function sortKeys(typeA: any, typeB: any): boolean {
            if (!sequence) {
                return typeA < typeB ? -1 : 1;
            }

            const idxA: number = sequence.indexOf(typeA);
            const idxB: number = sequence.indexOf(typeB);

            if (idxA === -1 && idxB === -1) {
                return typeA < typeB ? -1 : 1;
            }
            if (idxA === -1) {
                return 1;
            }
            if (idxB === -1) {
                return -1;
            }

            return idxA < idxB ? -1 : 1;
        };
    }

    for (const [type, keys] of sortedNodeEntries) {
        keys.sort(getKeySorter(type));
    }

    return Object.fromEntries(sortedNodeEntries);
}

/**
 * Traverse interface `extends`
 * @param {Node} declNode The TS declaration node
 * @param {Function} handler The callback
 * @returns {any[]} Return value of handler
 */
function traverseExtends(declNode: string, handler: any): any {
    const ret: any[] = [];

    for (const extension of declNode.extends || []) {
        const { typeParameters, expression } = extension;
        const innerInterfaceName: any = expression.name;

        let res: any;

        if (typeParameters) {
            if (innerInterfaceName !== "Omit") {
                throw new Error("Unknown type parameter");
            }

            const [param, ...excludedAST] = typeParameters.params;
            const paramInterfaceName: any = param.typeName.name;
            const excluded: any = excludedAST.flatMap(findOmitTypes);

            res = handler({ iName: paramInterfaceName, excluded });
        } else {
            res = handler({ iName: innerInterfaceName });
        }

        ret.push(res);
    }

    return ret;
}

/**
 * Traverse the properties of a declaration node.
 * @param {Node} tsDeclarationNode The declaration node
 * @param {(string) => void} handler Passed the property
 * @returns {any[]} The return values of the callback
 */
function traverseProperties(tsDeclarationNode: any, handler: any): any {
    const tsPropertySignatures: any = tsDeclarationNode.body.body;

    const ret: any[] = [];

    for (const tsPropertySignature of tsPropertySignatures) {
        const property: any = tsPropertySignature.key.name;

        const tsAnnotation: any = tsPropertySignature.typeAnnotation.typeAnnotation;

        const res: any = handler({ property, tsAnnotation });

        ret.push(res);
    }

    return ret;
}

/**
 * Builds visitor keys based on TypeScript declaration.
 * @param {string} code TypeScript declaration file as code to parse.
 * @param {{supplementaryDeclarations: Node[]}} [options] The options
 * @returns {VisitorKeysExport} The built visitor keys
 */
function getKeysFromTs(code, {

    // Todo: Ideally we'd just get these from the import
    supplementaryDeclarations = {
        allTsInterfaceDeclarations: [],
        exportedTsInterfaceDeclarations: [],
        tsTypeDeclarations: []
    }
} = {}) {
    const unrecognizedTSTypeReferences: Set<any> = new Set();
    const unrecognizedTSTypes: Set<any> = new Set();

    const parsedTSDeclaration: any = parseForESLint(code);

    const allTsInterfaceDeclarations: any[] = [...esquery.query(
        parsedTSDeclaration.ast,
        "TSInterfaceDeclaration",
        {

            // TypeScript keys here to find our *.d.ts nodes (not for the ESTree
            //   ones we want)
            visitorKeys: parsedTSDeclaration.visitorKeys
        }
    ), ...supplementaryDeclarations.allTsInterfaceDeclarations];

    const exportedTsInterfaceDeclarations: any[] = [...esquery.query(
        parsedTSDeclaration.ast,
        "ExportNamedDeclaration > TSInterfaceDeclaration",
        {

            // TypeScript keys here to find our *.d.ts nodes (not for the ESTree
            //   ones we want)
            visitorKeys: parsedTSDeclaration.visitorKeys
        }
    ), ...supplementaryDeclarations.exportedTsInterfaceDeclarations];

    const tsTypeDeclarations: any[] = [...esquery.query(
        parsedTSDeclaration.ast,
        "TSTypeAliasDeclaration",
        {

            // TypeScript keys here to find our *.d.ts nodes (not for the ESTree
            //   ones we want)
            visitorKeys: parsedTSDeclaration.visitorKeys
        }
    ), ...supplementaryDeclarations.tsTypeDeclarations];

    const initialNodes: {} = {};

    /**
     * Finds a TypeScript interfaction declaration.
     * @param {string} interfaceName The type name.
     * @returns {Node} The interface declaration node
     */
    function findTsInterfaceDeclaration(interfaceName: string): boolean {
        return allTsInterfaceDeclarations.find(
            (innerTsDeclaration: any) => innerTsDeclaration.id.name === interfaceName
        );
    }

    /**
     * Finds a TypeScript type declaration.
     * @param {string} typeName A type name
     * @returns {Node} The type declaration node
     */
    function findTsTypeDeclaration(typeName: string): any {
        return tsTypeDeclarations.find((typeDecl: any) => typeDecl.id.name === typeName);
    }

    /**
     * Whether has a valid (non-comment) type
     * @param {object} cfg Config object
     * @param {string} cfg.property The property name
     * @param {Node} cfg.tsAnnotation The annotation node
     * @returns {boolean} Whether has a traverseable type
     */
    function hasValidType({ property, tsAnnotation }) {
        const tsPropertyType: any = tsAnnotation.type;

        if (property !== "type") {
            return false;
        }

        switch (tsPropertyType) {
            case "TSLiteralType":
                return typeof tsAnnotation.literal.value === "string" &&
                    !commentTypes.has(tsAnnotation.literal.value);
            case "TSStringKeyword":

                // Ok, but not sufficient
                return false;
            case "TSUnionType":
                // eslint-disable-next-line no-use-before-define -- Circular
                return tsAnnotation.types.some((annType: any) => hasValidType({
                    property: "type",
                    tsAnnotation: annType
                }));
            default:
                throw new Error(`Unexpected \`type\` value property type ${tsPropertyType}`);
        }
    }

    /**
     * Whether the interface has a valid type ancestor
     * @param {string} interfaceName The interface to check
     * @returns {void}
     */
    function hasValidTypeAncestor(interfaceName: string): boolean {
        let decl: any = findTsInterfaceDeclaration(interfaceName);

        if (decl) {
            if (traverseProperties(decl, hasValidType).some((hasValid: any) => hasValid)) {
                return true;
            }
        }

        if (!decl) {
            decl = findTsTypeDeclaration(interfaceName);
            if (decl) {
                if (!decl.typeAnnotation.types) {
                    return notTraversableTSTypes.has(decl.typeAnnotation.type)
                        ? false
                        : hasValidTypeAncestor(decl.typeAnnotation.typeName.name);
                }

                return decl.typeAnnotation.types.some(type => {
                    if (!type.typeName) {

                        // Literal
                        return false;
                    }

                    return hasValidTypeAncestor(type.typeName.name);
                });
            }
        }

        if (!decl) {
            throw new Error(`Type unknown as to traversability: ${interfaceName}`);
        }

        if (traverseExtends(decl, ({ iName, excluded }) => {

            // We don't want to look at this ancestor's `type` if being excluded
            if (excluded && excluded.includes("type")) {
                return false;
            }

            return hasValidTypeAncestor(iName);
        }).some((hasValid: boolean) => hasValid)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the Node is traversable
     * @param {Node} annotationType The annotation type Node
     * @param {string} property The property name
     * @returns {boolean} Whether the node is traversable
     */
    function checkTraversability(annotationType: FileAnnotationType, property: string): boolean {
        if (
            notTraversableTSTypes.has(annotationType.type)
        ) {
            return false;
        }

        if (annotationType.type === "TSTupleType") {
            return annotationType.elementTypes.some((annType: any) => checkTraversability(annType, property));
        }

        if (annotationType.type === "TSUnionType") {
            return annotationType.types.some((annType: any) => checkTraversability(annType, property));
        }

        if (annotationType.typeName.name === "Array") {
            return annotationType.typeParameters.params.some((annType: any) => checkTraversability(annType, property));
        }

        if (
            notTraversableTypes.has(annotationType.typeName.name)
        ) {
            return false;
        }

        if (hasValidTypeAncestor(annotationType.typeName.name)) {
            return true;
        }

        return false;
    }

    /**
     * Adds a property to a node based on a type declaration node's contents.
     * @param {Node} tsDeclarationNode TypeScript declaration node
     * @param {Node} node The Node on which to build
     * @param {string[]} excludedProperties Excluded properties
     * @returns {void}
     */
    function addPropertyToNodeForDeclaration(tsDeclarationNode: any, node: any, excludedProperties: any): void {

        traverseProperties(tsDeclarationNode, ({ property, tsAnnotation }) => {
            if (isPropertyExcluded(property, excludedProperties)) {
                return;
            }

            const tsPropertyType: any = tsAnnotation.type;

            if (property === "type" && tsPropertyType === "TSLiteralType") {

                // console.log('tsAnnotation', tsAnnotation);
                // node[property] = tsAnnotation.literal.value;
                // return;
            }

            // For sanity-checking
            if (!knownTypes.has(tsPropertyType)) {
                unrecognizedTSTypes.add(tsPropertyType);
                return;
            }

            switch (tsPropertyType) {
                case "TSUnionType":
                    if (tsAnnotation.types.some((annType: any) => checkTraversability(annType, property))) {
                        break;
                    }
                    return;
                case "TSTypeReference": {
                    if (checkTraversability(tsAnnotation, property)) {
                        break;
                    }

                    return;
                } default:
                    return;
            }

            node[property] = null;
        });

        traverseExtends(tsDeclarationNode, ({ iName, excluded }) => {
            const innerTsDeclarationNode: any = findTsInterfaceDeclaration(iName);

            if (!innerTsDeclarationNode) {
                unrecognizedTSTypeReferences.add(iName);
                return;
            }

            addPropertyToNodeForDeclaration(innerTsDeclarationNode, node, excluded);
        });
    }

    for (const tsDeclarationNode of exportedTsInterfaceDeclarations) {
        const bodyType: any = tsDeclarationNode.body.body.find(
            (prop: any) => prop.key.name === "type"
        );

        const typeName: string = bodyType && bodyType.typeAnnotation &&
            bodyType.typeAnnotation.typeAnnotation &&
            bodyType.typeAnnotation.typeAnnotation.literal &&
            bodyType.typeAnnotation.typeAnnotation.literal.value;

        if (!typeName) {
            continue;
        }

        const node: {} = {};

        addPropertyToNodeForDeclaration(tsDeclarationNode, node);

        initialNodes[typeName] = [...new Set(getKeys(node), ...(initialNodes[typeName] || []))];
    }

    const nodes: any = alphabetizeKeyInterfaces(initialNodes);

    if (unrecognizedTSTypes.size) {
        throw new Error(
            "Unhandled TypeScript type; please update the code to " +
            "handle the type or if not relevant, add it to " +
            "`unrecognizedTSTypes`; see\n\n  " +
            `${[...unrecognizedTSTypes].join(", ")}\n`
        );
    }
    if (unrecognizedTSTypeReferences.size) {
        throw new Error(
            "Unhandled TypeScript type reference; please update the code to " +
            "handle the type reference or if not relevant, add it to " +
            "`unrecognizedTSTypeReferences`; see\n\n  " +
            `${[...unrecognizedTSTypeReferences].join(", ")}\n`
        );
    }

    return {
        keys: nodes,
        tsInterfaceDeclarations: {
            allTsInterfaceDeclarations,
            exportedTsInterfaceDeclarations,
            tsTypeDeclarations
        }
    };
}

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
async function getKeysFromTsFile(file: string, options: any): any {
    const code: string = await readFile(file);

    return getKeysFromTs(code, options);
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

export { alphabetizeKeyInterfaces, getKeysFromTs, getKeysFromTsFile };
