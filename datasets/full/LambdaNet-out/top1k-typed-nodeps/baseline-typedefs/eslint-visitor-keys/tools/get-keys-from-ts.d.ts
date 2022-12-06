declare function alphabetizeKeyInterfaces(initialNodes: any[]): object;
declare function getKeysFromTs(code: string, { supplementaryDeclarations }?: {
    supplementaryDeclarations?: {
        allTsInterfaceDeclarations: any[];
        exportedTsInterfaceDeclarations: any[];
        tsTypeDeclarations: any[];
    };
}): Promise;
declare function getKeysFromTsFile(file: HTMLElement, options: HTMLElement): any[];
export { alphabetizeKeyInterfaces, getKeysFromTs, getKeysFromTsFile };
