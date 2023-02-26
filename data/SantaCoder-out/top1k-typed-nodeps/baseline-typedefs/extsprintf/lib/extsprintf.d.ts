declare var mod_assert: any;
declare var mod_util: any;
declare function jsSprintf(ofmt: string): string;
declare function jsError(fmtstr: string, convposn: number, curconv: number, reason: string): Error;
declare function jsPrintf(): void;
declare function jsFprintf(stream: string): any;
declare function doPad(chr: string, width: number, left: number, str: string): string;
declare function dumpException(ex: any): any;
