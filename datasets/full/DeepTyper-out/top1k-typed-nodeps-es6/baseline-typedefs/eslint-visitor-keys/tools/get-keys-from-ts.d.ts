declare function alphabetizeKeyInterfaces(initialNodes: string): any;
declare function getKeysFromTs(code: any, { supplementaryDeclarations }?: {
    supplementaryDeclarations?: {
        allTsInterfaceDeclarations: any[];
        exportedTsInterfaceDeclarations: any[];
        tsTypeDeclarations: any[];
    };
}): {
    keys: any;
    tsInterfaceDeclarations: {
        allTsInterfaceDeclarations: any[];
        exportedTsInterfaceDeclarations: any[];
        tsTypeDeclarations: any[];
    };
};
declare function getKeysFromTsFile(file: string, options: any): any;
export { alphabetizeKeyInterfaces, getKeysFromTs, getKeysFromTsFile };
