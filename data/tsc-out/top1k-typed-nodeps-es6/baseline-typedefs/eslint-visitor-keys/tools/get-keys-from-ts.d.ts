export type Node = {
    tsInterfaceDeclarations: {
        allTsInterfaceDeclarations: {};
    };
};
export function alphabetizeKeyInterfaces(initialNodes: KeysStrict): KeysStrict;
export function getKeysFromTs(code: string, { supplementaryDeclarations }?: {
    supplementaryDeclarations: Node[];
}): VisitorKeysExport;
export function getKeysFromTsFile(file: string, options: {
    supplementaryDeclarations: {
        [x: string]: Node[];
    };
}): Promise<VisitorKeysExport>;
