declare var fs: string, shell: string, path: string, cdnFolder: string, releaseFiles: object, googleFilesCDN: any[], msFilesCDN: any[];
declare function makeReleaseCopies(Release: object): void;
declare function makeArchives(Release: HTMLElement, callback: Function): void;
