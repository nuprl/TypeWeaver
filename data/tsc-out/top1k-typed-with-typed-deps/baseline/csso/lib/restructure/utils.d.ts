export function isEqualSelectors(a: any, b: any): boolean;
export function isEqualDeclarations(a: any, b: any): boolean;
export function compareDeclarations(declarations1: any, declarations2: any): {
    eq: any[];
    ne1: any[];
    ne2: any[];
    ne2overrided: any[];
};
export function addSelectors(dest: any, source: any): any;
export function hasSimilarSelectors(selectors1: any, selectors2: any): boolean;
export function unsafeToSkipNode(node: any): any;
