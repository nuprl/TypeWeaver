declare const Native: any;
declare const events: any;
declare function watch(path: string, since: string, handler: any): any;
declare function getInfo(path: string, flags: string): any;
declare function getFileType(flags: string): string;
declare function anyIsTrue(obj: any): boolean;
declare function getEventType(flags: string): string;
declare function getFileChanges(flags: string): boolean;
