declare const Native: any;
declare const events: any;
declare function watch(path: string, since: number, handler: any): () => Promise<any>;
declare function getInfo(path: string, flags: number): {
    path: string;
    flags: number;
    event: string;
    type: string;
    changes: {
        inode: boolean;
        finder: boolean;
        access: boolean;
        xattrs: boolean;
    };
};
declare function getFileType(flags: number): "file" | "directory" | "symlink";
declare function anyIsTrue(obj: any): boolean;
declare function getEventType(flags: number): "unknown" | "deleted" | "moved" | "created" | "modified" | "root-changed" | "cloned";
declare function getFileChanges(flags: number): {
    inode: boolean;
    finder: boolean;
    access: boolean;
    xattrs: boolean;
};
