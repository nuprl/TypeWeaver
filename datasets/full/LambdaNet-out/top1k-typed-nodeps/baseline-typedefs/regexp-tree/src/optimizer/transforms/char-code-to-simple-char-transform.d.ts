declare const UPPER_A_CP: number;
declare const UPPER_Z_CP: number;
declare const LOWER_A_CP: number;
declare const LOWER_Z_CP: number;
declare const DIGIT_0_CP: number;
declare const DIGIT_9_CP: number;
declare function isSimpleRange(classRange: TrailSurrogateRange): boolean;
declare function isPrintableASCIIChar(codePoint: number): boolean;
declare function needsEscape(symbol: string, parentType: number): boolean;
