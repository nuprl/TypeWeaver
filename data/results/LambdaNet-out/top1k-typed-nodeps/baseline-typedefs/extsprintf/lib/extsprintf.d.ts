declare var mod_assert: string;
declare var mod_util: any[];
declare function jsSprintf(ofmt: string): string;
declare function jsError(fmtstr: string, convposn: string, curconv: string, reason: string): object;
declare function jsPrintf(): void;
declare function jsFprintf(stream: string): number;
declare function doPad(chr: string, width: number, left: boolean, str: string): string;
declare function dumpException(ex: object): string;
