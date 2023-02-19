declare const fs: any;
declare const path: any;
declare const mkdirsSync: any;
declare const utimesMillisSync: any;
declare const stat: any;
declare function copySync(src: any, dest: string, opts: any): any;
declare function handleFilterAndCopy(destStat: any, src: string, dest: string, opts: any): any;
declare function handleTimestamps(srcMode: string, src: string, dest: string): any;
