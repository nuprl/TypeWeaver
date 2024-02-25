declare function jsSprintf(ofmt: any, ...args: any[]): string;
declare function jsPrintf(...args: any[]): void;
declare function jsFprintf(stream: any, ...args: any[]): any;
export { jsSprintf as sprintf, jsPrintf as printf, jsFprintf as fprintf };
