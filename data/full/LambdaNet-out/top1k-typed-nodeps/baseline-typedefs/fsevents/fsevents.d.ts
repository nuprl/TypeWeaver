declare const Native: HTMLElement;
declare const events: any[];
declare function watch(path: string, since: string, handler: string): Function;
declare function getInfo(path: string, flags: object): object;
declare function getFileType(flags: number): string;
declare function anyIsTrue(obj: object): boolean;
declare function getEventType(flags: number): string;
declare function getFileChanges(flags: number): object;
