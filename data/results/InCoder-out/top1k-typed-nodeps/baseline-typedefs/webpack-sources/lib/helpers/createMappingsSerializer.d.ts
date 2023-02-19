declare const ALPHABET: string[];
declare const CONTINUATION_BIT = 32;
declare const createMappingsSerializer: (options: any) => (generatedLine: any, generatedColumn: any, sourceIndex: any, originalLine: any, originalColumn: any, nameIndex: any) => any;
declare const createFullMappingsSerializer: () => (generatedLine: any, generatedColumn: any, sourceIndex: any, originalLine: any, originalColumn: any, nameIndex: any) => any;
declare const createLinesOnlyMappingsSerializer: () => (generatedLine: any, _generatedColumn: any, sourceIndex: any, originalLine: any, _originalColumn: any, _nameIndex: any) => string;
