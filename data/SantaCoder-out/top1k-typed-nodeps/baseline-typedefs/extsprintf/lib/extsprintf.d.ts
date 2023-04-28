declare var mod_assert: any;
declare var mod_util: any;
declare function jsSprintf(ofmt: string): string;
declare function jsError(fmtstr: string, convposn: number, curconv: string, reason: string): Error;
declare function jsPrintf(): void;
declare function jsFprintf(stream: any): any;
declare function doPad(chr: string, width: number, left: boolean, str: string): string;
declare function dumpException(ex: Error): any;
