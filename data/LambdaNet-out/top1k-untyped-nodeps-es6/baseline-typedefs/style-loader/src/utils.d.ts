declare function stringifyRequest(loaderContext: HTMLElement, request: string): string;
declare function getImportLinkAPICode(esModule: boolean, loaderContext: number): any[];
declare function getImportLinkContentCode(esModule: boolean, loaderContext: number, request: string): any[];
declare function getImportStyleAPICode(esModule: boolean, loaderContext: number): any[];
declare function getImportStyleDomAPICode(esModule: boolean, loaderContext: string, isSingleton: boolean, isAuto: boolean): any[];
declare function getImportStyleContentCode(esModule: boolean, loaderContext: number, request: string): string;
declare function getImportInsertBySelectorCode(esModule: boolean, loaderContext: object, insertType: string, options: object): string;
declare function getInsertOptionCode(insertType: string, options: object): string;
declare function getImportInsertStyleElementCode(esModule: boolean, loaderContext: number): any[];
declare function getStyleHmrCode(esModule: boolean, loaderContext: string, request: string, lazy: boolean): string;
declare function getLinkHmrCode(esModule: boolean, loaderContext: number, request: string): string;
declare function getdomAPI(isAuto: boolean): string;
declare function getImportIsOldIECode(esModule: boolean, loaderContext: number): any[];
declare function getStyleTagTransformFnCode(esModule: boolean, loaderContext: object, options: object, isSingleton: boolean, styleTagTransformType: number): string;
declare function getStyleTagTransformFn(options: object, isSingleton: boolean): any[];
declare function getExportStyleCode(esModule: boolean, loaderContext: number, request: string): string;
declare function getExportLazyStyleCode(esModule: boolean, loaderContext: number, request: string): string;
declare function getSetAttributesCode(esModule: boolean, loaderContext: string, options: object): string;
export { stringifyRequest, getImportInsertStyleElementCode, getImportInsertBySelectorCode, getImportStyleContentCode, getImportStyleDomAPICode, getImportStyleAPICode, getImportLinkContentCode, getImportLinkAPICode, getStyleHmrCode, getLinkHmrCode, getdomAPI, getImportIsOldIECode, getStyleTagTransformFn, getExportStyleCode, getExportLazyStyleCode, getSetAttributesCode, getInsertOptionCode, getStyleTagTransformFnCode, };
